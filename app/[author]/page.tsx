"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import AuthorNode from "../../components/AuthorNode";
import type { ApiResponse } from "../types";
import * as d3 from "d3";

export default function AuthorPage() {
  const params = useParams();
  const router = useRouter();
  const author = params.author as string;
  const [maxDistance, setMaxDistance] = useState(400);
  const [nodes, setNodes] = useState<
    Array<{
      id: string;
      name: string;
      similarity: number;
      x: number;
      y: number;
    }>
  >([]);
  const simulationRef = useRef<d3.Simulation<
    {
      id: string;
      name: string;
      similarity: number;
      x: number;
      y: number;
    },
    undefined
  > | null>(null);

  const [data, setData] = useState<ApiResponse | null>(null);

  useEffect(() => {
    function updateDistances() {
      const minDim = Math.min(window.innerWidth, window.innerHeight);
      setMaxDistance(minDim * 0.45);
    }
    updateDistances();
    window.addEventListener("resize", updateDistances);
    return () => window.removeEventListener("resize", updateDistances);
  }, []);

  useEffect(() => {
    if (author) {
      fetchAuthorData(author);
    }
  }, [author]);

  const fetchAuthorData = async (authorName: string) => {
    try {
      const response = await fetch(`/api/authors/${authorName}`);
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error("Failed to fetch author data:", error);
    }
  };

  const visibleAuthors = useMemo(() => {
    const authors = data?.similarAuthors ?? [];
    return authors.slice(0, 20);
  }, [data?.similarAuthors]);

  useEffect(() => {
    if (typeof window === "undefined" || visibleAuthors.length === 0) return;
    const width = window.innerWidth;
    const height = window.innerHeight;
    const initialNodes = visibleAuthors.map((author) => ({
      id: author.id,
      name: author.name,
      similarity: author.similarity ?? 0.5,
      x: width / 2,
      y: height / 2,
    }));
    const simulation = d3
      .forceSimulation(initialNodes)
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("charge", d3.forceManyBody().strength(-120))
      .force("collision", d3.forceCollide().radius(50))
      .force(
        "radial",
        d3.forceRadial(
          (d) => {
            return 100 + (1 - d.similarity) * (Math.min(width, height) * 0.4);
          },
          width / 2,
          height / 2,
        ),
      )
      .stop();
    for (let i = 0; i < 120; ++i) simulation.tick();
    setNodes([...initialNodes]);
    simulationRef.current = simulation;
  }, [visibleAuthors, maxDistance]);

  if (!data || !data.centralAuthor) {
    return (
      <div className="relative h-screen w-screen">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-screen">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-default font-bold"
        aria-label={`Author: ${data.centralAuthor.name}`}
      >
        {data.centralAuthor.name}
      </div>
      {nodes.length > 0 && (
        <svg
          className="pointer-events-none absolute inset-0"
          width={window.innerWidth}
          height={window.innerHeight}
          style={{ left: 0, top: 0 }}
        >
          {nodes.map((node) => (
            <line
              key={`line-${node.id}`}
              x1={window.innerWidth / 2}
              y1={window.innerHeight / 2}
              x2={node.x}
              y2={node.y}
              stroke="#747574"
              strokeWidth="1"
              opacity="0.3"
            />
          ))}
        </svg>
      )}
      {nodes.map((node) => (
        <AuthorNode
          key={node.id}
          author={{
            id: node.id,
            name: node.name,
            description: "",
            genres: [],
            themes: [],
            similarity: node.similarity,
          }}
          x={node.x}
          y={node.y}
          isCentral={node.id === data.centralAuthor.id}
          onClick={(id: string) => router.push(`/${id}`)}
        />
      ))}
    </div>
  );
}

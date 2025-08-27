"use client";

import { useState, useEffect } from "react";

export default function Background() {
  const stroke = "#0d0d0d";
  const centerX = 600;
  const centerY = 400;
  const [randomLines, setRandomLines] = useState<
    Array<{ x2: number; y2: number; key: number }>
  >([]);

  const generateRandomLines = () => {
    const lines = [];
    const numLines = 22;

    for (let i = 0; i < numLines; i++) {
      const edge = Math.floor(Math.random() * 4);
      let x2: number, y2: number;

      switch (edge) {
        case 0:
          x2 = Math.floor(Math.random() * 1200);
          y2 = 0;
          break;
        case 1:
          x2 = 1200;
          y2 = Math.floor(Math.random() * 800);
          break;
        case 2:
          x2 = Math.floor(Math.random() * 1200);
          y2 = 800;
          break;
        case 3:
        default:
          x2 = 0;
          y2 = Math.floor(Math.random() * 800);
          break;
      }

      lines.push({ x2, y2, key: i });
    }
    return lines;
  };

  useEffect(() => {
    setRandomLines(generateRandomLines());
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <svg
        className="h-full w-full"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
      >
        {randomLines.map(({ x2, y2, key }) => (
          <line
            key={key}
            x1={centerX}
            y1={centerY}
            x2={x2}
            y2={y2}
            stroke={stroke}
            strokeWidth="1"
          />
        ))}
      </svg>
    </div>
  );
}

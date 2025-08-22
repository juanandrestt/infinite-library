"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import type { ApiResponse } from "../types";

export default function AuthorPage() {
	const params = useParams();
	const router = useRouter();
	const author = params.author as string;

	const [data, setData] = useState<ApiResponse | null>(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (author) {
			fetchAuthorData(author);
		}
	}, [author]);

	const fetchAuthorData = async (authorName: string) => {
		setLoading(true);
		try {
			const response = await fetch(`/api/authors/${authorName}`);
			if (!response.ok) throw new Error("Author not found");

			const data = await response.json();
			setData(data);
		} catch (error) {
			console.error("Failed to fetch author data:", error);
		} finally {
			setLoading(false);
		}
	};

	if (loading) {
		return (
			<div>
				<div>Exploring the infinite library...</div>
			</div>
		);
	}

	if (!data) {
		return (
			<div>
				<div>Author not found in the library...</div>
			</div>
		);
	}

	const authors = data.similarAuthors;

	return (
		<div className='relative w-screen h-screen'>
			<div
				className='absolute font-bold left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer'
				onClick={() => router.push(`/${data.centralAuthor.id}`)}>
				{data.centralAuthor.name}
			</div>

			{authors.map((author) => {
				const similarity = author.similarity ?? 0.5;
				const maxDistance =
					Math.min(window.innerWidth, window.innerHeight) * 0.45;
				const minDistance =
					Math.min(window.innerWidth, window.innerHeight) * 0.05;
				const distance =
					minDistance + (1 - similarity) * (maxDistance - minDistance);

				const seedHash = author.id.split("").reduce((a, b) => {
					a = (a << 5) - a + b.charCodeAt(0);
					return a & a;
				}, 0);
				const randomAngle = (seedHash % 360) * (Math.PI / 180);

				const x =
					50 + ((distance * Math.cos(randomAngle)) / window.innerWidth) * 100;
				const y =
					50 + ((distance * Math.sin(randomAngle)) / window.innerHeight) * 100;

				return (
					<div
						key={author.id}
						className='absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer'
						style={{
							left: `${x}%`,
							top: `${y}%`,
						}}
						onClick={() => router.push(`/${author.id}`)}>
						{author.name}
					</div>
				);
			})}
		</div>
	);
}

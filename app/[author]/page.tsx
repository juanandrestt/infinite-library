"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

interface Author {
	id: string;
	name: string;
	description: string;
	nationality: string;
	genres: string[];
	similarity?: number;
}

interface ApiResponse {
	centralAuthor: Author;
	similarAuthors: Author[];
}

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
			<div className='flex items-center justify-center min-h-screen'>
				<div className='text-xl'>Exploring the infinite library...</div>
			</div>
		);
	}

	if (!data) {
		return (
			<div className='flex items-center justify-center min-h-screen'>
				<div className='text-xl'>Author not found in the library...</div>
			</div>
		);
	}

	const RADIUS = 220;
	const CENTER = 250;
	const minRadius = 120;
	const maxRadius = RADIUS;
	const authors = data.similarAuthors;

	return (
		<div className='flex items-center justify-center min-h-screen'>
			<div
				className='relative mx-auto'
				style={{ width: 2 * CENTER, height: 2 * CENTER }}>
				<div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-2xl z-10 whitespace-nowrap'>
					{data.centralAuthor.name}
				</div>

				{authors.map((author, i) => {
					const angle = (2 * Math.PI * i) / authors.length;
					const radius =
						minRadius +
						(1 - (author.similarity ?? 0.5)) * (maxRadius - minRadius);
					const x = CENTER + radius * Math.cos(angle);
					const y = CENTER + radius * Math.sin(angle);
					return (
						<div
							key={author.id}
							className='absolute text-base font-normal cursor-pointer whitespace-nowrap'
							style={{
								left: `${x}px`,
								top: `${y}px`,
								transform: "translate(-50%, -50%)",
							}}
							onClick={() => router.push(`/${author.id}`)}>
							{author.name}
						</div>
					);
				})}
			</div>
		</div>
	);
}

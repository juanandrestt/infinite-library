"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import authorsData from "@/app/data/authors.json";
import { Author } from "./types";

const authors = Object.entries(authorsData).map(([id, author]) => ({
	id,
	...author,
}));

export default function HomePage() {
	const [searchQuery, setSearchQuery] = useState("");
	const [results, setResults] = useState<Author[]>([]);
	const [showDropdown, setShowDropdown] = useState(false);
	const router = useRouter();

	useEffect(() => {
		if (searchQuery.trim() === "") {
			setResults([]);
			setShowDropdown(false);
			return;
		}
		const filtered = authors.filter((author) =>
			author.name.toLowerCase().includes(searchQuery.toLowerCase())
		);
		setResults(filtered);
		setShowDropdown(filtered.length > 0);
	}, [searchQuery]);

	function handleSelect(author: Author) {
		router.push(`/${author.id}`);
	}

	return (
		<>
			<main className='relative flex flex-col items-center justify-center min-h-screen'>
				<h1 className='absolute top-6 text-4xl font-bold'>
					The Infinite Library
				</h1>

				<div className='relative w-100'>
					<input
						className='w-full border border-gray-300 p-2 focus:outline-none'
						type='text'
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						placeholder='Search author...'
						onFocus={() => setShowDropdown(results.length > 0)}
						onBlur={() => setTimeout(() => setShowDropdown(false), 100)}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								const match = results.find(
									(a) => a.name.toLowerCase() === searchQuery.toLowerCase()
								);
								if (match) {
									handleSelect(match);
								}
							}
						}}
					/>
					{showDropdown && (
						<ul className='absolute top-full left-0 right-0 mt-1 z-50'>
							{results.map((author) => (
								<li
									key={author.id}
									onMouseDown={() => handleSelect(author)}
									className='p-2 hover:bg-gray-100 cursor-pointer'>
									{author.name}
								</li>
							))}
						</ul>
					)}
				</div>
			</main>
			<footer className='absolute bottom-4 right-8 flex flex-col'>
				<a href='https://github.com/juanandrestt/marginalia'>github</a>
				<a href='https://www.juantrujillo.world'>by Juan Trujillo</a>
			</footer>
		</>
	);
}

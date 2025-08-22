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
		<div>
			<h1>The Infinite Library</h1>
			<input
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
				<ul>
					{results.map((author) => (
						<li key={author.id} onMouseDown={() => handleSelect(author)}>
							{author.name}
						</li>
					))}
				</ul>
			)}
			<footer>
				<a href='https://github.com/juanandrestt/infinite-library'>github</a>
				<a href='https://www.juantrujillo.world'>by Juan Trujillo</a>
			</footer>
		</div>
	);
}

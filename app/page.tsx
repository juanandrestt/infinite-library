"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
	const [searchQuery, setSearchQuery] = useState("");
	const router = useRouter();

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		if (searchQuery.trim()) {
			const authorId = searchQuery
				.toLowerCase()
				.replace(/\s+/g, "_")
				.replace(/[^\w_]/g, "");
			router.push(`/${authorId}`);
		}
	};

	return (
		<div className='min-h-screen flex flex-col items-center justify-start pt-16'>
			<h1 className='text-3xl font-bold mb-52'>The Infinite Library</h1>
			<form onSubmit={handleSearch} className='w-full max-w-sm flex gap-2'>
				<input
					type='text'
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					placeholder='Search author...'
					className='flex-1 border rounded px-4 py-2'
				/>
				<button type='submit' className='border rounded px-4 py-2'>
					Search
				</button>
			</form>

			<footer className='absolute bottom-4 right-8 flex flex-col'>
				<a href='https://github.com/juanandrestt/infinite-library'>github</a>
				<a href='https://www.juantrujillo.world'>by Juan Trujillo</a>
			</footer>
		</div>
	);
}

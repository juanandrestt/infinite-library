"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import authorsData from "@/app/data/authors.json";
import { Author } from "@/app/types";

const authors: Author[] = Object.entries(authorsData).map(([id, author]) => ({
  id,
  ...author,
}));

export default function SearchBar({
  onSelect,
}: {
  onSelect?: (author: Author) => void;
}) {
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
      author.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setResults(filtered);
    setShowDropdown(filtered.length > 0);
  }, [searchQuery]);

  function handleSelect(author: Author) {
    if (onSelect) {
      onSelect(author);
    } else {
      router.push(`/${author.id}`);
    }
  }

  return (
    <div className="relative w-100">
      <input
        className="w-full rounded-md border border-gray-400 bg-white p-2 focus:outline-none"
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search author..."
        onFocus={() => setShowDropdown(results.length > 0)}
        onBlur={() => setTimeout(() => setShowDropdown(false), 100)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            const match = results.find(
              (a) => a.name.toLowerCase() === searchQuery.toLowerCase(),
            );
            if (match) {
              handleSelect(match);
            }
          }
        }}
      />
      {showDropdown && (
        <ul className="absolute top-full right-0 left-0 z-50 mt-1 max-h-[30vh] overflow-y-auto border border-gray-400 bg-white p-2">
          {results.map((author) => (
            <li
              key={author.id}
              onMouseDown={() => handleSelect(author)}
              className="cursor-pointer border-b border-gray-100 p-1 hover:bg-gray-100"
            >
              {author.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

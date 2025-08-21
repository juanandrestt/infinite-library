import { NextRequest, NextResponse } from "next/server";
import findSimilarAuthors from "../../../lib/similarity";
import fs from "fs";
import path from "path";

const getAuthorsData = () => {
	const authorsPath = path.join(process.cwd(), "app", "data", "authors.json");
	return JSON.parse(fs.readFileSync(authorsPath, "utf8"));
};

const getEmbeddingsData = () => {
	const embeddingsPath = path.join(
		process.cwd(),
		"app",
		"data",
		"embeddings.json"
	);
	return JSON.parse(fs.readFileSync(embeddingsPath, "utf8"));
};

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ author: string }> }
) {
	try {
		const { author } = await params;

		const authorId = author
			.toLowerCase()
			.replace(/\s+/g, "_")
			.replace(/[^\w_]/g, "");

		const authorsData = getAuthorsData();
		const embeddingsData = getEmbeddingsData();

		if (!authorsData[authorId]) {
			return NextResponse.json(
				{ error: "Author not found in the infinite library" },
				{ status: 404 }
			);
		}

		const similarAuthors = findSimilarAuthors(authorId, embeddingsData, 35);

		const enrichedResults = similarAuthors.map(
			({ authorId: id, similarity }) => ({
				...authorsData[id],
				id,
				similarity: Math.round(similarity * 100) / 100,
			})
		);

		return NextResponse.json({
			centralAuthor: { ...authorsData[authorId], id: authorId },
			similarAuthors: enrichedResults,
		});
	} catch (error) {
		console.error("API Error:", error);
		return NextResponse.json(
			{ error: "Failed to explore the infinite library" },
			{ status: 500 }
		);
	}
}

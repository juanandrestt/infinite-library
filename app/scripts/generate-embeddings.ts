import fs from "fs";
import path from "path";
import { getEmbedding } from "../lib/embeddings";

async function generateAllEmbeddings() {
	const authorsPath = path.join(process.cwd(), "app", "data", "authors.json");
	const embeddingsPath = path.join(
		process.cwd(),
		"app",
		"data",
		"embeddings.json"
	);

	type Author = {
		name: string;
		description: string;
		genres: string[];
		themes: string[];
	};

	const authors: Record<string, Author> = JSON.parse(
		fs.readFileSync(authorsPath, "utf8")
	);
	const embeddings: Record<string, number[]> = {};

	for (const [authorId, authorData] of Object.entries(authors)) {
		console.log(`Generating embedding for ${authorData.name}...`);

		const embeddingText = `
    ${authorData.name}
    ${authorData.description}
    ${authorData.genres.join(",")}
    ${authorData.themes.join(",")}
    `;

		const embedding = await getEmbedding(embeddingText);

		if (embedding) {
			embeddings[authorId] = embedding;
			console.log(`Generated embedding for ${authorData.name}`);
		} else {
			console.log(`Failed to generate embedding for ${authorData.name}`);
		}

		await new Promise((resolve) => setTimeout(resolve, 2000));
	}

	fs.writeFileSync(embeddingsPath, JSON.stringify(embeddings, null, 2));
	console.log("All embeddings generated and saved to embeddings.json");
}

generateAllEmbeddings().catch(console.error);

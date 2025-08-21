export function cosineSimilarity(vecA: number[], vecB: number[]): number {
	const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
	const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
	const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
	return dotProduct / (magnitudeA * magnitudeB);
}

export default function findSimilarAuthors(
	targetAuthorId: string,
	allEmbeddings: Record<string, number[]>,
	limit: number = 20
) {
	const targetEmbedding = allEmbeddings[targetAuthorId];
	if (!targetEmbedding) return [];

	const similarities = Object.entries(allEmbeddings)
		.filter(([id]) => id !== targetAuthorId)
		.map(([id, embedding]) => ({
			authorId: id,
			similarity: cosineSimilarity(targetEmbedding, embedding),
		}))
		.sort((a, b) => b.similarity - a.similarity)
		.slice(0, limit);

	if (similarities.length > 1) {
		const maxSim = similarities[0].similarity;
		const minSim = similarities[similarities.length - 1].similarity;
		const range = maxSim - minSim;

		if (range > 0) {
			similarities.forEach((item) => {
				const normalized = (item.similarity - minSim) / range;
				item.similarity = Math.sqrt(normalized);
			});
		}
	}

	return similarities;
}

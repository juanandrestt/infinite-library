import { InferenceClient } from "@huggingface/inference";

const hf = new InferenceClient(process.env.HF_ACCESS_TOKEN);

export async function getEmbedding(text: string) {
	try {
		const response = await hf.featureExtraction({
			model: "sentence-transformers/all-MiniLM-L6-v2",
			inputs: text,
		});
		return response as number[];
	} catch (error) {
		console.error("Embedding generation failed:", error);
		return null;
	}
}

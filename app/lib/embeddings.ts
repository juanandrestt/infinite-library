import { InferenceClient } from "@huggingface/inference";
import "dotenv/config";

const client = new InferenceClient(process.env.HF_ACCESS_TOKEN);

export async function getEmbedding(text: string) {
	const response = await client.featureExtraction({
		model: "intfloat/multilingual-e5-large",
		inputs: text,
		provider: "hf-inference",
	});
	return response as number[];
}

import { z } from "zod";

export const GeneratePromptSchema = z.object({
  productId: z.string().min(1, "Product ID wajib diisi"),
  overrideLocation: z.string().optional(),
  overrideScriptText: z.string().optional(),
});

export type GeneratePromptInput = z.infer<typeof GeneratePromptSchema>;

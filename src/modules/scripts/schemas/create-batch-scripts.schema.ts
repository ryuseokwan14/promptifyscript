import { z } from "zod";

export const CreateBatchScriptsSchema = z.object({
  productId: z.string().min(1, "Product ID wajib diisi"),
  texts: z.array(z.string().min(1)).min(1, "Minimal satu script teks"),
});

export type CreateBatchScriptsInput = z.infer<typeof CreateBatchScriptsSchema>;

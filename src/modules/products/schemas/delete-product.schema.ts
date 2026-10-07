import { z } from "zod";

export const DeleteProductSchema = z.object({
  id: z.string().min(1, "ID produk wajib diisi"),
});

export type DeleteProductInput = z.infer<typeof DeleteProductSchema>;

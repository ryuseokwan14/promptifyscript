import { z } from "zod";

export const DeleteBatchProductsSchema = z.object({
  ids: z.array(z.string()).min(1, "Minimal satu ID produk wajib disertakan"),
});

export type DeleteBatchProductsInput = z.infer<typeof DeleteBatchProductsSchema>;

import { z } from "zod";

export const CreateScriptSchema = z.object({
  productId: z.string().min(1, "ID produk wajib diisi"),
  text: z.string().min(5, "Naskah ucapan minimal 5 karakter"),
  variationType: z.string().optional().default("Custom Hook"),
  estimatedSeconds: z.number().optional(),
  retention: z.number().optional().default(90),
});

export type CreateScriptInput = z.input<typeof CreateScriptSchema>;


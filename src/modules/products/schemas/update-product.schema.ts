import { z } from "zod";

export const UpdateProductSchema = z.object({
  id: z.string().min(1, "ID produk wajib diisi"),
  name: z.string().min(2, "Nama produk minimal 2 karakter").optional(),
  gender: z.enum(["female", "male"]).optional(),
  itemDesc: z.string().nullable().optional(),
  icon: z.string().nullable().optional(),
  imageUrl: z.string().nullable().optional(),
  imageFit: z.string().nullable().optional(),
  imageTexture: z.string().nullable().optional(),
  imageAtmosphere: z.string().nullable().optional(),
});

export type UpdateProductInput = z.infer<typeof UpdateProductSchema>;

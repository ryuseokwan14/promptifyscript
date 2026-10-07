import { z } from "zod";

export const CreateProductSchema = z.object({
  name: z.string().min(2, "Nama produk minimal 2 karakter"),
  gender: z.enum(["female", "male"]),
  itemDesc: z.string().nullable().optional(),
  icon: z.string().nullable().optional(),
  imageUrl: z.string().nullable().optional(),
  imageFit: z.string().nullable().optional(),
  imageTexture: z.string().nullable().optional(),
  imageAtmosphere: z.string().nullable().optional(),
});

export type CreateProductInput = z.infer<typeof CreateProductSchema>;

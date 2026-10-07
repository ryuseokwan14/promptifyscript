import { z } from "zod";

export const UpdateLocationSchema = z.object({
  id: z.string().min(1, "ID lokasi wajib diisi"),
  name: z.string().min(3, "Nama lokasi minimal 3 karakter"),
  vibe: z
    .enum(["casual_aesthetic", "urban_adventure", "universal"])
    .optional(),
});

export type UpdateLocationInput = z.infer<typeof UpdateLocationSchema>;

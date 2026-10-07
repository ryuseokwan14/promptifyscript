import { z } from "zod";

export const CreateLocationSchema = z.object({
  name: z.string().min(3, "Nama lokasi minimal 3 karakter"),
  vibe: z
    .enum(["casual_aesthetic", "urban_adventure", "universal"])
    .optional()
    .default("universal"),
});

export type CreateLocationInput = z.input<typeof CreateLocationSchema>;


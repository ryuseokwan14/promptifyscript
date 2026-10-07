import { z } from "zod";

export const CreateBatchLocationsSchema = z.object({
  names: z.array(z.string().min(1, "Nama lokasi tidak boleh kosong")).min(1, "Minimal 1 lokasi"),
  vibe: z
    .enum(["casual_aesthetic", "urban_adventure", "universal"])
    .optional()
    .default("universal"),
});

export type CreateBatchLocationsInput = z.input<typeof CreateBatchLocationsSchema>;

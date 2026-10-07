import { z } from "zod";

export const DeleteLocationSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
}).refine((data) => data.id || data.name, {
  message: "ID atau nama lokasi harus diisi",
});

export type DeleteLocationInput = z.infer<typeof DeleteLocationSchema>;

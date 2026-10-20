import { z } from "zod";

export const DeleteActionSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
}).refine((data) => data.id || data.name, {
  message: "ID atau nama aksi harus diisi",
});

export type DeleteActionInput = z.infer<typeof DeleteActionSchema>;

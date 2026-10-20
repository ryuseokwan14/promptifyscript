import { z } from "zod";

export const UpdateActionSchema = z.object({
  id: z.string().min(1, "ID aksi tidak boleh kosong"),
  name: z.string().min(2, "Nama aksi minimal 2 karakter"),
});

export type UpdateActionInput = z.infer<typeof UpdateActionSchema>;

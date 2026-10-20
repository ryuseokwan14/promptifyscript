import { z } from "zod";

export const CreateActionSchema = z.object({
  name: z.string().min(2, "Nama aksi minimal 2 karakter"),
});

export type CreateActionInput = z.infer<typeof CreateActionSchema>;

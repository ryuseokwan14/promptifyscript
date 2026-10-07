import { z } from "zod";

export const UpdateTemplatesSchema = z.object({
  female: z.string().min(20, "Template wanita minimal 20 karakter"),
  male: z.string().min(20, "Template pria minimal 20 karakter"),
});

export type UpdateTemplatesInput = z.infer<typeof UpdateTemplatesSchema>;

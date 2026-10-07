import { z } from "zod";

export const ResetCreatorSchema = z.object({
  email: z.string().email("Format email tidak valid").optional(),
  newPassword: z.string().min(6, "Password baru minimal 6 karakter"),
});

export type ResetCreatorSchemaType = z.infer<typeof ResetCreatorSchema>;

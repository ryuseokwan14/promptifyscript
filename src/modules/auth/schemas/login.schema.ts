import { z } from "zod";

export const LoginSchema = z.object({
  identifier: z.string().min(1, "Identifier/Username/Email wajib diisi"),
  password: z.string().min(1, "Password wajib diisi"),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;

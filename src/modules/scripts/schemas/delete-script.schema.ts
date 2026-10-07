import { z } from "zod";

export const DeleteScriptSchema = z.object({
  id: z.string().min(1, "ID script wajib diisi"),
});

export type DeleteScriptInput = z.infer<typeof DeleteScriptSchema>;

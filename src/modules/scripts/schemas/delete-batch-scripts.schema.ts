import { z } from "zod";

export const DeleteBatchScriptsSchema = z.object({
  ids: z.array(z.string()).min(1, "Minimal satu ID naskah wajib disertakan"),
});

export type DeleteBatchScriptsInput = z.infer<typeof DeleteBatchScriptsSchema>;

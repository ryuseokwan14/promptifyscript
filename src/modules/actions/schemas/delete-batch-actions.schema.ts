import { z } from "zod";

export const DeleteBatchActionsSchema = z.object({
  idsOrNames: z
    .array(z.string().min(1, "Identifier tidak boleh kosong"))
    .min(1, "Minimal 1 aksi untuk dihapus"),
});

export type DeleteBatchActionsInput = z.infer<typeof DeleteBatchActionsSchema>;

import { z } from "zod";

export const CreateBatchActionsSchema = z.object({
  names: z.array(z.string().min(1, "Nama aksi tidak boleh kosong")).min(1, "Minimal 1 aksi"),
});

export type CreateBatchActionsInput = z.infer<typeof CreateBatchActionsSchema>;

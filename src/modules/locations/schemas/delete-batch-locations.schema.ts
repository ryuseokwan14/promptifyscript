import { z } from "zod";

export const DeleteBatchLocationsSchema = z.object({
  idsOrNames: z.array(z.string()).min(1, "Minimal satu ID atau nama lokasi wajib disertakan"),
});

export type DeleteBatchLocationsInput = z.infer<typeof DeleteBatchLocationsSchema>;

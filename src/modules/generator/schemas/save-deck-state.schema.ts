import { z } from "zod";

export const SaveDeckStateSchema = z.object({
  pools: z.record(z.string(), z.array(z.string())),
  cycles: z.record(z.string(), z.number()),
});

export type SaveDeckStateInput = z.infer<typeof SaveDeckStateSchema>;

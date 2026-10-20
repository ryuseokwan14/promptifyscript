import { z } from "zod";

export const ResetDeckStateSchema = z.object({
  productId: z.string().optional(),
});

export type ResetDeckStateInput = z.infer<typeof ResetDeckStateSchema>;

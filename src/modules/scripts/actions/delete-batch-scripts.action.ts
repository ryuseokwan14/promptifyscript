"use server";

import { deleteBatchScriptsUseCase } from "../use-cases/delete-batch-scripts.use-case";
import { DeleteBatchScriptsInput } from "../schemas/delete-batch-scripts.schema";

export async function deleteBatchScriptsAction(input: DeleteBatchScriptsInput) {
  try {
    const res = await deleteBatchScriptsUseCase.execute(input);
    return {
      success: true,
      count: res.count,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Gagal menghapus batch naskah",
    };
  }
}

"use server";

import { deleteBatchProductsUseCase } from "../use-cases/delete-batch-products.use-case";
import { DeleteBatchProductsInput } from "../schemas/delete-batch-products.schema";

export async function deleteBatchProductsAction(input: DeleteBatchProductsInput) {
  try {
    const res = await deleteBatchProductsUseCase.execute(input);
    return {
      success: true,
      count: res.count,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Gagal menghapus batch produk",
    };
  }
}

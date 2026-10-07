"use server";

import { deleteProductUseCase } from "../use-cases/delete-product.use-case";
import { DeleteProductInput, DeleteProductSchema } from "../schemas/delete-product.schema";

export async function deleteProductAction(input: DeleteProductInput) {
  try {
    const validated = DeleteProductSchema.parse(input);
    const deleted = await deleteProductUseCase.execute(validated);
    return { success: true, data: deleted };
  } catch (error) {
    console.error("Failed to delete product:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Gagal menghapus produk",
    };
  }
}

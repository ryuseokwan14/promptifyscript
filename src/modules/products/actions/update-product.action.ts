"use server";

import { updateProductUseCase } from "../use-cases/update-product.use-case";
import { UpdateProductInput, UpdateProductSchema } from "../schemas/update-product.schema";

export async function updateProductAction(input: UpdateProductInput) {
  try {
    const validated = UpdateProductSchema.parse(input);
    const updated = await updateProductUseCase.execute(validated);
    return { success: true, data: updated };
  } catch (error) {
    console.error("Failed to update product:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Gagal memperbarui data produk",
    };
  }
}

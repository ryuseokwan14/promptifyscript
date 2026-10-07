"use server";

import { createProductUseCase } from "../use-cases/create-product.use-case";
import { CreateProductInput, CreateProductSchema } from "../schemas/create-product.schema";

export async function createProductAction(input: CreateProductInput) {
  try {
    const validated = CreateProductSchema.parse(input);
    const product = await createProductUseCase.execute(validated);
    return { success: true, data: product };
  } catch (error) {
    console.error("Failed to create product:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Gagal menambahkan produk baru",
    };
  }
}

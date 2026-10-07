"use server";

import { getProductsUseCase } from "../use-cases/get-products.use-case";

export async function getProductsAction() {
  try {
    const products = await getProductsUseCase.execute();
    return { success: true, data: products };
  } catch (error) {
    console.error("Failed to get products:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Gagal mengambil data produk",
    };
  }
}

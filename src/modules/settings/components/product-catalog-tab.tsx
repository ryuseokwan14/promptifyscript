import React from "react";
import { Product, ScriptItem } from "@/types";
import { AddProductForm } from "./add-product-form";
import { ProductsTable } from "./products-table";

interface ProductCatalogTabProps {
  products: Product[];
  scripts: ScriptItem[];
  onAddProduct: (item: Omit<Product, "id">) => void;
  onUpdateProduct?: (product: Partial<Product> & { id: string }) => Promise<void> | void;
  onDeleteProduct: (id: string) => void;
  onDeleteBatchProducts?: (ids: string[]) => Promise<boolean | void>;
  onSelectProductForScripts: (id: string) => void;
}

export function ProductCatalogTab({
  products,
  scripts,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onDeleteBatchProducts,
  onSelectProductForScripts,
}: ProductCatalogTabProps) {
  return (
    <section className="flex flex-col gap-space-lg">
      <AddProductForm onAddProduct={onAddProduct} />
      <ProductsTable
        products={products}
        scripts={scripts}
        onDeleteProduct={onDeleteProduct}
        onDeleteBatchProducts={onDeleteBatchProducts}
        onUpdateProduct={onUpdateProduct}
        onSelectProductForScripts={onSelectProductForScripts}
      />
    </section>
  );
}

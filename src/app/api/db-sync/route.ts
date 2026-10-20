import { NextResponse } from "next/server";
import { getProductsUseCase } from "@/modules/products/use-cases/get-products.use-case";
import { createProductUseCase } from "@/modules/products/use-cases/create-product.use-case";
import { updateProductUseCase } from "@/modules/products/use-cases/update-product.use-case";
import { productRepository } from "@/modules/products/repositories/product.repository";
import { getLocationsUseCase } from "@/modules/locations/use-cases/get-locations.use-case";
import { getScriptsUseCase } from "@/modules/scripts/use-cases/get-scripts.use-case";
import { getTemplatesUseCase } from "@/modules/templates/use-cases/get-templates.use-case";
import { resetCreatorUseCase } from "@/modules/auth/use-cases/reset-creator.use-case";
import { getDeckStateUseCase } from "@/modules/generator/use-cases/get-deck-state.use-case";
import { saveDeckStateUseCase } from "@/modules/generator/use-cases/save-deck-state.use-case";
import { resetDeckStateUseCase } from "@/modules/generator/use-cases/reset-deck-state.use-case";
import { getActionsUseCase } from "@/modules/actions/use-cases/get-actions.use-case";
import { createActionUseCase } from "@/modules/actions/use-cases/create-action.use-case";
import { createBatchActionsUseCase } from "@/modules/actions/use-cases/create-batch-actions.use-case";
import { updateActionUseCase } from "@/modules/actions/use-cases/update-action.use-case";
import { deleteActionUseCase } from "@/modules/actions/use-cases/delete-action.use-case";
import { deleteBatchActionsUseCase } from "@/modules/actions/use-cases/delete-batch-actions.use-case";

export async function GET() {
  try {
    const [products, locations, scripts, templates, deckState, actions] = await Promise.all([
      getProductsUseCase.execute(),
      getLocationsUseCase.execute(),
      getScriptsUseCase.execute(),
      getTemplatesUseCase.execute(),
      getDeckStateUseCase.execute(),
      getActionsUseCase.execute(),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        products,
        locations,
        scripts,
        templates,
        deckState,
        actions,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Terjadi kesalahan sinkronisasi";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, product } = body;

    if (action === "create-product" && product) {
      const created = await createProductUseCase.execute({
        name: product.name,
        gender: product.gender,
        itemDesc: product.itemDesc,
        icon: product.icon,
        imageUrl: product.imageUrl,
        imageFit: product.imageFit,
        imageTexture: product.imageTexture,
        imageAtmosphere: product.imageAtmosphere,
      });
      return NextResponse.json({ success: true, data: created });
    }

    if (action === "update-product" && product && product.id) {
      const updated = await updateProductUseCase.execute({
        id: product.id,
        name: product.name,
        gender: product.gender,
        itemDesc: product.itemDesc,
        icon: product.icon,
        imageUrl: product.imageUrl,
        imageFit: product.imageFit,
        imageTexture: product.imageTexture,
        imageAtmosphere: product.imageAtmosphere,
      });
      return NextResponse.json({ success: true, data: updated });
    }

    if (action === "update-creator" && body.password) {
      const resetRes = await resetCreatorUseCase.execute({
        email: body.email,
        newPassword: body.password,
      });
      return NextResponse.json({ success: true, data: resetRes });
    }

    if (action === "update-deck-state" && body.deckState) {
      await saveDeckStateUseCase.execute(body.deckState);
      return NextResponse.json({ success: true });
    }

    if (action === "reset-deck-state") {
      const resetRes = await resetDeckStateUseCase.execute({ productId: body.productId });
      return NextResponse.json({ success: true, data: resetRes });
    }

    if (action === "create-action" && body.name) {
      const created = await createActionUseCase.execute({ name: body.name });
      return NextResponse.json({ success: true, data: created });
    }

    if (action === "create-batch-actions" && Array.isArray(body.names)) {
      const res = await createBatchActionsUseCase.execute({ names: body.names });
      return NextResponse.json({ success: true, count: res.count });
    }

    if (action === "update-action" && body.id && body.name) {
      const updated = await updateActionUseCase.execute({ id: body.id, name: body.name });
      return NextResponse.json({ success: true, data: updated });
    }

    if (action === "delete-action" && (body.id || body.name)) {
      await deleteActionUseCase.execute({ id: body.id, name: body.name });
      return NextResponse.json({ success: true });
    }

    if (action === "delete-batch-actions" && Array.isArray(body.idsOrNames)) {
      const res = await deleteBatchActionsUseCase.execute({ idsOrNames: body.idsOrNames });
      return NextResponse.json({ success: true, count: res.count });
    }

    // Default full sync products
    if (Array.isArray(body.products)) {
      const results = [];
      for (const item of body.products) {
        if (item.id) {
          const existing = await productRepository.findById(item.id);
          if (existing) {
            const upd = await updateProductUseCase.execute({
              id: item.id,
              name: item.name,
              gender: item.gender,
              itemDesc: item.itemDesc,
              icon: item.icon,
              imageUrl: item.imageUrl,
            });
            results.push(upd);
            continue;
          }
        }
        if (item.name) {
          const crt = await createProductUseCase.execute({
            name: item.name,
            gender: item.gender || "female",
            itemDesc: item.itemDesc,
            icon: item.icon,
            imageUrl: item.imageUrl,
          });
          results.push(crt);
        }
      }
      return NextResponse.json({ success: true, count: results.length });
    }

    return NextResponse.json({ success: false, error: "Aksi tidak dikenali" }, { status: 400 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Gagal menyimpan perubahan";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

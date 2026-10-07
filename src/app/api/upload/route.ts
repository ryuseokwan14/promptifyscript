import { NextResponse } from "next/server";
import { imageCompressionService } from "@/infrastructure/storage/image-compression.service";
import { storageService } from "@/infrastructure/storage/storage.service";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "Berkas tidak ditemukan." },
        { status: 400 }
      );
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { success: false, error: "Hanya berkas gambar yang diizinkan." },
        { status: 400 }
      );
    }

    // 1. Baca buffer gambar
    const arrayBuffer = await file.arrayBuffer();
    const inputBuffer = Buffer.from(arrayBuffer);

    // 2. Kompresi gambar dan ubah format ke WebP menggunakan sharp
    const webpBuffer = await imageCompressionService.compressToWebP(inputBuffer, {
      maxWidth: 1200,
      maxHeight: 1200,
      quality: 80,
    });

    // 3. Simpan buffer WebP ke Supabase Storage
    const publicUrl = await storageService.uploadWebPBuffer(webpBuffer, file.name);

    return NextResponse.json({
      success: true,
      url: publicUrl,
      format: "webp",
      originalSize: file.size,
      compressedSize: webpBuffer.length,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Terjadi kesalahan saat memproses gambar.";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

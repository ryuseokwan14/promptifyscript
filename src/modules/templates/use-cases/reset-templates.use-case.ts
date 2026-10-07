import { templateRepository } from "../repositories/template.repository";

export const DEFAULT_FEMALE_TEMPLATE = `Seorang Perempuan berjalan dengan suasana ceria dan gerakan ringan model berada di {tempat}, Gerakan tangan ringan menunjuk ke arah celana. Sedikit menggeser berat badan kanan-kiri secara natural., ekspresi bahagia namun natural, berbicara jelas ke kamera dengan bahasa indonesia: “{Script gerak bibir}” video realistis, tanpa subtitle & musik`;

export const DEFAULT_MALE_TEMPLATE = `Seorang Pria berjalan dengan langkah santai dan percaya diri model berada di {tempat}, Gerakan tangan santai menunjuk ke arah celana. Sedikit menggeser berat badan kanan-kiri secara natural., ekspresi santai namun percaya diri, berbicara jelas ke kamera dengan bahasa indonesia: “{Script gerak bibir}” video realistis, tanpa subtitle & musik`;

export class ResetTemplatesUseCase {
  async execute() {
    await Promise.all([
      templateRepository.upsert("female", DEFAULT_FEMALE_TEMPLATE),
      templateRepository.upsert("male", DEFAULT_MALE_TEMPLATE),
    ]);

    return { female: DEFAULT_FEMALE_TEMPLATE, male: DEFAULT_MALE_TEMPLATE };
  }
}

export const resetTemplatesUseCase = new ResetTemplatesUseCase();

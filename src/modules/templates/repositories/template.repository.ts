import { prisma } from "@/infrastructure/prisma/prisma.client";

export class TemplateRepository {
  async findAll() {
    return prisma.masterTemplate.findMany();
  }

  async findByGender(gender: "female" | "male") {
    return prisma.masterTemplate.findUnique({
      where: { gender },
    });
  }

  async upsert(gender: "female" | "male", content: string) {
    return prisma.masterTemplate.upsert({
      where: { gender },
      update: { content },
      create: { gender, content },
    });
  }
}

export const templateRepository = new TemplateRepository();

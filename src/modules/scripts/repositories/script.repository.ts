import { prisma } from "@/infrastructure/prisma/prisma.client";
import { Prisma } from "@prisma/client";

export class ScriptRepository {
  async findAll() {
    return prisma.scriptItem.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findByProductId(productId: string) {
    return prisma.scriptItem.findMany({
      where: { productId },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findById(id: string) {
    return prisma.scriptItem.findUnique({
      where: { id },
    });
  }

  async create(data: Prisma.ScriptItemCreateInput) {
    return prisma.scriptItem.create({
      data,
    });
  }

  async createMany(items: { productId: string; text: string; variationType?: string; estimatedSeconds?: number }[]) {
    return prisma.scriptItem.createMany({
      data: items,
    });
  }

  async incrementUsedCount(id: string) {
    return prisma.scriptItem.update({
      where: { id },
      data: {
        usedCount: {
          increment: 1,
        },
      },
    });
  }

  async delete(id: string) {
    return prisma.scriptItem.delete({
      where: { id },
    });
  }

  async deleteMany(ids: string[]) {
    return prisma.scriptItem.deleteMany({
      where: {
        id: { in: ids },
      },
    });
  }
}

export const scriptRepository = new ScriptRepository();

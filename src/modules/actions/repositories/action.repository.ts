import { prisma } from "@/infrastructure/prisma/prisma.client";
import { Prisma } from "@prisma/client";

export class ActionRepository {
  async findAll() {
    return prisma.action.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findByName(name: string) {
    return prisma.action.findUnique({
      where: { name },
    });
  }

  async findById(id: string) {
    return prisma.action.findUnique({
      where: { id },
    });
  }

  async create(data: Prisma.ActionCreateInput) {
    return prisma.action.create({
      data,
    });
  }

  async createMany(items: { name: string }[]) {
    return prisma.action.createMany({
      data: items,
      skipDuplicates: true,
    });
  }

  async update(id: string, data: Prisma.ActionUpdateInput) {
    return prisma.action.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return prisma.action.delete({
      where: { id },
    });
  }

  async deleteMany(idsOrNames: string[]) {
    return prisma.action.deleteMany({
      where: {
        OR: [
          { id: { in: idsOrNames } },
          { name: { in: idsOrNames } },
        ],
      },
    });
  }
}

export const actionRepository = new ActionRepository();

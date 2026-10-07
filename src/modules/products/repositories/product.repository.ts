import { prisma } from "@/infrastructure/prisma/prisma.client";
import { Prisma } from "@prisma/client";

export class ProductRepository {
  async findAll() {
    return prisma.product.findMany({
      include: {
        scripts: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findById(id: string) {
    return prisma.product.findUnique({
      where: { id },
      include: {
        scripts: true,
      },
    });
  }


  async create(data: Prisma.ProductCreateInput) {
    return prisma.product.create({
      data,
    });
  }

  async update(id: string, data: Prisma.ProductUpdateInput) {
    return prisma.product.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return prisma.product.delete({
      where: { id },
    });
  }

  async deleteMany(ids: string[]) {
    return prisma.product.deleteMany({
      where: {
        id: { in: ids },
      },
    });
  }
}

export const productRepository = new ProductRepository();

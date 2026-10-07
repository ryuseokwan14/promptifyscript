import { prisma } from "@/infrastructure/prisma/prisma.client";
import { Prisma } from "@prisma/client";

export class LocationRepository {
  async findAll() {
    return prisma.location.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findByVibe(vibes: string[]) {
    return prisma.location.findMany({
      where: {
        vibe: {
          in: vibes,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findByName(name: string) {
    return prisma.location.findUnique({
      where: { name },
    });
  }

  async findById(id: string) {
    return prisma.location.findUnique({
      where: { id },
    });
  }

  async create(data: Prisma.LocationCreateInput) {
    return prisma.location.create({
      data,
    });
  }

  async createMany(items: { name: string; vibe?: string }[]) {
    return prisma.location.createMany({
      data: items,
      skipDuplicates: true,
    });
  }

  async update(id: string, data: Prisma.LocationUpdateInput) {
    return prisma.location.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return prisma.location.delete({
      where: { id },
    });
  }

  async deleteMany(idsOrNames: string[]) {
    return prisma.location.deleteMany({
      where: {
        OR: [
          { id: { in: idsOrNames } },
          { name: { in: idsOrNames } },
        ],
      },
    });
  }
}

export const locationRepository = new LocationRepository();

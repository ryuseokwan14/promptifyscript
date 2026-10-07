import { prisma } from "@/infrastructure/prisma";
import { hashPassword } from "@/infrastructure/auth";

export class AuthRepository {
  async getCreator() {
    let user = await prisma.appUser.findFirst({
      where: { role: "CREATOR" },
    });

    if (!user) {
      // Inisialisasi akun creator default jika belum ada di database
      user = await prisma.appUser.create({
        data: {
          email: "najmishfwn@gmail.com",
          password: hashPassword("184004@Najmi"),
          role: "CREATOR",
        },
      });
    }

    return user;
  }

  async findByEmail(email: string) {
    return prisma.appUser.findUnique({
      where: { email },
    });
  }

  async updatePassword(id: string, newPasswordHash: string) {
    return prisma.appUser.update({
      where: { id },
      data: {
        password: newPasswordHash,
      },
    });
  }

  async updateCreatorCredentials(id: string, data: { email?: string; password?: string }) {
    return prisma.appUser.update({
      where: { id },
      data: {
        ...(data.email ? { email: data.email } : {}),
        ...(data.password ? { password: data.password } : {}),
      },
    });
  }
}

export const authRepository = new AuthRepository();

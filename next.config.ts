import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["sharp"],
  allowedDevOrigins: [
    "100.116.192.50",
    "cachyos-dl3420",
    "cachyos-dl3420.tail982ab0.ts.net",
    "*.ts.net",
    "192.168.1.100",
  ],
  experimental: {
    serverActions: {
      allowedOrigins: [
        "100.116.192.50",
        "100.116.192.50:3000",
        "cachyos-dl3420",
        "cachyos-dl3420:3000",
        "cachyos-dl3420.tail982ab0.ts.net",
        "cachyos-dl3420.tail982ab0.ts.net:3000",
        "*.ts.net",
        "*.ts.net:3000",
        "192.168.1.100",
        "192.168.1.100:3000",
      ],
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co",
      },
    ],
  },
};

export default nextConfig;

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("[SEED] Starting database seeding...");

  // 1. Seed Master Templates
  console.log("Seeding Master Templates...");
  await prisma.masterTemplate.upsert({
    where: { gender: "female" },
    update: {
      content: `Seorang Perempuan berjalan dengan suasana ceria dan gerakan ringan model berada di {tempat}, Gerakan tangan ringan menunjuk ke arah celana. Sedikit menggeser berat badan kanan-kiri secara natural., ekspresi bahagia namun natural, berbicara jelas ke kamera dengan bahasa indonesia: “{Script gerak bibir}” video realistis, tanpa subtitle & musik`,
    },
    create: {
      gender: "female",
      content: `Seorang Perempuan berjalan dengan suasana ceria dan gerakan ringan model berada di {tempat}, Gerakan tangan ringan menunjuk ke arah celana. Sedikit menggeser berat badan kanan-kiri secara natural., ekspresi bahagia namun natural, berbicara jelas ke kamera dengan bahasa indonesia: “{Script gerak bibir}” video realistis, tanpa subtitle & musik`,
    },
  });

  await prisma.masterTemplate.upsert({
    where: { gender: "male" },
    update: {
      content: `Seorang Pria berjalan dengan langkah santai dan percaya diri model berada di {tempat}, Gerakan tangan santai menunjuk ke arah celana. Sedikit menggeser berat badan kanan-kiri secara natural., ekspresi santai namun percaya diri, berbicara jelas ke kamera dengan bahasa indonesia: “{Script gerak bibir}” video realistis, tanpa subtitle & musik`,
    },
    create: {
      gender: "male",
      content: `Seorang Pria berjalan dengan langkah santai dan percaya diri model berada di {tempat}, Gerakan tangan santai menunjuk ke arah celana. Sedikit menggeser berat badan kanan-kiri secara natural., ekspresi santai namun percaya diri, berbicara jelas ke kamera dengan bahasa indonesia: “{Script gerak bibir}” video realistis, tanpa subtitle & musik`,
    },
  });

  // 2. Seed Locations with Vibe Persona Categories
  console.log("Seeding Locations...");
  const locationsData = [
    // Casual Aesthetic (Santai - Kulot / Skirt)
    { name: "coffee shop outdoor bernuansa kayu minimalis", vibe: "casual_aesthetic" },
    { name: "pedestrian walk trotoar Sudirman sore hari", vibe: "casual_aesthetic" },
    { name: "teras cafe bergaya Parisienne di kawasan Senopati", vibe: "casual_aesthetic" },
    { name: "taman botani asri dengan pancaran sinar matahari lembut", vibe: "casual_aesthetic" },
    { name: "art gallery modern berdinding monokrom", vibe: "casual_aesthetic" },

    // Urban & Adventure (Cargo / Streetwear / Outdoor)
    { name: "underground subway tunnel bergaya urban brutalist", vibe: "urban_adventure" },
    { name: "skatepark modern dengan grafiti minimalis", vibe: "urban_adventure" },
    { name: "rooftop parkir gedung beton berbayang dramatis", vibe: "urban_adventure" },
    { name: "industrial open space cafe bergaya Tokyo style", vibe: "urban_adventure" },
    { name: "jembatan penyeberangan modern berarsitektur sleek", vibe: "urban_adventure" },

    // Universal (Bisa semua)
    { name: "clean grey seamless photo studio dengan soft lighting", vibe: "universal" },
    { name: "living room minimalis pencahayaan jendela pagi", vibe: "universal" },
    { name: "rooftop lounge dengan view gedung kota Jakarta", vibe: "universal" },
  ];

  for (const loc of locationsData) {
    await prisma.location.upsert({
      where: { name: loc.name },
      update: { vibe: loc.vibe },
      create: loc,
    });
  }

  // 3. Seed Products and their Linked Scripts
  console.log("Seeding Products and Scripts...");
  const productsData = [
    {
      name: "Celana Kulot Linen",
      gender: "female",
      itemDesc: "Celana Kulot Linen warna broken white yang jatuh elegan",
      icon: "checkroom",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDoMi9wCgPYVxP-06FiQvmR8sVLvOKlbs3zM0WYn3Cum4OdtDCUtBin4Dz9L97YKNiKxC63EsFiISDliuDfCUJtsbyPjvMeHaEk1Yt7BApHR6CPl3unVzxy4fCCLHCJ548jNDZ7sCwDiPHJelHfWaEuYpFZ-TvCUII06InoHUP2TDCa2TxOTNYkeApCWvkZSmnfnhxr9g7FPksPxdBsG6xJUoU7pj2O7VEBuKOfxE-L",
      imageFit: "https://lh3.googleusercontent.com/aida-public/AB6AXuDoMi9wCgPYVxP-06FiQvmR8sVLvOKlbs3zM0WYn3Cum4OdtDCUtBin4Dz9L97YKNiKxC63EsFiISDliuDfCUJtsbyPjvMeHaEk1Yt7BApHR6CPl3unVzxy4fCCLHCJ548jNDZ7sCwDiPHJelHfWaEuYpFZ-TvCUII06InoHUP2TDCa2TxOTNYkeApCWvkZSmnfnhxr9g7FPksPxdBsG6xJUoU7pj2O7VEBuKOfxE-L",
      imageTexture: "https://lh3.googleusercontent.com/aida-public/AB6AXuC9b2ESD-afd_iJpVF4bOO3BhCqxSJRE9jf0a6F4XOBYm3qBa7VFjz3hZyd7DL-AYS5gty_Mrzq_j4hJ-IzKmdRlUEyGLDkQhZxKjez1Nc-E-Q2elXWeocYc8cg430qsRDoH7AeuAyWU_v_KaVQp6MqwYQlT9g975nvYnhjBPTYrftdvTdIpOdsi1fd7EiXsTPsk2uCzzBuSxA7goedbaCP8djeTBI1h7slW00hzd6D",
      imageAtmosphere: "https://lh3.googleusercontent.com/aida-public/AB6AXuCdRDtnVd4ZSzDbxb71nF5dz4z6l_cHEKM-hGL5h-F53DoDVpgHCig1_GCXSK3RGHfI45_KU1wHADp-AjwocFKA1kTsjS-_oAkmfi6Y3SKBUDeJD9DTfpypbUK5uK6TVxKXqWzdCoH-jHOARkDFhH6LrVmT2jHVUVxC6XwkZUeVk1zRPZJ6Eqzosh2LTQ9B6_xT5UmTsRyfr7mPgEx_ObGKHM8m1b3oLiweaYdNAQaP",
      scripts: [
        { text: "Bahan linennya bener-bener adem dan jatuh banget pas dipake jalan, gak bikin gerah sama sekali buat daily hangout!", variationType: "Hook Spill", estimatedSeconds: 4.2, retention: 89 },
        { text: "Coba liat cuttingannya, bikin kaki auto keliatan lebih jenjang dan pinggang lebih slim tanpa sesak.", variationType: "Material Proof", estimatedSeconds: 3.8, retention: 92 },
        { text: "Ini sih celana yang wajib punya buat yang pengen look clean aesthetic tapi tetep super nyaman seharian.", variationType: "Direct CTA", estimatedSeconds: 4.9, retention: 84 },
        { text: "Kalian yang nyari celana kulot yang gak bikin keliatan bantet, nih liat deh cuttingan yang ini bener-bener jenjang banget!", variationType: "Fit Check", estimatedSeconds: 4.1, retention: 94 },
        { text: "TB 160 BB 50 pake size M pas banget di pinggang, karetnya lembut gak nyeplak di perut sama sekali.", variationType: "Size Guide", estimatedSeconds: 3.5, retention: 90 },
      ],
    },
    {
      name: "Celana Cargo Pria",
      gender: "male",
      itemDesc: "Celana Cargo Pria warna charcoal dark gray dengan saku taktikal rapi",
      icon: "shopping_bag",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDf2klf0Xq_bbz-baCYkQQHx7PPRtr5T5BOMCTIyOmE8mK1h7zukTleZdejYQDNqMLxqPmnq9ajqWWX_UIq6qUYS0TmqZMkGvhkD6aTK_Nu0IGk0e2qvuvU2Wrw0u1rMVelQCsq1_Bjptbq97_TVnMKZ7ZtxigAVe-7dB14YdFVXxHYqMMhO-exKioQiX653xGpskuicU2qi_lq2sfkRf9HKlHz-wlGwkkCqNilbiEb",
      imageFit: "https://lh3.googleusercontent.com/aida-public/AB6AXuDf2klf0Xq_bbz-baCYkQQHx7PPRtr5T5BOMCTIyOmE8mK1h7zukTleZdejYQDNqMLxqPmnq9ajqWWX_UIq6qUYS0TmqZMkGvhkD6aTK_Nu0IGk0e2qvuvU2Wrw0u1rMVelQCsq1_Bjptbq97_TVnMKZ7ZtxigAVe-7dB14YdFVXxHYqMMhO-exKioQiX653xGpskuicU2qi_lq2sfkRf9HKlHz-wlGwkkCqNilbiEb",
      imageTexture: "https://lh3.googleusercontent.com/aida-public/AB6AXuC9b2ESD-afd_iJpVF4bOO3BhCqxSJRE9jf0a6F4XOBYm3qBa7VFjz3hZyd7DL-AYS5gty_Mrzq_j4hJ-IzKmdRlUEyGLDkQhZxKjez1Nc-E-Q2elXWeocYc8cg430qsRDoH7AeuAyWU_v_KaVQp6MqwYQlT9g975nvYnhjBPTYrftdvTdIpOdsi1fd7EiXsTPsk2uCzzBuSxA7goedbaCP8djeTBI1h7slW00hzd6D",
      imageAtmosphere: "https://lh3.googleusercontent.com/aida-public/AB6AXuDf2klf0Xq_bbz-baCYkQQHx7PPRtr5T5BOMCTIyOmE8mK1h7zukTleZdejYQDNqMLxqPmnq9ajqWWX_UIq6qUYS0TmqZMkGvhkD6aTK_Nu0IGk0e2qvuvU2Wrw0u1rMVelQCsq1_Bjptbq97_TVnMKZ7ZtxigAVe-7dB14YdFVXxHYqMMhO-exKioQiX653xGpskuicU2qi_lq2sfkRf9HKlHz-wlGwkkCqNilbiEb",
      scripts: [
        { text: "Fittingnya pas banget, baggy tapi tetep clean. Kantongnya fungsional dan bahannya kuat gak gampang robek.", variationType: "Durability Hook", estimatedSeconds: 4.0, retention: 88 },
        { text: "Ini definisi cargo idaman buat lo yang suka outfit street style simpel tapi berkarakter.", variationType: "Lifestyle Vibe", estimatedSeconds: 3.7, retention: 86 },
        { text: "Dipaduin pake sneakers apa aja langsung masuk, auto elevate style harian lo!", variationType: "Styling Tip", estimatedSeconds: 3.2, retention: 91 },
        { text: "Bahan twill tebel premium, kantong dalem bisa muat dompet sama HP tanpa ganjel.", variationType: "Feature Focus", estimatedSeconds: 3.9, retention: 87 },
      ],
    },
    {
      name: "Oversized Shirt Boxy",
      gender: "male",
      itemDesc: "Oversized Shirt Boxy fit warna faded black dengan kerah kokoh",
      icon: "apparel",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCh6qbXcPOsOzZ2sdf_KBOdOFDHMawG5i_z9UbmNpLPKzoALntDpMTfaxPjplaSapQiWRGj_xDlrszmxoibfB_XrvIVQ1-Oi-CtQ1wyXCinY3a017XRXIEB2N81FxgSgKug04v7ByMeReTr9C_hch11r-I4ekz58Y_XSDOrhoMp15d3D_lfDzB4ijmH4CAue5c98wu3-vKDvDZavXrBX1hgHBEre0rPF06jMqgb7mRf",
      imageFit: "https://lh3.googleusercontent.com/aida-public/AB6AXuCh6qbXcPOsOzZ2sdf_KBOdOFDHMawG5i_z9UbmNpLPKzoALntDpMTfaxPjplaSapQiWRGj_xDlrszmxoibfB_XrvIVQ1-Oi-CtQ1wyXCinY3a017XRXIEB2N81FxgSgKug04v7ByMeReTr9C_hch11r-I4ekz58Y_XSDOrhoMp15d3D_lfDzB4ijmH4CAue5c98wu3-vKDvDZavXrBX1hgHBEre0rPF06jMqgb7mRf",
      imageTexture: "https://lh3.googleusercontent.com/aida-public/AB6AXuC9b2ESD-afd_iJpVF4bOO3BhCqxSJRE9jf0a6F4XOBYm3qBa7VFjz3hZyd7DL-AYS5gty_Mrzq_j4hJ-IzKmdRlUEyGLDkQhZxKjez1Nc-E-Q2elXWeocYc8cg430qsRDoH7AeuAyWU_v_KaVQp6MqwYQlT9g975nvYnhjBPTYrftdvTdIpOdsi1fd7EiXsTPsk2uCzzBuSxA7goedbaCP8djeTBI1h7slW00hzd6D",
      imageAtmosphere: "https://lh3.googleusercontent.com/aida-public/AB6AXuCh6qbXcPOsOzZ2sdf_KBOdOFDHMawG5i_z9UbmNpLPKzoALntDpMTfaxPjplaSapQiWRGj_xDlrszmxoibfB_XrvIVQ1-Oi-CtQ1wyXCinY3a017XRXIEB2N81FxgSgKug04v7ByMeReTr9C_hch11r-I4ekz58Y_XSDOrhoMp15d3D_lfDzB4ijmH4CAue5c98wu3-vKDvDZavXrBX1hgHBEre0rPF06jMqgb7mRf",
      scripts: [
        { text: "Kerahnya tegak gak gampang letoy walau dicuci berkali-kali. Bahan 24s-nya tebel tapi breathable parah!", variationType: "Quality Proof", estimatedSeconds: 4.3, retention: 93 },
        { text: "Potongan boxy-nya bikin siluet bahu keliatan lebih tegap, fix upgrade visual lo 100%.", variationType: "Silhouette Check", estimatedSeconds: 3.6, retention: 89 },
        { text: "Gak usah ribet styling, cemplungin celana hitam langsung keliatan keren effortlessly.", variationType: "Effortless Look", estimatedSeconds: 3.4, retention: 85 },
      ],
    },
    {
      name: "Pleated Midi Skirt",
      gender: "female",
      itemDesc: "Pleated Midi Skirt warna dusty rose flowy dengan lipatan plisket rapat rapi",
      icon: "style",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDnIKcVteD-X-cD5w77XuZnBfSRpPQefn5OD7_lQUfgSVIF6dpQz0yMRNeEs5f-xhl1ItgLhzx3aqFsknZyVEFBJ9ObHKlKm8DnAU_EL4d1Vrup7aNu1joEnTcRSy1D3uXqrs8i_ay9th_IcrXyIkGnCl2SukJtoaPgM15S6XKxwEtejjzY2TqE-ypdCBNizkAvtAKJpkc4Z_t_Tg-A3kqshN7pHkCKUk33uVQ41TbG",
      imageFit: "https://lh3.googleusercontent.com/aida-public/AB6AXuDnIKcVteD-X-cD5w77XuZnBfSRpPQefn5OD7_lQUfgSVIF6dpQz0yMRNeEs5f-xhl1ItgLhzx3aqFsknZyVEFBJ9ObHKlKm8DnAU_EL4d1Vrup7aNu1joEnTcRSy1D3uXqrs8i_ay9th_IcrXyIkGnCl2SukJtoaPgM15S6XKxwEtejjzY2TqE-ypdCBNizkAvtAKJpkc4Z_t_Tg-A3kqshN7pHkCKUk33uVQ41TbG",
      imageTexture: "https://lh3.googleusercontent.com/aida-public/AB6AXuC9b2ESD-afd_iJpVF4bOO3BhCqxSJRE9jf0a6F4XOBYm3qBa7VFjz3hZyd7DL-AYS5gty_Mrzq_j4hJ-IzKmdRlUEyGLDkQhZxKjez1Nc-E-Q2elXWeocYc8cg430qsRDoH7AeuAyWU_v_KaVQp6MqwYQlT9g975nvYnhjBPTYrftdvTdIpOdsi1fd7EiXsTPsk2uCzzBuSxA7goedbaCP8djeTBI1h7slW00hzd6D",
      imageAtmosphere: "https://lh3.googleusercontent.com/aida-public/AB6AXuDnIKcVteD-X-cD5w77XuZnBfSRpPQefn5OD7_lQUfgSVIF6dpQz0yMRNeEs5f-xhl1ItgLhzx3aqFsknZyVEFBJ9ObHKlKm8DnAU_EL4d1Vrup7aNu1joEnTcRSy1D3uXqrs8i_ay9th_IcrXyIkGnCl2SukJtoaPgM15S6XKxwEtejjzY2TqE-ypdCBNizkAvtAKJpkc4Z_t_Tg-A3kqshN7pHkCKUk33uVQ41TbG",
      scripts: [
        { text: "Plisketnya rapet dan awet banget, bahannya swing-swing anggun tiap kali kita melangkah.", variationType: "Motion Flow", estimatedSeconds: 3.9, retention: 92 },
        { text: "Warna dusty rose-nya manis elegan, gampang banget di-mix and match sama knitwear atau blazer.", variationType: "Color Palette", estimatedSeconds: 4.2, retention: 88 },
        { text: "Gak nerawang sama sekali dan karet pinggangnya elastis lembut, bebas begah seharian!", variationType: "Comfort Priority", estimatedSeconds: 3.7, retention: 95 },
      ],
    },
  ];

  for (const prod of productsData) {
    const { scripts, ...productFields } = prod;
    let createdProduct = await prisma.product.findFirst({
      where: { name: prod.name },
    });
    if (createdProduct) {
      createdProduct = await prisma.product.update({
        where: { id: createdProduct.id },
        data: productFields,
      });
    } else {
      createdProduct = await prisma.product.create({
        data: productFields,
      });
    }

    for (const script of scripts) {
      const existingScript = await prisma.scriptItem.findFirst({
        where: { productId: createdProduct.id, text: script.text },
      });
      if (!existingScript) {
        await prisma.scriptItem.create({
          data: {
            productId: createdProduct.id,
            ...script,
          },
        });
      }
    }
  }

  // 4. Seed Default Creator User
  console.log("Seeding Default Creator User...");
  const existingCreator = await prisma.appUser.findFirst({
    where: { role: "CREATOR" },
  });
  if (!existingCreator) {
    const crypto = await import("crypto");
    const salt = crypto.randomBytes(16).toString("hex");
    const hash = crypto.createHmac("sha256", salt).update("184004@Najmi").digest("hex");
    await prisma.appUser.create({
      data: {
        email: "najmishfwn@gmail.com",
        password: `${salt}:${hash}`,
        role: "CREATOR",
      },
    });
    console.log("Default Creator (najmishfwn@gmail.com) created.");
  }

  console.log("[OK] Database seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("[ERROR] Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

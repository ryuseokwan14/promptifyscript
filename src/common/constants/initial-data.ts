import { Product, ScriptItem, MasterTemplates } from "@/types";

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "kulot-linen",
    name: "Celana Kulot Linen",
    gender: "female",
    itemDesc: "Celana Kulot Linen warna broken white yang jatuh elegan",
    icon: "checkroom",
    imageFit:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDoMi9wCgPYVxP-06FiQvmR8sVLvOKlbs3zM0WYn3Cum4OdtDCUtBin4Dz9L97YKNiKxC63EsFiISDliuDfCUJtsbyPjvMeHaEk1Yt7BApHR6CPl3unVzxy4fCCLHCJ548jNDZ7sCwDiPHJelHfWaEuYpFZ-TvCUII06InoHUP2TDCa2TxOTNYkeApCWvkZSmnfnhxr9g7FPksPxdBsG6xJUoU7pj2O7VEBuKOfxE-L",
    imageTexture:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC9b2ESD-afd_iJpVF4bOO3BhCqxSJRE9jf0a6F4XOBYm3qBa7VFjz3hZyd7DL-AYS5gty_Mrzq_j4hJ-IzKmdRlUEyGLDkQhZxKjez1Nc-E-Q2elXWeocYc8cg430qsRDoH7AeuAyWU_v_KaVQp6MqwYQlT9g975nvYnhjBPTYrftdvTdIpOdsi1fd7EiXsTPsk2uCzzBuSxA7goedbaCP8djeTBI1h7slW00hzd6D",
    imageAtmosphere:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCdRDtnVd4ZSzDbxb71nF5dz4z6l_cHEKM-hGL5h-F53DoDVpgHCig1_GCXSK3RGHfI45_KU1wHADp-AjwocFKA1kTsjS-_oAkmfi6Y3SKBUDeJD9DTfpypbUK5uK6TVxKXqWzdCoH-jHOARkDFhH6LrVmT2jHVUVxC6XwkZUeVk1zRPZJ6Eqzosh2LTQ9B6_xT5UmTsRyfr7mPgEx_ObGKHM8m1b3oLiweaYdNAQaP",
  },
  {
    id: "cargo-pria",
    name: "Celana Cargo Pria",
    gender: "male",
    itemDesc: "Celana Cargo Pria warna charcoal dark gray dengan saku taktikal rapi",
    icon: "shopping_bag",
    imageFit:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDf2klf0Xq_bbz-baCYkQQHx7PPRtr5T5BOMCTIyOmE8mK1h7zukTleZdejYQDNqMLxqPmnq9ajqWWX_UIq6qUYS0TmqZMkGvhkD6aTK_Nu0IGk0e2qvuvU2Wrw0u1rMVelQCsq1_Bjptbq97_TVnMKZ7ZtxigAVe-7dB14YdFVXxHYqMMhO-exKioQiX653xGpskuicU2qi_lq2sfkRf9HKlHz-wlGwkkCqNilbiEb",
    imageTexture:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC9b2ESD-afd_iJpVF4bOO3BhCqxSJRE9jf0a6F4XOBYm3qBa7VFjz3hZyd7DL-AYS5gty_Mrzq_j4hJ-IzKmdRlUEyGLDkQhZxKjez1Nc-E-Q2elXWeocYc8cg430qsRDoH7AeuAyWU_v_KaVQp6MqwYQlT9g975nvYnhjBPTYrftdvTdIpOdsi1fd7EiXsTPsk2uCzzBuSxA7goedbaCP8djeTBI1h7slW00hzd6D",
    imageAtmosphere:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDf2klf0Xq_bbz-baCYkQQHx7PPRtr5T5BOMCTIyOmE8mK1h7zukTleZdejYQDNqMLxqPmnq9ajqWWX_UIq6qUYS0TmqZMkGvhkD6aTK_Nu0IGk0e2qvuvU2Wrw0u1rMVelQCsq1_Bjptbq97_TVnMKZ7ZtxigAVe-7dB14YdFVXxHYqMMhO-exKioQiX653xGpskuicU2qi_lq2sfkRf9HKlHz-wlGwkkCqNilbiEb",
  },
  {
    id: "oversized-shirt",
    name: "Oversized Shirt Boxy",
    gender: "male",
    itemDesc: "Oversized Shirt Boxy fit warna faded black dengan kerah kokoh",
    icon: "apparel",
    imageFit:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCh6qbXcPOsOzZ2sdf_KBOdOFDHMawG5i_z9UbmNpLPKzoALntDpMTfaxPjplaSapQiWRGj_xDlrszmxoibfB_XrvIVQ1-Oi-CtQ1wyXCinY3a017XRXIEB2N81FxgSgKug04v7ByMeReTr9C_hch11r-I4ekz58Y_XSDOrhoMp15d3D_lfDzB4ijmH4CAue5c98wu3-vKDvDZavXrBX1hgHBEre0rPF06jMqgb7mRf",
    imageTexture:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC9b2ESD-afd_iJpVF4bOO3BhCqxSJRE9jf0a6F4XOBYm3qBa7VFjz3hZyd7DL-AYS5gty_Mrzq_j4hJ-IzKmdRlUEyGLDkQhZxKjez1Nc-E-Q2elXWeocYc8cg430qsRDoH7AeuAyWU_v_KaVQp6MqwYQlT9g975nvYnhjBPTYrftdvTdIpOdsi1fd7EiXsTPsk2uCzzBuSxA7goedbaCP8djeTBI1h7slW00hzd6D",
    imageAtmosphere:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCh6qbXcPOsOzZ2sdf_KBOdOFDHMawG5i_z9UbmNpLPKzoALntDpMTfaxPjplaSapQiWRGj_xDlrszmxoibfB_XrvIVQ1-Oi-CtQ1wyXCinY3a017XRXIEB2N81FxgSgKug04v7ByMeReTr9C_hch11r-I4ekz58Y_XSDOrhoMp15d3D_lfDzB4ijmH4CAue5c98wu3-vKDvDZavXrBX1hgHBEre0rPF06jMqgb7mRf",
  },
  {
    id: "pleated-skirt",
    name: "Pleated Midi Skirt",
    gender: "female",
    itemDesc: "Pleated Midi Skirt warna dusty rose flowy dengan lipatan plisket rapat rapi",
    icon: "style",
    imageFit:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDnIKcVteD-X-cD5w77XuZnBfSRpPQefn5OD7_lQUfgSVIF6dpQz0yMRNeEs5f-xhl1ItgLhzx3aqFsknZyVEFBJ9ObHKlKm8DnAU_EL4d1Vrup7aNu1joEnTcRSy1D3uXqrs8i_ay9th_IcrXyIkGnCl2SukJtoaPgM15S6XKxwEtejjzY2TqE-ypdCBNizkAvtAKJpkc4Z_t_Tg-A3kqshN7pHkCKUk33uVQ41TbG",
    imageTexture:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC9b2ESD-afd_iJpVF4bOO3BhCqxSJRE9jf0a6F4XOBYm3qBa7VFjz3hZyd7DL-AYS5gty_Mrzq_j4hJ-IzKmdRlUEyGLDkQhZxKjez1Nc-E-Q2elXWeocYc8cg430qsRDoH7AeuAyWU_v_KaVQp6MqwYQlT9g975nvYnhjBPTYrftdvTdIpOdsi1fd7EiXsTPsk2uCzzBuSxA7goedbaCP8djeTBI1h7slW00hzd6D",
    imageAtmosphere:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDnIKcVteD-X-cD5w77XuZnBfSRpPQefn5OD7_lQUfgSVIF6dpQz0yMRNeEs5f-xhl1ItgLhzx3aqFsknZyVEFBJ9ObHKlKm8DnAU_EL4d1Vrup7aNu1joEnTcRSy1D3uXqrs8i_ay9th_IcrXyIkGnCl2SukJtoaPgM15S6XKxwEtejjzY2TqE-ypdCBNizkAvtAKJpkc4Z_t_Tg-A3kqshN7pHkCKUk33uVQ41TbG",
  },
];

export const INITIAL_SCRIPTS: ScriptItem[] = [
  {
    id: "scr-1",
    productId: "kulot-linen",
    text: "Bahan linennya bener-bener adem dan jatuh banget pas dipake jalan, gak bikin gerah sama sekali buat daily hangout!",
    variationType: "Hook Spill",
    estimatedSeconds: 4.2,
    retention: 89,
    usedCount: 42,
  },
  {
    id: "scr-2",
    productId: "kulot-linen",
    text: "Coba liat cuttingannya, bikin kaki auto keliatan lebih jenjang dan pinggang lebih slim tanpa sesak.",
    variationType: "Material Proof",
    estimatedSeconds: 3.8,
    retention: 92,
    usedCount: 28,
  },
  {
    id: "scr-3",
    productId: "kulot-linen",
    text: "Ini sih celana yang wajib punya buat yang pengen look clean aesthetic tapi tetep super nyaman seharian.",
    variationType: "Direct CTA",
    estimatedSeconds: 4.9,
    retention: 84,
    usedCount: 35,
  },
  {
    id: "scr-4",
    productId: "kulot-linen",
    text: "Kalian yang nyari celana kulot yang gak bikin keliatan bantet, nih liat deh cuttingan yang ini bener-bener jenjang banget!",
    variationType: "Fit Check",
    estimatedSeconds: 4.1,
    retention: 94,
    usedCount: 51,
  },
  {
    id: "scr-5",
    productId: "kulot-linen",
    text: "TB 160 BB 50 pake size M pas banget di pinggang, karetnya lembut gak nyeplak di perut sama sekali.",
    variationType: "Size Guide",
    estimatedSeconds: 3.5,
    retention: 90,
    usedCount: 19,
  },
  {
    id: "scr-6",
    productId: "cargo-pria",
    text: "Fittingnya pas banget, baggy tapi tetep clean. Kantongnya fungsional dan bahannya kuat gak gampang robek.",
    variationType: "Durability Hook",
    estimatedSeconds: 4.0,
    retention: 88,
    usedCount: 33,
  },
  {
    id: "scr-7",
    productId: "cargo-pria",
    text: "Ini definisi cargo idaman buat lo yang suka outfit street style simpel tapi berkarakter.",
    variationType: "Lifestyle Vibe",
    estimatedSeconds: 3.7,
    retention: 86,
    usedCount: 24,
  },
  {
    id: "scr-8",
    productId: "cargo-pria",
    text: "Dipaduin pake sneakers apa aja langsung masuk, auto elevate style harian lo!",
    variationType: "Styling Tip",
    estimatedSeconds: 3.2,
    retention: 91,
    usedCount: 40,
  },
  {
    id: "scr-9",
    productId: "cargo-pria",
    text: "Bahan twill tebel premium, kantong dalem bisa muat dompet sama HP tanpa ganjel.",
    variationType: "Feature Focus",
    estimatedSeconds: 3.9,
    retention: 87,
    usedCount: 18,
  },
  {
    id: "scr-10",
    productId: "oversized-shirt",
    text: "Kerahnya tegak gak gampang letoy walau dicuci berkali-kali. Bahan 24s-nya tebel tapi breathable parah!",
    variationType: "Quality Proof",
    estimatedSeconds: 4.3,
    retention: 93,
    usedCount: 45,
  },
  {
    id: "scr-11",
    productId: "oversized-shirt",
    text: "Potongan boxy-nya bikin siluet bahu keliatan lebih tegap, fix upgrade visual lo 100%.",
    variationType: "Silhouette Check",
    estimatedSeconds: 3.6,
    retention: 89,
    usedCount: 37,
  },
  {
    id: "scr-12",
    productId: "oversized-shirt",
    text: "Gak usah ribet styling, cemplungin celana hitam langsung keliatan keren effortlessly.",
    variationType: "Effortless Look",
    estimatedSeconds: 3.4,
    retention: 85,
    usedCount: 29,
  },
  {
    id: "scr-13",
    productId: "pleated-skirt",
    text: "Plisketnya rapet dan awet banget, bahannya swing-swing anggun tiap kali kita melangkah.",
    variationType: "Motion Flow",
    estimatedSeconds: 3.9,
    retention: 92,
    usedCount: 38,
  },
  {
    id: "scr-14",
    productId: "pleated-skirt",
    text: "Warna dusty rose-nya manis elegan, gampang banget di-mix and match sama knitwear atau blazer.",
    variationType: "Color Palette",
    estimatedSeconds: 4.2,
    retention: 88,
    usedCount: 27,
  },
  {
    id: "scr-15",
    productId: "pleated-skirt",
    text: "Gak nerawang sama sekali dan karet pinggangnya elastis lembut, bebas begah seharian!",
    variationType: "Comfort Priority",
    estimatedSeconds: 3.7,
    retention: 95,
    usedCount: 44,
  },
];

export const INITIAL_LOCATIONS: string[] = [
  "coffee shop outdoor bernuansa kayu minimalis",
  "pedestrian walk trotoar Sudirman sore hari",
  "art gallery modern berdinding monokrom",
  "rooftop lounge dengan view gedung kota Jakarta",
  "underground subway tunnel bergaya urban brutalist",
  "skatepark modern dengan grafiti minimalis",
  "rooftop parkir gedung beton berbayang dramatis",
  "studio vinyl records dengan pencahayaan neon temaram",
  "industrial open space cafe bergaya Tokyo style",
  "jembatan penyeberangan modern berarsitektur sleek",
  "taman botani asri dengan pancaran sinar matahari lembut",
  "teras cafe bergaya Parisienne di kawasan Senopati",
];

export const INITIAL_TEMPLATES: MasterTemplates = {
  female: `Video vertikal 9:16 sinematik TikTok / Reels. Seorang model wanita Indonesia muda usia 22 tahun, berparas cantik natural, senyum ramah dan ekspresif.
Ia sedang berada di {tempat}, pencahayaan alami terang bernuansa clean warm aesthetic.
Model mengenakan {produk} yang tampak sangat pas, rapi, dan jatuh kainnya terlihat sangat berkualitas tinggi.
Model menatap langsung ke kamera smartphone dan berbicara aktif (lip-sync realistis) dengan intonasi natural:
"{Script gerak bibir}"
Kamera bergerak smooth handheld tracking shot, 4k ultra realistic, high-fidelity fabric details, depth of field blur lembut di latar belakang.`,

  male: `Video vertikal 9:16 sinematik modern casual TikTok / Reels. Seorang pria Indonesia muda usia 24 tahun, berpenampilan rapi maskulin dan percaya diri.
Ia sedang berada di {tempat}, dengan ambient lighting estetik dan modern city contrast.
Model memakai {produk} dengan fitting pas di badan, menunjukkan kenyamanan dan fleksibilitas bahan pakaian.
Model berbicara santai dan percaya diri langsung ke arah lensa kamera (gerakan bibir natural sinkron):
"{Script gerak bibir}"
Gaya kamera low-angle subtle tilt, warna tajam kontras netral, 4k 60fps cinematic look, shallow depth of field.`,
};

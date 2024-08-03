import { Roboto, Noto_Kufi_Arabic } from "next/font/google";

export const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const NotoKufiArabic = Noto_Kufi_Arabic({
  subsets: ["arabic"],
  weight: ["400", "700"],
  display: "swap",
});

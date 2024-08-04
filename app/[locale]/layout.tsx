import { ThemeProvider } from "@/app/_components/theme-provider";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";

import {
  getMessages,
  getTranslations,
  unstable_setRequestLocale,
} from "next-intl/server";
import { NotoKufiArabic, roboto } from "../fonts";
import "./globals.css";
import ToasterProvider from "../_components/Toaster";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "../api/uploadthing/core";

const locales = ["en", "ar"];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    metadataBase: new URL("https://market-king-ecommerce.vercel.app"),

    title: {
      template: `%s | ${t("title")}`,
      default: `${t("homeTitle")} | ${t("title")}`,
    },
    description:
      "MarketKing: Secure e-commerce platform featuring user authentication, Stripe payments, and an admin dashboard",
    openGraph: {
      title: "MarketKing",
      description:
        "Online marketplace solution 'MarketKing' with user login, Stripe integration, and management interface",
      images: ["/project-preview.png"],
      url: "https://market-king-ecommerce.vercel.app/",
      type: "website",
    },
  };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  const messages = await getMessages();

  const rtlLanguages = ["ar"];
  const dir = rtlLanguages.includes(locale) ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir}>
      <body
        className={` ${
          dir === "rtl" ? NotoKufiArabic.className : roboto.className
        } overflow-x-hidden relative`}
      >
        <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />

        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <ToasterProvider />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

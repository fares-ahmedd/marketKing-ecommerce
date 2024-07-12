import { ThemeProvider } from "@/app/components/theme-provider";
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
import ToasterProvider from "../components/Toaster";
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
    title: {
      template: `%s | ${t("title")}`,
      default: `${t("homeTitle")} | ${t("title")}`,
    },
    // description: t('description'),
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
        className={dir === "rtl" ? NotoKufiArabic.className : roboto.className}
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

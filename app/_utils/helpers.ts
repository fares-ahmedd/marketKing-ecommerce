import { getLocale, getTranslations } from "next-intl/server";

export const ADMIN_EMAIL = "faresahmed00001111@gmail.com";

export async function getTranslate() {
  const t = await getTranslations("Index");
  const locale = await getLocale();
  const isArabic = locale === "ar";

  return { t, isArabic };
}

export async function formatDate(date: Date) {
  const { isArabic } = await getTranslate();
  return new Intl.DateTimeFormat(isArabic ? "ar-EG" : "en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(date);
}

export function newPrice(price: number, discount: number) {
  return discount ? price - discount : price;
}

export function oldPrice(price: number, discount: number) {
  return discount ? price : null;
}

export const homeNavLinks = [
  { label: "Home", href: "/" },
  { label: "All Products", href: "/all-products" },
  { label: "Phones", href: "/phones" },
  { label: "Laptops", href: "/laptops" },
  { label: "Watches", href: "/watches" },
];
export const dashboardNavLinks = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Orders", href: "/dashboard/orders" },
  { label: "Products", href: "/dashboard/products" },
  { label: "Banner Picture", href: "/dashboard/banner" },
];

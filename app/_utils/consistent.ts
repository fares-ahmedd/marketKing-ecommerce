import laptopsPreview from "@/public/laptops-preview.jpg";
import phonesPreview from "@/public/phones-preview.jpg";
import watchesPreview from "@/public/watches-prview.webp";

export const ADMIN_EMAIL = "faresahmed00001111@gmail.com";
export const LOCALES = ["en", "ar"];

export const CATEGORIES = [
  {
    href: "/products/phones",
    src: phonesPreview,
    alt: "Phones Products",
    title: "Phones",
    span: "row-span-full",
  },
  {
    href: "/products/watches",
    src: watchesPreview,
    alt: "watches Products",
    title: "Watches",
    span: null,
  },
  {
    href: "/products/laptops",
    src: laptopsPreview,
    alt: "laptops Products",
    title: "Laptops",
    span: null,
  },
];

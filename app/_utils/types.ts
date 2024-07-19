import { Category, ProductStatus } from "@prisma/client";

export interface ProductType {
  name: string;
  description: string;
  price: number;
  images: string[];
  status: ProductStatus;
  category: Category;
  isFeatured: boolean;
  id: string;
}

export interface ProductErrors {
  product?: string;
  description?: string;
  price?: string;
  featured?: boolean;
  status?: string;
  image?: string;
  category?: string;
  success?: boolean;
}

export interface BannerErrors {
  banner?: string;
  image?: string;
  success?: boolean;
}

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
  discount: number;
}

export interface ProductErrors {
  product?: string;
  description?: string;
  price?: string;
  featured?: boolean;
  status?: string;
  discount?: string;
  image?: string;
  category?: string;
  success?: boolean;
}

export interface BannerErrors {
  banner?: string;
  image?: string;
  success?: boolean;
}

export interface SignUpErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  success?: string;
}

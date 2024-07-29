import { Category, ProductStatus, User } from "@prisma/client";

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
  success?: boolean;

  storeEmail?: string;
  storePassword?: string;
  storeUserId?: string;
}

export interface EditProfileErrors {
  firstName?: string;
  lastName?: string;
  image?: string;
  success?: boolean;
}
export interface LoginErrors {
  email?: string;
  password?: string;
  success?: boolean;

  storeEmail?: string;
  storePassword?: string;
  storeUserId?: string;
}

export type IUserIncludeFavorites = {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  profileImage: string;
  createAt: Date;
  favoriteProducts: {
    product: {
      id: string;
      name: string;
      description: string;
      status: ProductStatus;
      price: number;
      discount: number;
      images: string[];
      category: Category;
      isFeatured: boolean;
      createdAt: Date;
    };
  }[];
} | null;

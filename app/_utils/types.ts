export enum ProductStatus {
  DRAFT = "draft",
  PUBLISHED = "published",
  ARCHIVED = "archived",
}

enum Category {
  LAPTOPS = "laptops",
  PHONES = "phones",
  WATCHES = "watches",
}

export interface ProductType {
  name: string;
  description: string;
  price: number;
  images: string[];
  status: ProductStatus;
  category: Category;
}

export interface ProductErrors {
  product?: string;
  description?: string;
  price?: string;
  featured?: boolean;
  status?: string;
  image?: string;
  category?: string;
}

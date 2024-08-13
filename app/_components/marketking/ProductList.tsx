"use client";
import { toggleFavProduct } from "@/app/_actions/toggleFavProduct";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import FavButton from "./FavButton";
import { newPrice, oldPrice } from "@/app/_utils/helpers";
import Button from "../ui/Button";
import MyLink from "../ui/MyLink";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useTranslate } from "@/app/_hooks/useTranslate";
import Image from "next/image";
import { IUserIncludeFavorites } from "@/app/_utils/types";
import {
  fetchMoreLaptops,
  fetchMorePhones,
  fetchMoreProducts,
  fetchMoreWatches,
} from "@/app/_actions/fetchMoreProducts";
import { useSearchParams } from "next/navigation";
function ProductList({
  productArr,
  user,
  sortPrice,
  filterPrice,
  category = "all",
  totalProducts = 0,
}: {
  productArr: any;
  totalProducts?: number;
  sortPrice?: string;
  filterPrice?: string;
  category?: string;
  user: IUserIncludeFavorites;
}) {
  const [isFilter, setIsFilter] = useState(false);
  const { t } = useTranslate();
  const [products, setProducts] = useState(productArr.slice(0, 8));
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();

  async function favProduct({
    user,
    productId,
  }: {
    user: any;
    productId: string;
  }) {
    const res = await toggleFavProduct({ user, productId });

    if (res?.success && res?.favProduct) {
      toast.success(t("add fav success", { favProduct: res.favProduct }));
    }
    if (res?.success === false && res?.favProduct) {
      toast.success(t("remove fav success", { favProduct: res.favProduct }));
    }
  }

  const loadMoreProducts = async () => {
    setLoading(true);
    try {
      let newProducts;

      switch (category) {
        case "phones":
          newProducts = await fetchMorePhones(products.length);
          break;
        case "watches":
          newProducts = await fetchMoreWatches(products.length);
          break;
        case "laptops":
          newProducts = await fetchMoreLaptops(products.length);
          break;

        default:
          newProducts = await fetchMoreProducts(products.length);
      }
      setProducts([...products, ...newProducts]);
    } catch (error) {
      console.error("Failed to load more products", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const sp = searchParams.get("sort-price") || sortPrice;

    let sortedProducts = [...products];

    if (sp === "lowest") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sp === "highest") {
      sortedProducts.sort((a, b) => b.price - a.price);
    } else {
      sortedProducts.sort((a, b) => a.createdAt - b.createdAt);
    }

    setProducts(sortedProducts);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortPrice]);

  useEffect(() => {
    const fp = searchParams.get("filter-price") || filterPrice;

    let filteredPrice = [...products];

    if (fp === "all") {
      filteredPrice = productArr.slice(0, 8);
      setIsFilter(false);
    }
    if (fp === "less-then-200") {
      filteredPrice = productArr.filter((p: any) => p.price < 200);
      setIsFilter(true);
    }

    if (fp === "more-then-5000") {
      filteredPrice = productArr.filter((p: any) => p.price > 5000);
      setIsFilter(true);
    }

    if (fp === "between-200-500") {
      filteredPrice = productArr.filter(
        (p: any) => p.price >= 200 && p.price <= 500
      );
      setIsFilter(true);
    }

    if (fp === "between-1000-5000") {
      filteredPrice = productArr.filter(
        (p: any) => p.price >= 1000 && p.price <= 5000
      );
      setIsFilter(true);
    }
    setProducts(filteredPrice);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterPrice]);

  return (
    <>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 flex-wrap mt-6">
        {products.length > 0 ? (
          products.map((product: any) => (
            <li key={product.id}>
              <div className="card  relative  w-full h-full flex flex-col justify-between ">
                <Carousel dir="ltr">
                  <CarouselContent>
                    {product?.images?.map((image: any) => (
                      <CarouselItem key={image}>
                        <div className="relative   w-full h-[300px]   ">
                          <Image
                            src={image}
                            fill
                            alt="Product preview"
                            sizes="(max-width: 640px) 100vw, 50vw"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="ms-16" />
                  <CarouselNext className="me-16" />
                </Carousel>
                <form
                  className="absolute top-3 right-3"
                  action={favProduct.bind(null, {
                    user: user,
                    productId: product.id,
                  })}
                >
                  <FavButton
                    isFav={user?.favoriteProducts.some(
                      (fav: any) => fav.productId === product.id
                    )}
                  />
                </form>
                <h5
                  className="text-lg line-clamp-1 my-2  text-ltr text-center"
                  title={product.name}
                >
                  {product.name}
                </h5>

                <p
                  className="text-start text-ltr text-second-text line-clamp-2"
                  title={product.description}
                >
                  {product.description}
                </p>

                <div className="flex-between text-ltr my-2 border-b pb-3 flex-wrap">
                  <div className="flex-items-center  gap-1 text-primary-color font-bold">
                    ${newPrice(product.price, product.discount)}
                    {oldPrice(product.price, product.discount) && (
                      <del className="text-error text-xs">
                        (${oldPrice(product.price, product.discount)})
                      </del>
                    )}
                  </div>

                  <div className="flex-items-center  gap-2">
                    {product.isFeatured && (
                      <strong className="text-indigo-50 bg-indigo-700 px-2 py-1 rounded-full text-xs font-medium">
                        {t("Featured")}
                      </strong>
                    )}
                    {product.discount > 0 && (
                      <strong className="text-red-50 bg-red-600 px-2 py-1 rounded-full text-xs font-semibold">
                        {t("discount label")}
                      </strong>
                    )}
                  </div>
                </div>

                <Button size="md" className="w-full" asChild>
                  <MyLink href={`/product/${product.id}`}>
                    {t("Details")}
                  </MyLink>
                </Button>
              </div>
            </li>
          ))
        ) : (
          <h2 className="tracking-wider"> {t("not found product")}</h2>
        )}
      </ul>
      {products.length < totalProducts && !isFilter && (
        <Button
          onClick={loadMoreProducts}
          color="info"
          size="md"
          className={`my-3 mx-auto`}
          disabled={loading}
        >
          {loading ? (
            <span className="inline-block w-6 h-6 border-4 border-dotted border-stone-500 rounded-full animate-rotation"></span>
          ) : (
            t("Show More")
          )}{" "}
        </Button>
      )}
    </>
  );
}

export default ProductList;

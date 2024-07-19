import prisma from "@/app/_lib/db";
import { formatDate, getTranslate } from "@/app/_utils/helpers";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { BsThreeDotsVertical } from "react-icons/bs";
import IconButton from "../ui/IconButton";
import ModalImage from "../ui/ModalImage";
import MyLink from "../ui/MyLink";

async function getProducts() {
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return products;
}
async function OrderTable() {
  const products = await getProducts();

  const { t, isArabic } = await getTranslate();

  return (
    <>
      <table className="border border-main-text rounded-lg  w-full  max-w-[1080px] mx-auto max-sm:w-[500px] overflow-x-auto">
        <thead className=" border-b border-second-text bg-third-background rounded-lg">
          <tr className="grid grid-cols-6 p-2  overflow-hidden">
            <th>{t("Image")}</th>
            <th className="border-custom-x">{t("Name")}</th>
            <th>{t("Status")}</th>
            <th className="border-custom-x">{t("Price")}</th>
            <th className="border-custom-s">{t("Date")}</th>
            <th className={!isArabic ? "border-custom-s" : ""}>
              {t("Actions")}
            </th>
          </tr>
        </thead>
        <tbody className=" border-b border-second-text text-second-text rounded-lg ">
          {products.map((product) => (
            <tr
              key={product.id}
              className="border-b grid grid-cols-6 p-2  overflow-hidden hover:bg-main-background items-center"
            >
              <ModalImage
                image={
                  <Image src={product.images[0]} alt={product.name} fill />
                }
                className="w-[95%] h-[100px]  relative"
                isInTable={true}
                modalId={product.id}
              />

              <th className="border-custom-x px-2">{product.name}</th>
              <th>{t(product.status)}</th>
              <th className="border-custom-x">${product.price}</th>
              <th className="border-custom-s px-2">
                {formatDate(product.createdAt)}
              </th>
              <th className={`text-center ${!isArabic && "border-custom-s"}`}>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <IconButton>
                      <BsThreeDotsVertical className=" text-2xl block cursor-pointer text-main-text  m-auto " />
                    </IconButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="center">
                    <DropdownMenuLabel className={`${isArabic && "text-rtl"}`}>
                      {t("Actions")}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className={`${
                        isArabic && "text-rtl"
                      } cursor-pointer hover:bg-sec-background`}
                      asChild
                    >
                      <MyLink href={`/dashboard/products/${product.id}`}>
                        {t("Edit")}
                      </MyLink>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className={`${
                        isArabic && "text-rtl"
                      } cursor-pointer hover:bg-sec-background`}
                      asChild
                    >
                      <MyLink href={`/dashboard/products/${product.id}/delete`}>
                        {t("Delete")}
                      </MyLink>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default OrderTable;

import prisma from "@/app/_lib/db";
import {
  formatDate,
  getTranslate,
  newPrice,
  oldPrice,
} from "@/app/_utils/helpers";
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
import OrderTablePagination from "./PaginationOrderTable";

async function OrderTable({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const PAGE = Number(searchParams.page) || 1;
  const PAGE_SIZE = 7;
  const SKIP = (PAGE - 1) * PAGE_SIZE;

  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: PAGE_SIZE,
    skip: SKIP,
  });

  const totalProducts = await prisma.product.count();
  const totalPages = Math.ceil(totalProducts / PAGE_SIZE);

  const { t, isArabic } = await getTranslate();

  return (
    <>
      {products.length < 1 ? (
        <p className="text-center my-4">{t("No Products")}</p>
      ) : (
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
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    }
                    className="w-[95%] h-[100px]  relative"
                    isInTable={true}
                    modalId={product.id}
                  />

                  <th className="border-custom-x px-2">{product.name}</th>
                  <th>{t(product.status)}</th>
                  <th className="border-custom-x flex-center gap-1 text-ltr flex-wrap p-1">
                    ${newPrice(product.price, product.discount)}
                    {oldPrice(product.price, product.discount) && (
                      <del className="text-error">
                        (${oldPrice(product.price, product.discount)})
                      </del>
                    )}
                  </th>
                  <th className="border-custom-s px-2">
                    {formatDate(product.createdAt)}
                  </th>
                  <th
                    className={`text-center ${!isArabic && "border-custom-s"}`}
                  >
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <IconButton className="w-fit mx-auto">
                          <BsThreeDotsVertical className=" text-2xl block cursor-pointer text-main-text  m-auto " />
                        </IconButton>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="center">
                        <DropdownMenuLabel
                          className={`${isArabic && "text-rtl"}`}
                        >
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
                          <MyLink
                            href={`/dashboard/products/${product.id}/delete`}
                          >
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
          <OrderTablePagination currentPage={PAGE} totalPages={totalPages} />
        </>
      )}
    </>
  );
}

export default OrderTable;

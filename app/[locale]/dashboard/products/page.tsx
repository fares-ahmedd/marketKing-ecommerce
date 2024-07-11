import Button from "@/app/components/ui/Button";
import { useTranslate } from "@/app/hooks/useTranslate";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { IoMdAddCircleOutline } from "react-icons/io";
import placeholderImage from "@/public/temp.webp";
import MyLink from "@/app/components/ui/MyLink";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import IconButton from "@/app/components/ui/IconButton";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: `${t("Products")}`,
  };
}

function ProductsPage() {
  const { t, isArabic } = useTranslate();
  return (
    <main className="container-layout my-3">
      <MyLink href="/dashboard/products/create">
        <Button className="flex-items-center gap-2 ms-auto mt-3" size="md">
          <span>{t("Add Products")}</span> <IoMdAddCircleOutline />{" "}
        </Button>
      </MyLink>
      <section className="mt-3 card overflow-auto max-sm:text-sm">
        <h3 className="title mb-2">{t("Products")}</h3>
        <p className="text-sm text-second-text mb-4">{t("Products title")}</p>
        <table className="border border-main-text rounded-lg  w-full  max-w-[1080px] mx-auto max-sm:w-[500px] overflow-x-auto">
          <thead className=" border-b border-second-text bg-third-background rounded-lg">
            <tr className="grid grid-cols-6 p-2  overflow-hidden">
              <th>{t("Image")}</th>
              <th className="border-custom-x">{t("Name")}</th>
              <th>{t("Status")}</th>
              <th className="border-custom-x">{t("Price")}</th>
              <th className="border-custom-s">{t("Date")}</th>
              <th>{t("Actions")}</th>
            </tr>
          </thead>
          <tbody className=" border-b border-second-text text-second-text rounded-lg ">
            <tr className="grid grid-cols-6 p-2  overflow-hidden hover:bg-main-background items-center">
              <th className="w-[95%] h-[100px] relative">
                <Image src={placeholderImage} alt="Product" fill />
              </th>
              <th className="border-custom-x">Product Name</th>
              <th>{t("Success")}</th>
              <th className="border-custom-x">$2.65</th>
              <th className="border-custom-s">2024/7/30</th>
              <th className="text-center">
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
                      className={`${isArabic && "text-rtl"} cursor-pointer`}
                    >
                      {t("Edit")}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className={`${isArabic && "text-rtl"} cursor-pointer`}
                    >
                      {t("Delete")}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </th>
            </tr>
          </tbody>
        </table>
      </section>
    </main>
  );
}

export default ProductsPage;

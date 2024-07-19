import prisma from "@/app/_lib/db";
import { getTranslate } from "@/app/_utils/helpers";
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

async function BannerTable() {
  const banners = await prisma.banner.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const { t, isArabic } = await getTranslate();
  return (
    <section className="card overflow-auto">
      <h3 className="title mb-3">{t("Banners")}</h3>
      <p className="text-sm text-second-text mb-5">{t("Manage Banners")}</p>
      <table className="border border-main-text rounded-lg  w-full  max-w-[1080px] mx-auto max-sm:w-[500px] overflow-x-auto">
        <thead className=" border-b border-second-text bg-third-background rounded-lg">
          <tr className="grid grid-cols-3 p-2  overflow-hidden">
            <th>{t("Image")}</th>
            <th className="border-custom-x">{t("title")}</th>
            <th>{t("Actions")}</th>
          </tr>
        </thead>
        <tbody className=" border-b border-second-text text-second-text rounded-lg ">
          {banners.map((banner) => (
            <tr
              key={banner.id}
              className="border-b grid grid-cols-3 p-2  overflow-hidden hover:bg-main-background items-center"
            >
              <ModalImage
                image={
                  <Image src={banner.imageString} alt={banner.title} fill />
                }
                className="w-[95%] h-[100px]  relative"
                isInTable={true}
                modalId={banner.id}
              />
              <th className="border-custom-x">{banner.title}</th>
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
                      <MyLink href={`/dashboard/products`}>{t("Edit")}</MyLink>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className={`${
                        isArabic && "text-rtl"
                      } cursor-pointer hover:bg-sec-background`}
                      asChild
                    >
                      <MyLink href={`/dashboard/products/`}>
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
    </section>
  );
}

export default BannerTable;

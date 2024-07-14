import { useTranslate } from "@/app/_hooks/useTranslate";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import placeholderImage from "@/public/temp.webp";
import Image from "next/image";
import { BsThreeDotsVertical } from "react-icons/bs";
import IconButton from "../ui/IconButton";
import ModalImage from "../ui/ModalImage";

function OrderTable() {
  const { t, isArabic } = useTranslate();

  return (
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
          <ModalImage
            image={<Image src={placeholderImage} alt="Product" fill />}
            className="w-[95%] h-[100px]  relative"
            isInTable={true}
            modalId={"test"}
          />

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
  );
}

export default OrderTable;

"use client";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import Modal from "../ui/Modal";
import { useTranslate } from "@/app/_hooks/useTranslate";

function DeleteProduct() {
  const { t, isArabic } = useTranslate();
  return (
    <Modal>
      <Modal.OpenModal id="test" isFull={true}>
        <div
          className={`${
            isArabic && "text-rtl"
          } cursor-pointer py-[6px] px-[8px] text-start`}
        >
          {t("Delete")}
        </div>
      </Modal.OpenModal>
      <Modal.Content id="test">
        {({ close }) => (
          <div className="bg-sec-background text-main-text py-6 px-2 w-full h-full rounded-md">
            <h3 className="title mb-2">{t("delete title")}</h3>
            <p className="text-sm text-second-text mb-6">
              {t("delete title desc")}
            </p>
          </div>
        )}
      </Modal.Content>
    </Modal>
  );
}

export default DeleteProduct;

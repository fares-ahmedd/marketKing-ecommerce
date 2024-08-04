"use client";

import { useTranslate } from "@/app/_hooks/useTranslate";
import { useRouter, usePathname } from "next/navigation";

function OrderTablePagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { t } = useTranslate();
  const handlePageChange = (newPage: number) => {
    router.push(`${pathname}?page=${newPage}`);
  };

  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={() =>
          handlePageChange(currentPage === 1 ? currentPage : currentPage - 1)
        }
        disabled={currentPage === 1}
        className="px-4 py-2 mr-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
      >
        {t("Previous")}
      </button>
      <span className="px-4 py-2">
        {t("Page")} {currentPage} {t("of")} {totalPages}
      </span>
      <button
        onClick={() =>
          handlePageChange(
            currentPage === totalPages ? currentPage : currentPage + 1
          )
        }
        disabled={currentPage === totalPages}
        className="px-4 py-2 ml-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
      >
        {t("Next")}
      </button>
    </div>
  );
}

export default OrderTablePagination;

"use client";
import { useTranslate } from "@/app/_hooks/useTranslate";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const sortArr = [
  { label: "All", name: "all" },
  { label: "Lowest", name: "lowest" },
  { label: "Highest", name: "highest" },
];

const filterArr = [
  { label: "All", name: "all" },
  { label: "less-then-200", name: "less-then-200" },
  { label: "between-200-500", name: "between-200-500" },
  { label: "between-1000-5000", name: "between-1000-5000" },
  { label: "more-then-5000", name: "more-then-5000" },
];

function Filter({ isMedium = false }: { isMedium?: boolean }) {
  const { t } = useTranslate();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const activeSort = searchParams.get("sort-price") || "all";
  const activeFilterPrice = searchParams.get("filter-price") || "all";

  const handleSort = (filter: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("sort-price", filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleFilterPrice = (filter: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("filter-price", filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <aside
      className={`min-w-[300px]  p-4 h-[calc(100vh-122px)]  overflow-y-auto ${
        isMedium ? "block" : "max-md:hidden"
      }`}
    >
      <form>
        <h3 className="title mb-2 text-second-text"> {t("Sorting")}</h3>
        <div className="space-y-2 w-full card p-3">
          {sortArr.map((item) => (
            <div
              className="flex gap-2  w-full py-2 duration-200  px-2 rounded-lg"
              key={item.name}
            >
              <input
                type="radio"
                id={item.name}
                className="cursor-pointer"
                checked={activeSort === item.name}
                onClick={() => handleSort(item.name)}
              />
              <label
                htmlFor={item.name}
                className="cursor-pointer block w-full"
                onClick={() => handleSort(item.name)}
              >
                {t(item.label)}
              </label>
            </div>
          ))}
        </div>
      </form>

      <form className="my-2">
        <h3 className="title mb-2 text-second-text"> {t("Price")}</h3>
        <div className="space-y-2 w-full card p-3">
          {filterArr.map((item) => (
            <div
              className="flex gap-2  w-full py-2 duration-200  px-2 rounded-lg"
              key={item.name}
            >
              <input
                type="radio"
                id={item.name}
                className="cursor-pointer"
                onClick={() => handleFilterPrice(item.name)}
                checked={activeFilterPrice === item.name}
              />
              <label
                htmlFor={item.name}
                className="cursor-pointer block w-full"
                onClick={() => handleFilterPrice(item.name)}
              >
                {t(item.label)}
              </label>
            </div>
          ))}
        </div>
      </form>
    </aside>
  );
}

export default Filter;

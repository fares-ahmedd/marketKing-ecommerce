import { useTranslate } from "@/app/_hooks/useTranslate";

function Filter() {
  const { t } = useTranslate();
  return (
    <aside className="min-w-[300px] max-md:hidden p-4 h-[calc(100vh-122px)]  overflow-y-auto">
      <form>
        <h3 className="title mb-2 text-second-text"> {t("Sorting")}</h3>
        <div className="space-y-2 w-full card p-3">
          <div className="flex gap-2 cursor-pointer w-full py-2 duration-200 hover:bg-third-background px-2 rounded-lg">
            <input
              type="radio"
              id="all"
              name="sort"
              className="cursor-pointer"
              defaultChecked
            />
            <label htmlFor="all" className="cursor-pointer">
              {t("All")}
            </label>
          </div>
          <div className="flex gap-2 cursor-pointer w-full py-2 duration-200 hover:bg-third-background px-2 rounded-lg">
            <input
              type="radio"
              id="lowest"
              name="sort"
              className="cursor-pointer"
            />
            <label htmlFor="lowest" className="cursor-pointer">
              {t("Lowest")}
            </label>
          </div>
          <div className="flex gap-2 cursor-pointer w-full py-2 duration-200 hover:bg-third-background px-2 rounded-lg">
            <input
              type="radio"
              id="highest"
              name="sort"
              className="cursor-pointer"
            />
            <label htmlFor="highest" className="cursor-pointer">
              {t("Highest")}
            </label>
          </div>
        </div>
      </form>

      <form className="my-2">
        <h3 className="title mb-2 text-second-text"> {t("Price")}</h3>
        <div className="space-y-2 w-full card p-3">
          <div className="flex gap-2 cursor-pointer w-full py-2 duration-200 hover:bg-third-background px-2 rounded-lg">
            <input
              type="radio"
              id="all-prices"
              name="sort-price"
              className="cursor-pointer"
              defaultChecked
            />
            <label htmlFor="all-prices" className="cursor-pointer">
              {t("All")}
            </label>
          </div>
          <div className="flex gap-2 cursor-pointer w-full py-2 duration-200 hover:bg-third-background px-2 rounded-lg">
            <input
              type="radio"
              id="less-then-200"
              name="sort-price"
              className="cursor-pointer"
            />
            <label htmlFor="less-then-200" className="cursor-pointer">
              {t("less-then-200")}
            </label>
          </div>
          <div className="flex gap-2 cursor-pointer w-full py-2 duration-200 hover:bg-third-background px-2 rounded-lg">
            <input
              type="radio"
              id="between-200-500"
              name="sort-price"
              className="cursor-pointer"
            />
            <label htmlFor="between-200-500" className="cursor-pointer">
              200$ - 500$
            </label>
          </div>

          <div className="flex gap-2 cursor-pointer w-full py-2 duration-200 hover:bg-third-background px-2 rounded-lg">
            <input
              type="radio"
              id="between-500-1000"
              name="sort-price"
              className="cursor-pointer"
            />
            <label htmlFor="between-500-1000" className="cursor-pointer">
              500$ - 1000$
            </label>
          </div>
          <div className="flex gap-2 cursor-pointer w-full py-2 duration-200 hover:bg-third-background px-2 rounded-lg">
            <input
              type="radio"
              id="between-1000-5000"
              name="sort-price"
              className="cursor-pointer"
            />
            <label htmlFor="between-1000-5000" className="cursor-pointer">
              1000$ - 5000$
            </label>
          </div>

          <div className="flex gap-2 cursor-pointer w-full py-2 duration-200 hover:bg-third-background px-2 rounded-lg">
            <input
              type="radio"
              id="more then 5000"
              name="sort-price"
              className="cursor-pointer"
            />
            <label htmlFor="more then 5000" className="cursor-pointer">
              {t("more then 5000")}
            </label>
          </div>
        </div>
      </form>

      <form>
        <h3 className="title mb-2 text-second-text"> {t("Include")}</h3>
        <div className="space-y-2 w-full card p-3">
          <div className="flex gap-2 cursor-pointer w-full py-2 duration-200 hover:bg-third-background px-2 rounded-lg">
            <input
              type="checkbox"
              id="discount"
              name="sort"
              className="cursor-pointer"
            />
            <label htmlFor="discount" className="cursor-pointer">
              {t("sort discount")}
            </label>
          </div>
          <div className="flex gap-2 cursor-pointer w-full py-2 duration-200 hover:bg-third-background px-2 rounded-lg">
            <input
              type="checkbox"
              id="featured"
              name="sort"
              className="cursor-pointer"
            />
            <label htmlFor="featured" className="cursor-pointer">
              {t("Featured")}
            </label>
          </div>
        </div>
      </form>
    </aside>
  );
}

export default Filter;

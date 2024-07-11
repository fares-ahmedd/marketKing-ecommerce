import CreateProductForm from "@/app/components/dashboard/CreateProductForm";
import IconButton from "@/app/components/ui/IconButton";
import MyLink from "@/app/components/ui/MyLink";
import { useTranslate } from "@/app/hooks/useTranslate";
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from "react-icons/io";

function ProductCreateRoute() {
  const { t, isArabic } = useTranslate();
  return (
    <main className="container-layout my-3 max-w-[1080px]">
      <div className="flex-items-center gap-3">
        <MyLink href="/dashboard/products">
          <IconButton>
            {isArabic ? <IoMdArrowRoundForward /> : <IoMdArrowRoundBack />}
          </IconButton>
        </MyLink>
        <h2 className="title ">{t("New Product")}</h2>
      </div>

      <section className="card mt-6">
        <h3 className="title mb-2">{t("Product Details")}</h3>
        <p className="text-sm text-second-text mb-4">
          {t("Product Details title")}
        </p>

        <CreateProductForm />
      </section>
    </main>
  );
}

export default ProductCreateRoute;

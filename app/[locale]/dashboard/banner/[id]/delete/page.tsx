import { deleteBanner } from "@/app/_actions/deleteBanner";
import Button from "@/app/_components/ui/Button";
import MyLink from "@/app/_components/ui/MyLink";
import SubmitButton from "@/app/_components/ui/SubmitButton";
import prisma from "@/app/_lib/db";
import { getTranslate } from "@/app/_utils/helpers";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: `${t("Delete Banner")}`,
  };
}
async function page({
  params: { id, locale },
}: {
  params: { id: string; locale: string };
}) {
  unstable_setRequestLocale(locale);

  const banner = await prisma.banner.findUnique({
    where: {
      id,
    },
  });
  const { t } = await getTranslate();

  if (!banner) {
    return notFound();
  }
  return (
    <main className="container-layout h-[calc(100vh-60px)] flex-center animate-smooth overflow-auto">
      <section className="card w-[70%] mx-auto max-w-[600px] py-6 ">
        <h5 className="title mb-3 flex-center-items">
          {t("delete title banner")}{" "}
          <span className="text-base text-second-text">({banner.title})</span>
        </h5>
        <p className="text-sm text-second-text mb-6">
          {t("delete title desc banner")}
        </p>
        <Image
          src={banner.imageString}
          alt={banner.title}
          width={250}
          height={250}
          priority
          className="rounded-lg mx-auto my-3 max-h-[250px]"
        />
        <div className="flex items-center gap-3 justify-end">
          <Button color={"black"} size={"md"} asChild>
            <MyLink href={`/dashboard/banner`}>{t("No")}</MyLink>
          </Button>
          <form action={deleteBanner}>
            <input type="hidden" name="bannerId" value={banner.id} />
            <SubmitButton color="error" className="w-fit  ps-4" size="md">
              {t("Yes")}
            </SubmitButton>
          </form>
        </div>
      </section>
    </main>
  );
}

export default page;

import EditProfileForm from "@/app/_components/marketking/EditProfileForm";
import IconButton from "@/app/_components/ui/IconButton";
import MyLink from "@/app/_components/ui/MyLink";
import { getUser } from "@/app/_utils/getUser";
import { getTranslate } from "@/app/_utils/helpers";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { redirect } from "next/navigation";
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from "react-icons/io";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: `${t("Edit Profile")}`,
  };
}
async function EditProfilePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  const user: any = await getUser();
  const { t, isArabic } = await getTranslate();

  if (!user) redirect(isArabic ? "/ar" : "/en");
  return (
    <section className="container-layout py-3 min-h-[calc(100vh-122px)]">
      <div className="flex-items-center gap-3">
        <MyLink href="/">
          <IconButton>
            {isArabic ? <IoMdArrowRoundForward /> : <IoMdArrowRoundBack />}
          </IconButton>
        </MyLink>
        <h2 className="title ">{t("Edit Profile")}</h2>
      </div>

      <div className="card mt-6">
        <EditProfileForm user={user} />
      </div>
    </section>
  );
}

export default EditProfilePage;

import { unstable_setRequestLocale } from "next-intl/server";
import authPreview from "@/public/auth-preview.jpg";
import logo from "@/public/logo.png";
import Image from "next/image";
function layout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  return (
    <section className="container-layout flex-1 grid grid-cols-1 sm:grid-cols-2">
      <div className="flex-center flex-col gap-2  bg-main-background overflow-auto">
        <Image src={logo} alt="Logo" width={100} height={100} />
        {children}
      </div>
      <div className="relative max-sm:hidden">
        <Image
          src={authPreview}
          fill
          placeholder="blur"
          alt="Autonation Preview"
        />
        <div className="absolute top-0 start-0 w-full h-full bg-main-background opacity-30" />
      </div>
    </section>
  );
}

export default layout;

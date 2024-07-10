"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import { Suspense } from "react";

function Header() {
  return (
    <header className="bg-sec-background pt-4 pb-2">
      <div className="container-layout flex-between">
        <Logo />
        <NavLinks />
        <Suspense fallback={<div>Loading...</div>}>
          <LanguageSwitcher />
        </Suspense>
      </div>
    </header>
  );
}

export default Header;

function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const changeLocale = (locale: string) => {
    const segments = pathname.split("/");
    segments[1] = locale;
    const newPathname = segments.join("/");
    const queryString = searchParams.toString();
    const url = queryString ? `${newPathname}?${queryString}` : newPathname;
    router.push(url);
  };

  return (
    <>
      <h3 onClick={() => changeLocale("en")}>English</h3>
      <h3 onClick={() => changeLocale("ar")}>عربي</h3>
    </>
  );
}

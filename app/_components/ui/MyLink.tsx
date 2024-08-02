import { useTranslate } from "@/app/_hooks/useTranslate";
import Link from "next/link";
import React from "react";

const MyLink = React.forwardRef<
  HTMLAnchorElement,
  {
    children: React.ReactNode;
    href: string;
    className?: string;
    [key: string]: any;
  }
>(({ children, href, className, ...props }, ref) => {
  const { lang } = useTranslate();
  return (
    <Link href={`/${lang}${href}`} className={className} ref={ref} {...props}>
      {children}
    </Link>
  );
});

MyLink.displayName = "MyLink";

export default MyLink;

import { useTranslate } from "@/hooks/useTranslate";
import Link from "next/link";

function MyLink({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  const { lang } = useTranslate();
  return <Link href={`/${lang}${href}`}>{children}</Link>;
}

export default MyLink;

import { useTranslate } from "@/app/_hooks/useTranslate";
import Link from "next/link";

function MyLink({
  children,
  href,
  className,
}: {
  children: React.ReactNode;
  href: string;
  className?: string;
}) {
  const { lang } = useTranslate();
  return (
    <Link href={`/${lang}${href}`} className={className}>
      {children}
    </Link>
  );
}

export default MyLink;

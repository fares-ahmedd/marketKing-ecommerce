import Header from "@/app/_components/header/Header";
import { unstable_setRequestLocale } from "next-intl/server";
import Logo from "../_components/header/Logo";
import NavLinks from "../_components/header/NavLinks";
import Button from "../_components/ui/Button";
import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

export default function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  return (
    <main>
      <Header>
        <Logo />
        <NavLinks />
      </Header>
      <Button size="md" color="black">
        <LoginLink>Login</LoginLink>
      </Button>
      <Button size="md" color="white" className="border ">
        <RegisterLink>Sign Up</RegisterLink>
      </Button>
    </main>
  );
}

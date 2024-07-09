import Logo from "./Logo";
import NavLinks from "./NavLinks";

function Header() {
  return (
    <header className="bg-sec-background pt-4 pb-2">
      <div className="container-layout  flex-between">
        <Logo />
        <NavLinks />
      </div>
    </header>
  );
}

export default Header;
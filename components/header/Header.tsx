import Logo from "./Logo";

function Header() {
  return (
    <header className="bg-sec-background pt-4 pb-2">
      <div className="container-layout  flex-between">
        <Logo />
        <h1>Test</h1>
      </div>
    </header>
  );
}

export default Header;

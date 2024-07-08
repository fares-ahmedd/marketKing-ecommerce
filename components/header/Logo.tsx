import { FaCrown } from "react-icons/fa";

function Logo() {
  return (
    <h1 className="text-xl md:text-2xl tracking-wide relative">
      Market<span className="text-primary-text font-bold">King</span>
      <FaCrown className="absolute text-primary-text -top-3 left-[1px] text-lg md:text-xl " />
    </h1>
  );
}

export default Logo;

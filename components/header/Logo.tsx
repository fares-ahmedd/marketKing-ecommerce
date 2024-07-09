import { FaCrown } from "react-icons/fa";

function Logo() {
  return (
    <bdi className="text-xl md:text-2xl tracking-wide relative text-rtl ">
      Market<span className="text-primary-text font-bold">King</span>
      <FaCrown className="absolute text-primary-text -top-3 left-[1px] text-lg md:text-xl " />
    </bdi>
  );
}

export default Logo;

import { FaGithub } from "react-icons/fa";
import IconButton from "../ui/IconButton";
import { useTranslate } from "@/app/_hooks/useTranslate";

function Footer() {
  const { t } = useTranslate();
  return (
    <footer className="container-layout bg-third-background p-3 flex-between max-h-[62px]">
      <a
        href="https://github.com/fares-ahmedd/marketKing-ecommerce"
        target="_blank"
        rel="noopener noreferrer"
      >
        {" "}
        <IconButton>
          <FaGithub />
        </IconButton>
      </a>

      <small>
        {" "}
        &copy; {new Date().getFullYear()} {t("CopyRights")}
      </small>
    </footer>
  );
}

export default Footer;

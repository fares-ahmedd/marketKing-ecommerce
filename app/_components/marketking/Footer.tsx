import { FaGithub } from "react-icons/fa";
import IconButton from "../ui/IconButton";
import { useTranslate } from "@/app/_hooks/useTranslate";

function Footer() {
  const { t } = useTranslate();
  return (
    <footer className="bg-third-background p-3  max-h-[62px]">
      <div className="container-layout flex-between ">
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
      </div>
    </footer>
  );
}

export default Footer;

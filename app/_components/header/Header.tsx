"use client";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";

function Header({ children }: { children: React.ReactNode }) {
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() || 0;
    if (latest > prev && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.header
      className="header"
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: "-100%", opacity: 0 },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
    >
      <div className="container-layout flex-between ">
        {children}
        {/* <Suspense fallback={<div>Loading...</div>}>
          <LanguageSwitcher />
        </Suspense> */}
      </div>
    </motion.header>
  );
}

export default Header;

// function LanguageSwitcher() {
//   const router = useRouter();
//   const pathname = usePathname();
//   const searchParams = useSearchParams();

//   const changeLocale = (locale: string) => {
//     const segments = pathname.split("/");
//     segments[1] = locale;
//     const newPathname = segments.join("/");
//     const queryString = searchParams.toString();
//     const url = queryString ? `${newPathname}?${queryString}` : newPathname;
//     router.push(url);
//   };

//   return (
//     <>
//       <h3 onClick={() => changeLocale("en")}>English</h3>
//       <h3 onClick={() => changeLocale("ar")}>عربي</h3>
//     </>
//   );
// }

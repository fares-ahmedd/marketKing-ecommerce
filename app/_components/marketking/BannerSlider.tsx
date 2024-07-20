import { Banner } from "@prisma/client";

const ONE_SECOND = 1000;
const AUTO_DELAY = ONE_SECOND * 10;
const DRAG_BUFFER = 50;

const SPRING_OPTIONS = {
  type: "spring",
  mass: 3,
  stiffness: 400,
  damping: 50,
};

function BannerSlider({ banners }: { banners: Banner[] }) {
  return <div>BannerSlider</div>;
}

export default BannerSlider;

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
type ImagesProp = {
  item: { images: string[]; name: string };
};
function ImagesSlider({ item }: ImagesProp) {
  return (
    <Carousel>
      <CarouselContent>
        {item.images.map((image) => (
          <CarouselItem key={image}>
            <div className="relative   w-full h-[300px] max-sm:h-[150px] overflow-hidden ">
              <Image
                src={image}
                fill
                alt={`${item.name}`}
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="ms-16" />
      <CarouselNext className="me-16" />
    </Carousel>
  );
}

export default ImagesSlider;

import { FaStar } from "react-icons/fa";

function ProductInfoSkeleton() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start lg:gap-x-24 mb-3">
        <div className="grid gap-6 md:gap-3 items-start">
          <div className="relative overflow-hidden rounded-lg w-full h-[400px] bg-third-background animate-skeleton"></div>
          <div className="grid grid-cols-2 sm:grid-cols-5  gap-4 w-full h-[150px] sm:h-[150px]">
            {Array.from({ length: 5 }, (_, index) => (
              <div
                key={index}
                className="rounded-lg relative bg-third-background animate-skeleton"
              ></div>
            ))}
          </div>
        </div>

        <article>
          <div className="flex-between my-2 gap-1">
            <h2 className="title line-clamp-1 text-ltr w-[200px] h-[25px]   bg-third-background animate-skeleton"></h2>
            <div className="w-[40px] h-[40px] rounded-xl bg-third-background animate-skeleton"></div>
          </div>

          <p className="title line-clamp-1 text-ltr w-[100px] h-[20px]   bg-third-background animate-skeleton"></p>

          <ol className="flex-items-center gap-2 my-3">
            {Array.from({ length: 5 }, (_, index) => (
              <li
                key={index}
                className="text-xl text-third-background animate-skeleton "
              >
                <FaStar />
              </li>
            ))}
          </ol>

          <p className="w-full h-[15px]  bg-third-background animate-skeleton "></p>
          <p className="w-full h-[15px]  bg-third-background animate-skeleton my-2 "></p>
          <p className="w-full h-[15px]  bg-third-background animate-skeleton "></p>

          <div className="my-3  h-[30px] w-[180px] bg-third-background animate-skeleton rounded-lg "></div>

          <div className="my-3 mx-auto h-[40px] w-[200px] bg-third-background animate-skeleton rounded-lg "></div>
        </article>
      </div>
    </>
  );
}

export default ProductInfoSkeleton;

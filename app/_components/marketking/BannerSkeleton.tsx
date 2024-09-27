import React from "react";

function BannerSkeleton() {
  return (
    <section className="relative h-screen">
      <div className="h-[70vh]  rounded-xl bg-sec-background animate-skeleton" />

      <div className="my-3 flex-between">
        <div className="bg-third-background animate-skeleton w-[130px] h-[52px] rounded-lg" />
        <div className="bg-third-background animate-skeleton w-[130px] h-[52px] rounded-lg" />
      </div>

      <ul className="flex-center gap-3">
        {Array.from({ length: 3 }, (_, index) => (
          <li
            key={index}
            className="w-[12px] h-[12px] rounded-full bg-third-background animate-skeleton"
          ></li>
        ))}
      </ul>
    </section>
  );
}

export default BannerSkeleton;

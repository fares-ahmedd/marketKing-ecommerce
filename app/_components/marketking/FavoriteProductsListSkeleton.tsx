import React from "react";

function FavoriteProductsListSkeleton() {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 flex-wrap mt-6">
      {Array.from({ length: 6 }, (_, index) => (
        <li
          key={index}
          className="h-[507px] bg-third-background animate-skeleton rounded-lg p-2"
        >
          <div className="relative   w-full h-[300px] bg-main-background animate-skeleton rounded-lg"></div>

          <h5 className="w-full h-[22px] bg-main-background animate-skeleton rounded-lg"></h5>

          <p className="w-full h-[15px] bg-main-background animate-skeleton my-2 rounded-lg"></p>
          <p className="w-full h-[15px] bg-main-background animate-skeleton rounded-lg"></p>

          <div className="flex-between text-ltr my-2 border-b pb-3 animate-skeleton border-main-background">
            <div className="w-[60px] h-[60px] bg-main-background animate-skeleton rounded-full"></div>
            <div className="w-[60px] h-[60px] bg-main-background animate-skeleton rounded-full"></div>
          </div>

          <div className="w-full h-[30px] rounded-lg bg-main-background animate-skeleton"></div>
        </li>
      ))}
    </ul>
  );
}

export default FavoriteProductsListSkeleton;

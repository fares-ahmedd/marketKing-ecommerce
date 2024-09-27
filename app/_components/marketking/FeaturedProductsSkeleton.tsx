function FeaturedProductsSkeleton() {
  return (
    <section className="mb-3">
      <div className="h-[25px] w-[150px] rounded-md bg-sec-background animate-skeleton mb-3"></div>
      <ul className="grid grid-flow-col auto-cols-max  text-ltr my-2 overflow-hidden">
        {Array.from({ length: 4 }, (_, index) => (
          <li
            key={index}
            className="w-[400px] h-[400px] max-sm:w-[250px] max-sm:h-[250px] bg-sec-background animate-skeleton duration-300 group text-ltr mx-1 rounded-md"
          ></li>
        ))}
      </ul>
    </section>
  );
}

export default FeaturedProductsSkeleton;

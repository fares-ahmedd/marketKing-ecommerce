interface Props {
  children: React.ReactNode;
  className?: string;
  isClient?: boolean;
  isClickable?: boolean;
  onClick?: () => void;
}
const IconButton = ({
  children,
  onClick,
  className,
  isClient = false,
  isClickable = true,
}: Props) => {
  return (
    <>
      {isClient ? (
        <span
          className={`
        relative  font-bold   border  hover-border
         p-2 text-lg md:text-xl rounded-md  duration-400 ease-in-out
         hover:bg-hover-button block cursor-pointer
            ${className} ${isClickable && "active:scale-95"}
      `}
          onClick={onClick}
        >
          {children}
        </span>
      ) : (
        <span
          className={`
   relative  font-bold   border  hover-border
    p-2 text-lg md:text-xl rounded-md  duration-400 ease-in-out
    hover:bg-hover-button block cursor-pointer
       ${className} ${isClickable && "active:scale-95"}
 `}
          onClick={onClick}
        >
          {children}
        </span>
      )}
    </>
  );
};

export default IconButton;

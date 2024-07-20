interface Props {
  children: React.ReactNode;
  className?: string;
  isClickable?: boolean;
  onClick?: () => void;
}
const IconButton = ({
  children,
  onClick,
  className,
  isClickable = true,
}: Props) => {
  return (
    <button
      className={`
        relative  font-bold   border  hover-border
         p-2 text-lg md:text-xl rounded-md  duration-400 ease-in-out
         hover:bg-hover-button
            ${className} ${isClickable && "active:scale-95"}
      `}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default IconButton;

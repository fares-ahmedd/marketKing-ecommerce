import { useFormStatus } from "react-dom";
import { FaRegHeart, FaHeart } from "react-icons/fa";

function FavButton({
  className,
  isFav = false,
  onClick,
}: {
  className?: string;
  isFav?: boolean;
  onClick?: () => void;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      className={`p-2 rounded-lg text-xl md:text-3xl 
      ${
        isFav
          ? "bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400"
          : "bg-gray-200 dark:bg-gray-700 text-red-500 hover:text-red-600"
      } ${className}
      transition-colors duration-200`}
      disabled={pending}
      onClick={onClick}
    >
      {isFav ? <FaHeart /> : <FaRegHeart />}
    </button>
  );
}

export default FavButton;

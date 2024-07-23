import { FaRegHeart, FaHeart } from "react-icons/fa";

function FavButton({ className }: { className?: string }) {
  return (
    <button
      className={`p-2 rounded-lg text-xl md:text-3xl 
    ${
      false
        ? "bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400"
        : "bg-gray-200 dark:bg-gray-700 text-red-500 hover:text-red-600"
    } ${className}
    transition-colors duration-200`}
    >
      {false ? <FaHeart /> : <FaRegHeart />}
    </button>
  );
}

export default FavButton;

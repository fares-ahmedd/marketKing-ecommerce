import { FaShoppingCart } from "react-icons/fa";
import IconButton from "../ui/IconButton";

function ShoppingCart() {
  return (
    <IconButton className="relative ">
      <FaShoppingCart />
      <span className="bg-primary-bg-color text-main-text absolute -top-3 -start-1 text-sm px-1 rounded-lg">
        5
      </span>
    </IconButton>
  );
}

export default ShoppingCart;

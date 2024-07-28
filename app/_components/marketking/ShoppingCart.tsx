import { FaShoppingCart } from "react-icons/fa";
import IconButton from "../ui/IconButton";
import { User } from "@prisma/client";
import { IUserIncludeFavorites } from "@/app/_utils/types";

function ShoppingCart({ user }: { user: IUserIncludeFavorites }) {
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

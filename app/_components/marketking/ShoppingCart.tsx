import { FaShoppingCart, FaTrash } from "react-icons/fa";
import IconButton from "../ui/IconButton";
import prisma from "@/app/_lib/db";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { getTranslate } from "@/app/_utils/helpers";
import Button from "../ui/Button";
import Image from "next/image";
import MyLink from "../ui/MyLink";
import { BsFillCartDashFill } from "react-icons/bs";
import { deleteItemCart } from "@/app/_actions/deleteItemCart";
import SubmitButton from "../ui/SubmitButton";
import IncAndDecProductItem from "./IncAndDecProductItem";

async function ShoppingCart({ userId }: { userId: string }) {
  const cart = await prisma.cart.findUnique({
    where: { userId: userId ?? "" },
    include: {
      items: true, // This includes all CartItems related to this Cart
    },
  });
  const { t, isArabic } = await getTranslate();

  const totalPrice = cart?.items?.reduce((acc, cur) => {
    return acc + (cur.price - cur.discount) * cur.quantity;
  }, 0);

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <IconButton className="relative ">
            <FaShoppingCart />
            {cart?.items && cart.items.length > 0 && (
              <span className="bg-primary-bg-color text-main-text absolute -top-3 -start-1 text-sm px-1 rounded-lg">
                {cart.items.length}
              </span>
            )}
          </IconButton>
        </SheetTrigger>

        <SheetContent className="flex flex-col justify-between overflow-y-auto">
          <h6
            className={`absolute font-bold tracking-wide top-3 ${
              isArabic ? "end-2" : "start-2"
            } `}
          >
            {t("Cart")}
          </h6>
          {cart?.items && cart.items.length > 0 ? (
            <ul className="mx-3 my-5 ">
              {cart.items.map((item) => (
                <li className="border-b py-2" key={item.id}>
                  <div className="flex-between gap-1">
                    <MyLink
                      className="line-clamp-1"
                      href={`/product/${item.productId}`}
                    >
                      {item.name}
                    </MyLink>

                    <strong className="font-bold text-primary-color ">
                      ${(item.price - item.discount) * item.quantity}
                    </strong>
                  </div>

                  <div className="flex justify-between gap-1">
                    <div className="relative flex-1 h-[100px] max-w-[150px] ">
                      <Image src={item.imageString} alt={"Product Item"} fill />
                    </div>

                    <div>
                      <IncAndDecProductItem
                        quantity={item.quantity}
                        userId={userId}
                        itemId={item.id}
                      />
                      <form
                        action={deleteItemCart.bind(null, {
                          userId,
                          itemId: item.id,
                        })}
                      >
                        <SubmitButton
                          color="error"
                          size="md"
                          className="mx-auto"
                        >
                          {t("Delete")} <FaTrash />
                        </SubmitButton>
                      </form>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-10">
              <BsFillCartDashFill className="block text-4xl text-second-text mb-2 mx-auto" />

              <h3 className="text-center">{t("haven't add items")}</h3>
            </div>
          )}

          {cart?.items && cart.items.length > 0 && (
            <div>
              <div className="flex-between">
                <h4 className="title">{t("Price")}</h4>

                <strong className="title">${totalPrice}</strong>
              </div>
              <Button color="primary" size="md" className="w-full mt-2">
                {t("Proceed to Checkout")}
              </Button>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}

export default ShoppingCart;

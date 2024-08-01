"use client";
import { useFormStatus } from "react-dom";
import Button from "../ui/Button";
import { increaseProductItem } from "@/app/_actions/increaseProductItem";

function IncAndDecProductItem({
  quantity,
  itemId,
  userId,
}: {
  quantity: number;
  itemId: string;
  userId: string;
}) {
  const { pending } = useFormStatus();

  console.log(pending);

  return (
    <div className="card flex-items-center  mb-2 text-rtl ">
      <form action={increaseProductItem.bind(null, { itemId, userId })}>
        <Button color="info" size="sm" disabled={pending}>
          +
        </Button>
      </form>
      <span className="mx-3">{quantity}</span>
      <form>
        <Button color="info" size="sm" disabled={pending}>
          -
        </Button>
      </form>
    </div>
  );
}

export default IncAndDecProductItem;

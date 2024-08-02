"use client";
import { useFormStatus } from "react-dom";
import Button from "../ui/Button";
import { increaseProductItem } from "@/app/_actions/increaseProductItem";
import { decreaseProductItem } from "@/app/_actions/decreaseProductItem";

function IncAndDecProductItem({
  quantity,
  itemId,
  userId,
}: {
  quantity: number;
  itemId: string;
  userId: string;
}) {
  return (
    <div className="card flex-items-center  mb-2 text-rtl ">
      <form action={increaseProductItem.bind(null, { itemId, userId })}>
        <SubmitButton>+</SubmitButton>
      </form>
      <span className="mx-3">{quantity}</span>
      <form action={decreaseProductItem.bind(null, { itemId, userId })}>
        <SubmitButton>-</SubmitButton>
      </form>
    </div>
  );
}

export default IncAndDecProductItem;

function SubmitButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus();

  return (
    <Button color="info" size="sm" disabled={pending}>
      {children}
    </Button>
  );
}

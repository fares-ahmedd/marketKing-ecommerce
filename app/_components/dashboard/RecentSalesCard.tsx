import { useTranslate } from "@/app/_hooks/useTranslate";
import prisma from "@/app/_lib/db";
import { getTranslate } from "@/app/_utils/helpers";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

async function RecentSalesCard() {
  const orders = await prisma.order.findMany({
    select: {
      amount: true,
      id: true,
      User: {
        select: {
          firstName: true,
          lastName: true,
          profileImage: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 7,
  });
  const { t, isArabic } = await getTranslate();
  return (
    <div className="card">
      <h3 className="title mb-2">{t("Recent Sales")}</h3>

      <ul className="flex flex-col gap-8">
        {orders.map((order) => (
          <li className="flex items-center gap-4" key={order.id}>
            <Avatar className="max-sm:hidden flex h-9 w-9">
              <AvatarImage
                src={order.User?.profileImage}
                alt={order.User?.firstName}
              />
              <AvatarFallback className="w-[40px] h-[40px] rounded-full bg-main-background animate-skeleton"></AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <p className="font-bold">
                {order.User?.firstName} {order.User?.lastName}
              </p>
              <p className="text-sm text-second-text">{order.User?.email}</p>
            </div>
            <strong
              className={`${
                isArabic ? "me-auto" : "ms-auto"
              } text-lg font-extrabold text-ltr `}
            >
              +${Intl.NumberFormat("en-US").format(order.amount / 100)}
            </strong>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecentSalesCard;

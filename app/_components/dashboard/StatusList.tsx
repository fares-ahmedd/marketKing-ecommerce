import { AiFillDollarCircle } from "react-icons/ai";
import { FcSalesPerformance } from "react-icons/fc";
import StatusItem from "@/app/_components/dashboard/StatusItem";
import { FaUsers } from "react-icons/fa";
import prisma from "@/app/_lib/db";
import { FaCartArrowDown } from "react-icons/fa6";

async function StatusList() {
  const [users, products, orders] = await Promise.all([
    prisma.user.findMany({
      select: {
        id: true,
      },
    }),
    prisma.product.findMany({
      select: {
        id: true,
      },
    }),

    prisma.order.findMany({
      select: {
        amount: true,
      },
    }),
  ]);

  const totalAmount = orders.reduce((acc, cur) => acc + cur.amount, 0);

  return (
    <ol className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
      <StatusItem
        icon={<AiFillDollarCircle />}
        title="Total Revenue"
        label="basedOnChanges"
        statusValue={`$${new Intl.NumberFormat("en-US").format(
          totalAmount / 100
        )}`}
      />
      <StatusItem
        icon={<FcSalesPerformance />}
        title="Total Sales"
        label="Total Sales label"
        statusValue={`+${orders.length}`}
      />
      <StatusItem
        icon={<FaCartArrowDown className="text-main-text" />}
        title="Total Products"
        label="Total Products label"
        statusValue={`${products.length}`}
      />
      <StatusItem
        icon={<FaUsers className="text-main-text" />}
        title="Total Users"
        label="Total Users label"
        statusValue={`+${users.length}`}
      />
    </ol>
  );
}

export default StatusList;

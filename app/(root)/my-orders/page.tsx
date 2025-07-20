import React from "react";
import MyOrderCard from "@/components/my-order-card";
import API from "@/API";
import { cookies } from "next/headers";

export default async function MyOrdersPage()  {
  const userCookies = await cookies()
  const myOrders = await API.getMyOrders({userCookies})
  return (
    <div className="w-full max-w-3xl py-4 space-y-6">
      <h1 className="text-3xl font-bold text-center mb-4">My Orders</h1>

      {myOrders.map((order) => (
        <MyOrderCard key={order._id} order={order} />
      ))}
    </div>
  );
};

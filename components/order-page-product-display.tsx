"use client";
import { useState } from "react";
import { OrderPageProduct, OrderPageProductTable } from "./tables/orderpage-product-table";

export default function OrderPageProductDisplay({orderProducts}: {orderProducts:OrderPageProduct[]}) {
    const [orderProductData] = useState<OrderPageProduct[]>(orderProducts)
    return (
        <div className='p-2 rounded-lg shadow-sm bg-white'>
            <p className='text-lg font-semibold mb-3'>Products</p>
            <OrderPageProductTable data={orderProductData} />
        </div>
    )
}
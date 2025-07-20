import React from 'react';
import Link from 'next/link';

// Assuming these paths are correct
import API from '@/API';
import { OrderDetails, } from '@/types';
import { cookies } from 'next/headers';
import { CornerUpLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import OrderPageProductDisplay from '@/components/order-page-product-display';
import OrderPriceSummary from '@/components/tables/order-price-summery';
import OrderPageStatus from '@/components/order-page-status';
import AddressDisplayAdminOrder from '@/components/address-display-admin-order';

// Define the shape of the params object expected by this page
interface OrderDetailPageParams {
  orderNoQuery: string; // This matches the folder name [orderNo]
}

async function getData(orderNo: string): Promise<OrderDetails> {
  const userCookies = await cookies()
  const orders = await API.admin.getOrderDetails(userCookies, orderNo)
  return orders
}


export default async function OrderDetailPage({ params }: { params: Promise<OrderDetailPageParams> }) {
  // Await the params to get the actual orderNo
  const { orderNoQuery } = await params;

  const orderData = await getData(orderNoQuery)

  return (
    <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8 bg-gray-100">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="outline" size="icon" asChild>
          <Link href="/admin/orders" className="underline flex gap-2 items-center">
          <CornerUpLeft />
        </Link>
        </Button>
        <h1 className="text-xl font-bold text-gray-700">Order #{orderData.order_no}</h1>
      </div>
      <div className="flex gap-3">
        <div className='flex-2/3 flex flex-col gap-5'>
          <OrderPageProductDisplay orderProducts={orderData.items} />
          <OrderPriceSummary
            orderNo={orderNoQuery}
            subtotal={orderData.sub_total}
            tax={orderData.tax}
            shippingCost={orderData.shipping_cost}
            total={orderData.total}
            paymentStatus={orderData.payment_status}
            paymentMethod={orderData.payment_method}
            paymentID={orderData.paymentID!}
          />
        </div>
        <div className='flex-1/3 flex flex-col gap-5'>
          <div className='p-2 flex flex-col gap-3 rounded-lg bg-white shadow-sm'>
          <div>
            <p className='font-semibold mb-1'>Customer</p>
            <Link href="#" className='px-0 text-blue-500 cursor-pointer hover:underline underline-offset-4 text-sm font-semibold'>{orderData.user_details.name}</Link>
          </div>
          <div>
            <p className='font-semibold mb-1'>Contact information</p>
            <Link href="#" className='px-0 text-blue-500 cursor-pointer hover:underline underline-offset-4 text-sm font-semibold'>{orderData.user_details.email}</Link>
            <p className='text-sm'>03132267247</p>
          </div>
          <AddressDisplayAdminOrder addressTitle='Shipping address' address={orderData.shipping_address} />
          <AddressDisplayAdminOrder addressTitle='Billing address' address={orderData.billing_address} />
          </div>
          <OrderPageStatus value={orderData.status} orderNo={orderNoQuery} />
        </div>
      </div>
    </div>
  );
}
import API from "@/API";
import MyOrderDetailsAddress from "@/components/my-order-details-address";
import OrderProductSummary from "@/components/order-product-summery.tsx";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/formatCurrency";
import { formatDate } from "@/lib/formatDate";
import Head from "next/head";
import { cookies } from "next/headers";
import Link from "next/link";
import { notFound } from "next/navigation";
import MyOrderCancelButton from "./my-order-cancel-button";
import { Clock, CreditCard, DollarSign, Truck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PaymentID } from "./paymentID";
import { removeUnderScore } from "@/lib/utils";

export default async function OrderDetailPage({params}: {params: Promise<{orderId: string}>}) {
  const {orderId} = await params
  if (!orderId) {
    notFound()
  }
  const userCookies = await cookies()
  const order = await API.getMyOrderDetails({userCookies, orderId})
  if (!order) {
    notFound()
  }

  return (
    <>
      <Head><title>Order #{order.orderNo}</title></Head>
      <div className="max-w-4xl mx-auto pb-4">
        <Breadcrumb className="mb-2">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/my-orders">My Order</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-muted-foreground">Order {order._id}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-2xl font-bold mb-2">Order #{order.orderNo}</h1>
        <p className="text-sm text-foreground-400 mb-4">Placed on: {formatDate(order.createdAt).toLocaleString()}</p>

        <div className="w-full mx-auto py-6">
          <h2 className="mb-5 text-2xl font-bold text-foreground-800 flex items-center gap-2">
            <Truck className="h-7 w-7 text-indigo-600" />
            Order Details
          </h2>

          <div className="space-y-4">
            {/* Order Status */}
            <div className="flex items-center justify-between">
              <p className="text-foreground-700 font-semibold flex items-center gap-2">
                <Clock className="h-5 w-5 text-foreground-500" /> Status:
              </p>
              {order.status === 'pending' && <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-300 px-3 py-1 rounded-full text-sm">Pending</Badge>}
              {order.status === 'processing' && <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-300 px-3 py-1 rounded-full text-sm">Processing</Badge>}
              {order.status === 'shipped' && <Badge className="bg-blue-50 text-blue-700 border-blue-300 px-3 py-1 rounded-full text-sm">Shipped</Badge>}
              {order.status === 'delivered' && <Badge className="bg-green-50 text-green-700 border-green-300 px-3 py-1 rounded-full text-sm">Delivered</Badge>}
              {order.status === 'cancelled' && <Badge variant="destructive" className="px-3 py-1 rounded-full text-sm">Cancelled</Badge>}
              {/* Add more status badges as needed */}
            </div>

            {/* Payment Method */}
            <div className="flex items-center justify-between">
              <p className="text-foreground-700 font-semibold flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-foreground-500" /> Payment method:
              </p>
              <p className="text-foreground-800 capitalize text-sm">{removeUnderScore(order.paymentMethod)}</p>
            </div>

            {/* Payment Status */}
            <div className="flex items-center justify-between">
              <p className="text-foreground-700 font-semibold flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-foreground-500" /> Payment status:
              </p>
              {order.paymentStatus === 'paid' && <Badge className="bg-green-50 text-green-700 border-green-300 px-3 py-1 rounded-full text-sm">Paid</Badge>}
              {order.paymentStatus === 'unpaid' && <Badge variant="destructive" className="px-3 py-1 rounded-full text-sm">Unpaid</Badge>}
              {/* Add other payment status badges */}
            </div>

            {/* Payment ID (conditionally rendered) */}
            {order.paymentMethod === 'card' && order.stripePaymentId && (
              <div className="flex items-center justify-between">
                <p className="text-foreground-700 font-semibold flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-foreground-500" /> Payment ID:
                </p>
                <PaymentID paymentID={order.stripePaymentId} />
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6">
            {order.status === 'pending' && (
              <MyOrderCancelButton />
            )}
            {order.paymentStatus === 'unpaid' && order.paymentMethod === "card" && (
              <Button size="sm" asChild className="w-full sm:w-auto">
                <Link href={`/retry-order-payment/${order._id}`} className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" /> Retry Payment
                </Link>
              </Button>
            )}
          </div>
        </div>

        <div className="border-t py-6">
          <h3 className="text-lg font-semibold mb-4">Items Ordered ({order.items.length})</h3>
          <div className="space-y-4">
            {order.items.map((item, index) => (
              <OrderProductSummary key={index} item={item} />
            ))}
          </div>
        </div>
      
        <div className="border-t py-8 mt-8"> {/* Increased padding and margin for more space */}
          <h3 className="text-2xl font-bold text-foreground-800 mb-6 flex items-center gap-3">
            Delivery & Billing Addresses
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <MyOrderDetailsAddress address={order.shippingAddress} title="Shipping address" />
            <MyOrderDetailsAddress address={order.billingAddress} title="Billing address" />
          </div>
        </div>

        {/* Summary */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatCurrency(order.subTotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>{formatCurrency(order.tax)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{formatCurrency(order.shippingCost)}</span>
            </div>
            <div className="flex justify-between font-semibold border-t pt-2">
              <span>Total</span>
              <span>{formatCurrency(order.total)}</span>
            </div>
          </div>
        </div>
        
      </div>
    </>
  );
}

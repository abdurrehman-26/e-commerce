import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';
import API from '@/API';
import { cookies } from 'next/headers';
import { formatDate } from '@/lib/formatDate';
import { formatCurrency } from '@/lib/formatCurrency';
import OrderProductSummery from '@/components/order-product-summery.tsx';

const OrderConfirmationPage = async ({params}: {params: Promise<{confirmationToken: string}>}) => {
  const {confirmationToken} = await params
  const userCookies = await cookies()
  const orderSummaryData = await API.getOrderSummary({confirmationToken, userCookies})
  const orderSummary = orderSummaryData.order
  const paymentSuccess = true


  return (
      <div className="w-full max-w-3xl">
        {orderSummary.paymentMethod === "cash_on_delivery" ? <div className="mb-3">
          <CheckCircle className="w-24 h-24 mx-auto"/>
          <div className='flex flex-col items-center'>
            <h1 className="text-2xl font-semibold">Order placed successfully!</h1>
            <p className="text-muted-foreground">Order #{orderSummary.orderNo} — placed on {formatDate(orderSummary.placedOn)}</p>
          </div>
        </div>: paymentSuccess ?
        <div className="mb-3">
          <CheckCircle className="w-24 h-24 mx-auto"/>
          <div className='flex flex-col items-center'>
            <h1 className="text-2xl font-semibold">Order placed successfully!</h1>
            <p className="text-muted-foreground">Order #{orderSummary.orderNo} — placed on {formatDate(orderSummary.placedOn)}</p>
          </div>
        </div> : 
        <div className="mb-3">
          <XCircle className="w-24 h-24 mx-auto"/>
          <div className='flex flex-col items-center'>
            <h1 className="text-2xl font-semibold">Order Payment failed!</h1>
            <p className="text-muted-foreground">Order #{orderSummary.orderNo} — placed on {formatDate(orderSummary.placedOn)}</p>
            <div className="mt-4">
              <Link href={`/retry-payment/${orderSummary._id}`}>
                <Button variant="default">Retry Payment</Button>
              </Link>
            </div>
          </div>
        </div>
        }
        <div className="space-y-6">

          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Items Ordered ({orderSummary.items.length})</h3>
            <div className="space-y-4">
              {orderSummary.items.map((item, index) => (
                <OrderProductSummery key={index} item={item} />
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatCurrency(orderSummary.subTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>{formatCurrency(orderSummary.tax)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{formatCurrency(orderSummary.shippingCost)}</span>
              </div>
              <div className="flex justify-between font-semibold border-t pt-2">
                <span>Total</span>
                <span>{formatCurrency(orderSummary.total)}</span>
              </div>
            </div>
          </div>
          
          {/* Bottom buttons */}
          <div className="pt-6 flex justify-between">
            <Link href="/">
              <Button variant="default">Continue shopping</Button>
            </Link>
            <Link href={`/my-orders/${orderSummary._id}`}>
              <Button variant="default">View Details</Button>
            </Link>
          </div>
        </div>
      </div>
  );
};

export default OrderConfirmationPage;

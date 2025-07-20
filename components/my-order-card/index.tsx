import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Package } from 'lucide-react'
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { formatCurrency } from '@/lib/formatCurrency';
import { capitalize } from '@/lib/utils';
import Link from 'next/link';
import OrderProductSummary from '../order-product-summery.tsx';

interface MyOrderCardProps {
    order: {
      _id: string,
      status: string,
      total: number,
      items: {
          title: string,
          image: string,
          price: number,
          quantity: number
      }[];
      createdAt: string;
      },
}

const MyOrderCard = ({order}: MyOrderCardProps) => {
  return (
    <Card key={order._id}>
        <CardHeader className="flex flex-row items-start justify-between">
        <div className="flex items-center gap-4">
            <div className="p-2 bg-muted rounded-md">
            <Package className="h-6 w-6 text-primary" />
            </div>
            <div>
            <CardTitle className="text-base font-semibold">
                Order #{order._id}
            </CardTitle>
            <p className="text-sm text-muted-foreground">Placed on {new Date(order.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long", // or "short"
              day: "numeric",
            })}</p>
            </div>
        </div>
        <Badge className='p-1'>{capitalize(order.status)}</Badge>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
            {order.items.map((item, i) => (
              <OrderProductSummary key={i} item={item} />
            ))}
        <div className="flex items-center justify-between pt-4 text-sm font-medium text-foreground">
            <span>Total: {formatCurrency(order.total)}</span>
            <Button asChild variant="outline" size="sm">
              <Link href={`/my-orders/${order._id}`}>
                View Details
              </Link>
            </Button>
        </div>
        </CardContent>
    </Card>
  )
}

export default MyOrderCard

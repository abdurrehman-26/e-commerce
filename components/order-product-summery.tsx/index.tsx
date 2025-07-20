import { formatCurrency } from '@/lib/formatCurrency'
import { orderSummaryItem } from '@/types/API-types'
import Image from 'next/image'
import React from 'react'

const OrderProductSummary = ({item}: {item: orderSummaryItem}) => {
  return (
    <div className="flex gap-4 items-start">
        <div className="relative w-20 h-20 rounded-md overflow-hidden border">
        <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
        />
        </div>
        <div className="flex-1">
        <h4 className="font-medium text-sm line-clamp-1">{item.title}</h4>
        <div className="text-sm font-semibold text-muted-foreground">
            Qty: {item.quantity} × {formatCurrency(item.price)}
        </div>
        </div>
        <div className="font-medium text-sm">{formatCurrency(item.quantity * item.price)}</div>
    </div>
  )
}

export default OrderProductSummary

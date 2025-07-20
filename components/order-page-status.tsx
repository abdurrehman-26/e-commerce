"use client"

import React, { JSX, useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"
import { Clock, Loader, Truck, CheckCircle } from "lucide-react"
import API from "@/API"

export type OrderStatus = "pending" | "processing" | "shipped" | "delivered"

// Simulate last updated time (replace with actual timestamp from DB)
const LAST_UPDATED = "June 15, 2025 at 3:45 PM"
const ESTIMATED_DELIVERY = "June 20, 2025"

async function updateOrderStatus(orderNo: string ,orderStatus: OrderStatus) {
  const update = await API.admin.updateOrderStatus(orderNo, orderStatus)
  return update
}

export default function OrderPageStatus({value, orderNo}: {value: OrderStatus, orderNo: string}) {
  const [status, setStatus] = useState<OrderStatus>(value)
  const [loading, setLoading] = useState(false)

  const handleStatusChange = async (newStatus: OrderStatus) => {

    const prevStatus = status
    setStatus(newStatus)
    setLoading(true)

    const res = await updateOrderStatus(orderNo, newStatus)

    if (res.status) {
      toast.success(`Order status updated to ${STATUS_CONFIG[newStatus].label}`)
    } else {
      setStatus(prevStatus)
      toast.error("Failed to update order status.")
    }

    setLoading(false)
  }

  const STATUS_CONFIG: Record<OrderStatus, {
  label: string
  icon: JSX.Element
  }> = {
    pending: {
      label: "Pending",
      icon: <Clock className="w-4 h-4 text-yellow-500" />,
    },
    processing: {
      label: "Processing",
      icon: <Loader className="w-4 h-4 animate-spin text-blue-500" />,
    },
    shipped: {
      label: "Shipped",
      icon: <Truck className="w-4 h-4 text-purple-500" />,
    },
    delivered: {
      label: "Delivered",
      icon: <CheckCircle className="w-4 h-4 text-green-600" />,
    },
  }

  const TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  pending: ["pending", "processing", "shipped", "delivered"],
  processing: ["processing", "shipped", "delivered"],
  shipped: ["shipped", "delivered"],
  delivered: ["delivered"],
  }


  return (
    <div className="p-4 border bg-white max-w-md rounded-lg shadow-sm space-y-3">
      <h2 className="text-lg font-semibold">Order Status</h2>

      <Select
        value={status}
        onValueChange={(val) => handleStatusChange(val as OrderStatus)}
        disabled={status === "delivered" || loading}
      >
        <SelectTrigger className="w-[180px] text-sm">
          <SelectValue placeholder="Select status" />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(STATUS_CONFIG)
            .filter(([key]) => TRANSITIONS[status].includes(key as OrderStatus))
            .map(([key, cfg]) => (
              <SelectItem key={key} value={key}>
                <div className="flex items-center gap-2">
                  {cfg.icon}
                  <span>{cfg.label}</span>
                </div>
              </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="text-xs text-muted-foreground space-y-1">
        <p><span className="font-medium">Last updated:</span> {LAST_UPDATED}</p>
        {status === "shipped" && (
          <p><span className="font-medium">Est. Delivery:</span> {ESTIMATED_DELIVERY}</p>
        )}
      </div>
    </div>
  )
}

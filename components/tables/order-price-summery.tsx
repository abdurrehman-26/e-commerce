"use client"

import React, { useState } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { capitalize, removeUnderScore } from "@/lib/utils"
import { Button } from "../ui/button"
import API from "@/API"
import { toast } from "sonner"
import { formatCurrency } from "@/lib/formatCurrency"

export interface PriceSummaryProps {
  orderNo: string
  subtotal: number
  tax: number
  shippingCost: number
  total: number
  paymentStatus: "paid" | "unpaid"
  paymentMethod: string
  paymentID: string
}

export default function OrderPriceSummary({
  orderNo,
  subtotal,
  tax,
  shippingCost,
  total,
  paymentStatus,
  paymentMethod,
  paymentID
}: PriceSummaryProps) {

  const [status, setStatus] = useState(paymentStatus)
  const [loading, setLoading] = useState(false)
  
  const markOrderAsPaid = async () => {
    const prevStatus = status
    const newStatus = "paid"
    setStatus(newStatus)
    setLoading(true)

    const res = await API.admin.updateOrderPaymentStatus(orderNo, newStatus)

    if (res.status === "success") {
      toast.success(`Order payment status updated to ${newStatus}`)
      setStatus(newStatus)
    } else {
      setStatus(prevStatus)
      toast.error("Failed to update order payment status.")
    }

    setLoading(false)
  }

  return (
    <div className='flex flex-col gap-2 p-2 rounded-lg bg-white shadow-sm'>
      <p className='text-lg font-semibold'>Payment</p>
      <div className="p-4 bg-white rounded-md border @container/main">
      <table className="w-full text-sm text-left">
        <tbody>
          <tr>
            <td className="py-2 font-medium text-gray-700">Subtotal</td>
            <td className="py-2 text-right">{formatCurrency(subtotal)}</td>
          </tr>
          <tr>
            <td className="py-2 font-medium text-gray-700">Tax</td>
            <td className="py-2 text-right">{formatCurrency(tax)}</td>
          </tr>
          <tr>
            <td className="py-2 font-medium text-gray-700">Shipping</td>
            <td className="py-2 text-right">{formatCurrency(shippingCost)}</td>
          </tr>
          <tr>
            <td className="py-2 font-semibold text-gray-900">Total</td>
            <td className="py-2 text-right font-semibold text-gray-900">
              {formatCurrency(total)}
            </td>
          </tr>
        </tbody>
      </table>
      </div>
      <table className="w-full text-sm text-left">
        <tbody>
          <tr>
            <td className="py-2 font-medium text-gray-700">Payment method</td>
            <td className="py-2 text-right">{removeUnderScore(capitalize(paymentMethod))}</td>
          </tr>
          <tr>
            <td className="py-2 font-medium text-gray-700">Payment status</td>
            <td className="py-2 text-right">{capitalize(status)}</td>
          </tr>
          {paymentMethod === 'card' && paymentID && (
            <>
             <td className="py-2 font-medium text-gray-700">Payment ID:</td>
             <td className="py-2 text-right">{paymentID}</td>
            </>
          )}
        </tbody>
      </table>
      {status === "unpaid" && <div className="flex justify-end">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="cursor-pointer">Mark as paid</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will mark this order as paid.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
              <AlertDialogAction className="cursor-pointer" disabled={loading} onClick={markOrderAsPaid}>Mark as paid</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>}
    </div>
  )
}

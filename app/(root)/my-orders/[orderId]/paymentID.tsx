"use client";
import { Clipboard } from "lucide-react";
import { toast } from "sonner";

export function PaymentID({paymentID}: {paymentID: string}) {
  async function copyHandle() {
    await navigator.clipboard.writeText(paymentID);
    toast.success("Payment ID copied to clipboard")
  }
  return (
    <div className="flex gap-0.5 items-center cursor-pointer">
			<Clipboard className="bg-foreground-500 size-4" />
			<p className="text-sm font-mono text-foreground-600 truncate max-w-[150px] sm:max-w-none" onClick={copyHandle}>{paymentID}</p>
    </div>
  )
}
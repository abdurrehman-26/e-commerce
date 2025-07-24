"use client"
import React from "react"
import CartItemCard from "./cart-item-card"
import { useAppSelector } from "@/store/hooks"
import { ShoppingCart } from "lucide-react"

function CartItems() {
  const cartItems = useAppSelector((state) => state.cart.items)

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
        <ShoppingCart className="w-10 h-10 mb-4 text-muted" />
        <p className="text-lg font-medium">Your cart is empty</p>
        <p className="text-sm">Add some items to get started!</p>
      </div>
    )
  }

  return (
    <div className="border-t border-foreground/10">
      {cartItems.map((cartItem) => (
        <CartItemCard key={cartItem.productID} cartItem={cartItem} />
      ))}
    </div>
  )
}

export default CartItems

"use client";
import React from 'react'
import CartItemCard from './cart-item-card';
import { useAppSelector } from '@/store/hooks';

function CartItems() {
  const cartItems = useAppSelector(state => state.cart.items)
  return (
    <div className='border-t border-foreground/10'>
      {cartItems.map((cartItem) => {
        return (
            <CartItemCard key={cartItem.productID} cartItem={cartItem} />
        )
      })}
    </div>
  )
}

export default CartItems

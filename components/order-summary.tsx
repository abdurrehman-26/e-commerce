"use client";
import { RootState } from '@/store/store';
import { CartItem } from '@/types/cart';
import React from 'react'
import { useSelector } from 'react-redux';
import { Button } from './ui/button';
import API from '@/API';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/store/hooks';

function OrderSummary() {
  
  const router = useRouter()
  const totalPrice = useSelector((state: RootState) =>
    state.cart.items.reduce((total: number, item: CartItem) => total + item.price * item.quantity, 0)
  );
  const isAuthenticated = useAppSelector(state => state.user.isAuthenticated)

  const CheckOutHandle = async() => {
    if (!isAuthenticated) {
      router.push(`/login`)
    } else {
      const response = await API.createCheckoutSession("cart")
      if (response.status === "success") {
        router.push(`/checkout/${response.session.token}`)
      }
    }
  }

  return (
    <div className='flex flex-col gap-4 border-t pt-4'>
      <div className='flex justify-between'>
        <p className="font-semibold">Subtotal</p>
        <p className="font-semibold">
          {totalPrice.toLocaleString('en-PK', {
            style: 'currency',
            currency: 'PKR'
          })}
        </p>
      </div>
      <Button className='rounded-md cursor-pointer' onClick={CheckOutHandle}>{isAuthenticated ? "Proceed to checkout": "Login to checkout"}</Button>
    </div>
  )
}

export default OrderSummary

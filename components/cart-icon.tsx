"use client";
import React from 'react'
import { Button } from './ui/button'
import { ShoppingCart } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { CartItem } from '@/types/cart';

function CartIcon() {
  const cartCount = useSelector((state: RootState) =>
    state.cart.items.reduce((total: number, item: CartItem) => total + item.quantity, 0)
  );
  return (
    <Button asChild variant="outline">
      <Link className='relative mr-3' href="/cart">
        {cartCount ? <Badge className='-top-3 -right-3 h-6 w-6 rounded-full absolute'>{cartCount}</Badge>: ""}
        <ShoppingCart />
      <span>Cart</span>
      </Link>
    </Button>
  )
}

export default CartIcon

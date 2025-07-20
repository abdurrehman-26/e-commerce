import { CartItem } from '@/types/cart'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { Trash } from 'lucide-react'
import QuantityControl from './quantity-control'
import { addToCart, removeFromCart, updateQuantity } from '@/features/cart/cartSlice'
import { syncCartQuantity, syncRemoveFromCart } from '@/features/cart/cartThunks'
import { toast } from 'sonner'
import { useAppDispatch } from '@/store/hooks'

const CartItemCard = ({cartItem}: {cartItem: CartItem}) => {
  const dispatch = useAppDispatch()

  const increaseCartQuantity = () => {
    if (cartItem.quantity < 20) {
      const oldQty = cartItem.quantity;
      const newQty = oldQty + 1;

      dispatch(updateQuantity({ _id: cartItem.productID, quantity: newQty }));

      dispatch(syncCartQuantity({ _id: cartItem.productID, quantity: newQty }))
        .unwrap()
        .catch(() => {
          dispatch(updateQuantity({ _id: cartItem.productID, quantity: oldQty }));
          toast.error("Failed to update quantity. Please check your connection.");
        });
    }
  };

  const decreaseCartQuantity = () => {
    if (cartItem.quantity > 1) {
      const oldQty = cartItem.quantity;
      const newQty = oldQty - 1;

      dispatch(updateQuantity({ _id: cartItem.productID, quantity: newQty }));

      dispatch(syncCartQuantity({ _id: cartItem.productID, quantity: newQty }))
        .unwrap()
        .catch(() => {
          dispatch(updateQuantity({ _id: cartItem.productID, quantity: oldQty }));
          toast.error("Failed to update quantity. Please check your connection.");
        });
    }
  };

  const cartQuantityChangeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsedQuantity = Number(e.target.value);
    if (!isNaN(parsedQuantity) && parsedQuantity >= 1 && parsedQuantity <= 20) {
      const oldQty = cartItem.quantity;

      dispatch(updateQuantity({ _id: cartItem.productID, quantity: parsedQuantity }));

      dispatch(syncCartQuantity({ _id: cartItem.productID, quantity: parsedQuantity }))
        .unwrap()
        .catch(() => {
          dispatch(updateQuantity({ _id: cartItem.productID, quantity: oldQty }));
          toast.error("Failed to update quantity. Please check your connection.");
        });
    }
  };

  const removeFromCartHandle = () => {
    const oldItem = { ...cartItem };
    dispatch(removeFromCart(cartItem.productID)); // Optimistic

    dispatch(syncRemoveFromCart(cartItem.productID))
      .unwrap()
      .catch(() => {
        if (oldItem) dispatch(addToCart(oldItem)); // Optional: revert
        toast.error("Failed to remove item. Please try again.");
      });
  };

  return (
    <div className='flex p-2 border-b border-foreground/10'>
      <div className='aspect-square flex min-w-23 max-w-23 rounded overflow-hidden'>
        <Image alt={cartItem.title} className='h-full w-full' src={cartItem.image} width={100} height={100}></Image>
      </div>
      <div className='px-2 flex flex-col flex-grow-1'>
        <div className='flex items-center'>
          <div className='flex-grow-1'>
            <Link href={`/product/${cartItem.slug}`} className='line-clamp-2 font-semibold max-sm:text-sm hover:underline underline-offset-2'>
              {cartItem.title}
            </Link>
          </div>
          <Button variant="ghost" className="rounded-full cursor-pointer m-1 size-6" onClick={removeFromCartHandle}>
            <Trash color='red' />
          </Button>
        </div>
        <div className='flex-grow flex flex-col justify-end'>
          <div className="flex justify-between items-baseline">
            <p className='font-semibold sm:text-lg'>
              {Number(cartItem.price || 0).toLocaleString('en-PK', { style: 'currency', currency: 'PKR' })}
            </p>
            <QuantityControl
            QuantityValue={cartItem.quantity} 
            onQuantityChange={cartQuantityChangeHandle}
            increaseQuantityHandle={increaseCartQuantity}
            decreaseQuantityHandle={decreaseCartQuantity} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartItemCard

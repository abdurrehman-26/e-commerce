"use client";
import { Button } from "@/components/ui/button";

import { ProductCarousel } from "@/components/product-carousel";
import API from "@/API";
import { Minus, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Product } from "@/types";
import { addToCart } from "@/features/cart/cartSlice";
import { formatCurrency } from "@/lib/formatCurrency";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProductPageClient({productData}: {productData: Product}) {

  const [productQuantity, setCartQuantity] = useState(1)


  const maxCartQuantity = 20

  const dispatch = useAppDispatch()
  const isAuthenticated = useAppSelector(state => state.user.isAuthenticated)
  const router = useRouter()

  async function addToCartHandle(): Promise<void> {
    if (!productData) {
      return
    }
    const added = await API.addToCart(productData._id, productQuantity)
    if (added.status === "success") {
      toast.success(added.message)
      dispatch(addToCart({
        productID: productData._id,
        title: productData.title,
        price: productData.price,
        quantity: productQuantity,
        image: productData.images[0],
        slug: productData.slug
      }))
    } else if (added.status === "failed") {
      toast.error(added.message)
    }
  }
  
  const increaseCartQuantity = () => {
    if (productQuantity === maxCartQuantity) {
      return
    }
    setCartQuantity((prev) => prev+1)
  }

  const decreaseCartQuantity = () => {
    if (productQuantity === 1) {
      return
    }
    setCartQuantity((prev) => prev-1)
  }

  function onCartQuantityChange(e: React.ChangeEvent<HTMLInputElement>) {
  const value = Number(e.target.value);

  if (value > 20 || value < 1) {
    return;
  }

  setCartQuantity(value);
}
  
  const {title, description, images, price, compare_at_price} = productData

  const BuyNowHandle = async() => {
      if (!isAuthenticated) {
        router.push(`/login`)
      } else {
        const response = await API.createCheckoutSession("buyNow", productData._id, productQuantity)
        if (response.status === "success") {
          router.push(`/checkout/${response.session.token}`)
        }
      }
    }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 w-full">
        <div>
          <ProductCarousel slides={images} />
        </div>
        <div className="text-left px-2 sm:px-10 max-sm:border-t max-sm:mt-3 max-sm:pt-3">
          <div className="flex flex-col gap-2 mb-3">
            <span className="text-xl font-semibold">{title}</span>
          </div>
          <div className="flex gap-2 mb-3 items-baseline">
            <span className="font-semibold text-2xl">{formatCurrency(price)}</span>
            <span className="text-foreground-500 line-through">{formatCurrency(compare_at_price)}</span>
          </div>
          <div className="w-full h-[1px] mb-4 bg-foreground-300" />
          <div className="flex gap-3 my-5 items-center">
            <span className="font-semibold text-xl">Quantity:</span>
            <div className="inline-flex w-fit">
              <Button onClick={decreaseCartQuantity} variant="ghost" className="flex hover:bg-transparent hover:dark:bg-transparent cursor-pointer items-center justify-center p-4">
                <Minus />
              </Button>
              <Input
                className="outline-none w-12 text-center"
                type="text"
                value={productQuantity}
                onChange={onCartQuantityChange}
              />
              <Button onClick={increaseCartQuantity} variant="ghost" className="flex hover:bg-transparent hover:dark:bg-transparent cursor-pointer items-center justify-center p-4">
                <Plus />
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <Button
              variant="outline"
              className="text-center cursor-pointer py-6 text-xl rounded-full font-semibold w-full"
              size="lg"
              onClick={addToCartHandle}
            >
              Add to Cart
            </Button>
            <Button
              className="text-center cursor-pointer  py-6 text-xl rounded-full font-semibold w-full"
              size="lg"
              onClick={BuyNowHandle}
            >
              Buy Now
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full h-[1px] my-4 bg-foreground/20" />
      <div className="p-2 w-full">
        <div className="prose dark:prose-invert w-full max-w-none" dangerouslySetInnerHTML={{ __html: description }}/>
      </div>
    </>
  );
}

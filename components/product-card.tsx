"use client"

import Image from "next/image"
import React from "react"
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card"
import Link from "next/link"
import { Product } from "@/types"
import { formatCurrency } from "@/lib/formatCurrency"

const ProductCard = ({product}: {product: Product}) => {
  
  const {   
  title,
  slug,
  price,
  compare_at_price,
  images,
  } = product

  return (
    <Card className="w-full sm:min-w-48 gap-2 p-1 rounded flex-shrink-0 bg-foreground/5 border border-foreground/10 shadow-none hover:shadow-xs transition-shadow duration-300 group">
      <CardHeader className="p-0 w-full aspect-square overflow-hidden">
          <Link className="p-3 w-full" href={`/product/${slug}`}>
          <Image
            className="bg-background"
            src={images[0]}
            alt="Product Image"
            width={500}
            height={500}
          />
          </Link>
      </CardHeader>

      <CardContent className="px-3 flex-grow-1 pt-0">
        <Link href={`/product/${slug}`} className="text-sm font-medium leading-snug text-foreground line-clamp-2 hover:underline">
          {title}
        </Link>
      </CardContent>

      <CardFooter className="flex flex-col items-start px-3 pt-1 pb-3">
        <div className="flex flex-col items-baseline gap-2 text-sm">
          <span className="font-bold text-lg text-primary">{formatCurrency(price)}</span>
          <span className="line-through font-semibold text-sm text-muted-foreground">{formatCurrency(compare_at_price)}</span>
        </div>
      </CardFooter>
    </Card>
  )
}

export default ProductCard

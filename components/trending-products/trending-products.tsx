"use client"
import React from 'react'
import ProductsDisplay from '../product-display'
import { Product } from '@/types'
import API from '@/API'

interface TrendingProductsProps {
    initialTrendingProducts: Product[]
    initialTrendingPagination?: {
      total: number,
      page: number,
      totalPages: number,
      limit: number
    }
}

export const TrendingProducts = ({initialTrendingProducts, initialTrendingPagination}: TrendingProductsProps) => {
  return (
    <ProductsDisplay title="Trending Products" initialProducts={initialTrendingProducts} loaderFn={API.getProducts} initialPagination={initialTrendingPagination} />
  )
}

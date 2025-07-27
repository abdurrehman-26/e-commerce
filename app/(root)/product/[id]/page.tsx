import React from 'react'
import ProductPageClient from './pageClient'
import API from '@/API'

const ProductPage = async ({params}: {params: Promise<{id: string}>}) => {
	const {id} = await params
  const productData = await API.getProductDetails(id)
  return <ProductPageClient productData={productData.data} />
}

export default ProductPage

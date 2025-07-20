import React from 'react'

const ProductGrid = ({children}: {
    children: React.ReactNode
}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-3 px-3">
      {children}
    </div>
  )
}

export default ProductGrid

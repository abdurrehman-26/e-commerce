// types/cart.ts

export interface CartItem {
  productID: string
  title: string,
  slug: string,
  price: number
  quantity: number
  image: string // Optional, for future use
}

export interface CartState {
  items: CartItem[]
  loading: boolean
  error: string | null
}

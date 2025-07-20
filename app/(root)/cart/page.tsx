import CartItems from "@/components/cart-items";
import OrderSummary from "@/components/order-summary";


export default async function CartPage() {
  return (
      <div className="flex w-full flex-col h-screen justify-between md:flex-row gap-4">
        <div className="flex-3/4 flex-col">
          <h1 className="text-xl font-semibold my-3">Shopping cart</h1>
          <CartItems />
        </div>
        <div className="flex-1/4">
          <h1 className="text-xl font-semibold my-3">Order summary</h1>
          <OrderSummary />
        </div>
      </div>
  );
}

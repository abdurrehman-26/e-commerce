"use client";
import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import CheckoutRadioInput from "../checkout-radio-input";
import CheckoutAddressSelection from "../checkout-address-selection";
import { Address } from "../checkout-address-selection";
import { formatCurrency } from "@/lib/formatCurrency";
import API from "@/API";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Check, LoaderCircle } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { clearCart } from "@/features/cart/cartSlice";

type CheckoutItemProduct = {
  _id: string
  title: string,
  price: number,
  compare_at_price: number,
  image: string,
  slug: string,
}

type CheckoutItem = {
  product: CheckoutItemProduct
  quantity: number,
  price: number
}

export type CheckoutSession = {
    _id: string,
    userId: string,
    token: string,
    items: CheckoutItem[],
    shippingAddress: Address,
    billingAddress: Address,
    subtotal: number,
    tax: number,
    shipping: number,
    total: number
  }

type CheckoutFormProps = {
  session: CheckoutSession;
  addresses: Address[];
};

type CheckoutFormValues = {
  paymentMethod: "card" | "cash_on_delivery",
  checkoutSessionToken: string
}

const CheckoutForm = ({session, addresses}: CheckoutFormProps) => {
  const { register, handleSubmit, formState, watch } = useForm<CheckoutFormValues>({
    defaultValues: {
      paymentMethod: "cash_on_delivery", // default selected radio
      checkoutSessionToken: session.token
    },
  });

  const paymentMethod = watch("paymentMethod");

  useEffect(() => {
    elements?.update({
      amount: Math.round(session.total * 100)
  });
  })

  
  const stripe = useStripe();
  const elements = useElements();

  const router = useRouter()

  const dispatch = useDispatch()

  const [shippingAddress, setShippingAddress] = useState(session.shippingAddress)

  const [billingAddress, setBillingAddress] = useState(session.billingAddress)

  const shippingAddressChangeHandle = async (address: Address) => {
    const previous = shippingAddress;

    // Optimistically update UI
    setShippingAddress(address);

    // Call API
    const res = await API.updateCheckoutSessionAddresses(session.token, {shippingAddressId: address._id});

    // Check response
    if (res.status !== "success") {
      // Rollback on failure
      setShippingAddress(previous);
      toast.error("Failed to update address. Please try again.");
    }
  };

  const billingAddressChangeHandle = async (address: Address) => {
    const previous = billingAddress;

    // Optimistically update UI
    setBillingAddress(address);

    // Call API
    const res = await API.updateCheckoutSessionAddresses(session.token, {billingAddressId: address._id});

    // Check response
    if (res.status !== "success") {
      // Rollback on failure
      setBillingAddress(previous);
      toast.error("Failed to update address. Please try again.");
    }
  };

  const onSubmit = async (data: CheckoutFormValues) => {

    if (formState.isSubmitting || formState.isSubmitted) {
      return
    }
    const orderCreated = await API.createorder(data.checkoutSessionToken, data.paymentMethod)
    if (orderCreated.status !== "success") {
      toast.error("Failed to place order")
    }

    dispatch(clearCart())

    if (data.paymentMethod === "cash_on_delivery") {
      router.push(`/c/${orderCreated.order.confirmationToken}`)
    }
    if (data.paymentMethod === "card") {

      // return if stripe is not ready
      if (!stripe || !elements) {
        toast.error("Stripe not ready");
        return;
      }

      const {clientSecret} = await API.createPaymentIntent(orderCreated.order._id)

      await elements.submit()

      const {error} = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}/c/${orderCreated.order.confirmationToken}`,
          payment_method_data: {
            billing_details: {
              name: billingAddress.fullName,
              address: {
                line1: billingAddress.addressLine1,
                line2: billingAddress.addressLine2,
                city: billingAddress.city,
                country: billingAddress.country.code,
                postal_code: billingAddress.postalCode,
              }
            },
          }
        },
      });

      if (error) {
        toast.error(error.message)
      }

    }
  }
  return (
      <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col justify-between md:flex-row gap-4">
        <div className="flex-3/4 flex-col">
          <h1 className="text-xl font-semibold my-3">Checkout</h1>

          <div className="space-y-6 mb-6">

            {/* shippingAddress selector */}
              <CheckoutAddressSelection
                addresses={addresses}
                addressFieldName="Shipping Address"
                value={shippingAddress}
                onChange={shippingAddressChangeHandle}
              />

            {/* Payment Method (COD) */}
            <div>
              <p className="font-semibold mb-2">Payment Method</p>
              <div className="space-y-3">
                <CheckoutRadioInput
                label="Cash on delivery"
                selected={paymentMethod === "cash_on_delivery"}
                value="cash_on_delivery"
                {...register("paymentMethod", { required: true })} />
                <CheckoutRadioInput
                label="Debit - Credit card"
                selected={paymentMethod === "card"}
                value="card"
                {...register("paymentMethod", { required: true })} />
              </div>
            </div>

            {/* billingAddress selector */}
            {paymentMethod === "card" && (
              <>
                <PaymentElement />
                <CheckoutAddressSelection
                  addresses={addresses}
                  addressFieldName="Billing Address"
                  value={billingAddress}
                  onChange={billingAddressChangeHandle}
                />
              </>
            )}

          </div>
        </div>
        
        {/* RIGHT: Order Summary */}
        <div className="w-full md:w-1/3 flex flex-col gap-3">
          <h2 className="text-xl font-semibold my-3">Order Summary</h2>
          <div className="space-y-3">
              <div className="flex justify-between">
                <span className="font-semibold">Subtotal</span>
                <span>{formatCurrency(session.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Shipping</span>
                <span>{formatCurrency(session.shipping)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Tax</span>
                <span>{formatCurrency(session.tax)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Total</span>
                <span>{formatCurrency(session.total)}</span>
              </div>
          </div>
          {/* Submit */}
          <Button
            type="submit"
          > 
            {formState.isSubmitting ? <LoaderCircle className="animate-spin" />: formState.isSubmitted ? <Check /> : null}
            {formState.isSubmitting ? "Processing" : paymentMethod === "cash_on_delivery" ? formState.isSubmitted ? "Order placed" : "Place Order" : formState.isSubmitted ? "Payment confirmed": "Confirm payment"}
          </Button>
        </div>
      </form>
  )
}

export default CheckoutForm

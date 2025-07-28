"use client";
import { useForm } from "react-hook-form";
import React, { createContext, useState } from "react";
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
import { AddressDialog } from "../address-dialog";
import { upsertAddressList } from "@/lib/utils";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

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
  initialAddresses: Address[];
};

type CheckoutFormValues = {
  paymentMethod: "card" | "cash_on_delivery",
  checkoutSessionToken: string
}

export const AddressContext = createContext<{setAddressDialogOpen: React.Dispatch<React.SetStateAction<boolean>>} | undefined>(undefined);

const CheckoutForm = ({session, initialAddresses}: CheckoutFormProps) => {
  const { register, handleSubmit, formState, watch } = useForm<CheckoutFormValues>({
    defaultValues: {
      paymentMethod: "cash_on_delivery", // default selected radio
      checkoutSessionToken: session.token
    },
  });

  const paymentMethod = watch("paymentMethod");

  const stripe = useStripe();
  const elements = useElements();

  const router = useRouter()

  const dispatch = useDispatch()

  const [addresses, setAddresses] = useState<Address[] | []>(initialAddresses || [])

  const [shippingAddress, setShippingAddress] = useState<Address | null>(session.shippingAddress || null)

  const [billingAddress, setBillingAddress] = useState<Address | null>(session.billingAddress || null)

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

    if (useSameAddress) {
      await billingAddressChangeHandle(address)
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

  const updateAddressesState = async (newAddress: Address) => {
    if (addresses.length === 0) {
      shippingAddressChangeHandle(newAddress)
      billingAddressChangeHandle(newAddress)
    }
    setAddresses(prev => upsertAddressList(prev, newAddress));
  };

  const onSubmit = async (data: CheckoutFormValues) => {

    if (formState.isSubmitting || formState.isSubmitted || !shippingAddress || !billingAddress) {
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

  const [useSameAddress, setUseSameAddress] = useState<boolean>(
    shippingAddress && billingAddress
      ? shippingAddress._id === billingAddress._id
      : true
  );


  const [addressDialogOpen, setAddressDialogOpen] = useState<boolean>(false)

  return (
    <AddressContext.Provider value={{setAddressDialogOpen}}>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col md:flex-row gap-6">
        {/* LEFT SIDE - Main checkout form */}
        <div className="w-full md:flex-1 space-y-6">
          <h2 className="text-2xl font-bold">Checkout</h2>

          {/* SHIPPING ADDRESS */}
          <div className="p-4 rounded-xl border bg-muted/50 space-y-2">
            <p className="font-semibold">Shipping address</p>
            {addresses.length === 0 ? (
              <div className="p-4 rounded-md border border-dashed text-center space-y-2">
                <p className="text-sm text-muted-foreground">You have no saved addresses.</p>
                  <Button type="button" size="sm" variant="outline" onClick={() => setAddressDialogOpen(true)}>
                    + Add Address
                  </Button>
              </div>
            ) : shippingAddress ? (
              <CheckoutAddressSelection
                addresses={addresses}
                selectedAddress={shippingAddress}
                onSelect={shippingAddressChangeHandle}
              />
            ) : null}
          </div>

          {/* PAYMENT METHOD */}
          <div className="p-4 rounded-xl border bg-muted/50 space-y-4">
            <h2 className="font-semibold text-lg">Payment Method</h2>
            <div className="space-y-3">
              <CheckoutRadioInput
                label="Cash on Delivery"
                selected={paymentMethod === "cash_on_delivery"}
                value="cash_on_delivery"
                {...register("paymentMethod", { required: true })}
              />
              <CheckoutRadioInput
                label="Debit / Credit Card"
                selected={paymentMethod === "card"}
                value="card"
                {...register("paymentMethod", { required: true })}
              />
            </div>
          </div>

          {/* BILLING ADDRESS + STRIPE */}
          {paymentMethod === "card" && (
            <div className="p-4 rounded-xl border bg-muted/50 space-y-4">
              <h2 className="font-semibold text-lg">Billing Details</h2>
              <PaymentElement />
              <p className="font-semibold">Billing address</p>
              {addresses.length === 0 ? (
                <div className="flex items-center gap-3">
                  <Checkbox id="same" checked disabled />
                  <Label htmlFor="same">Same as Shipping address</Label>
                </div>
              ) : (
                <>
                <div className="flex items-center gap-3">
                  <Checkbox
                    id="same"
                    checked={useSameAddress}
                    disabled={addresses.length <= 1}
                    onCheckedChange={(checked) => {
                      if (checked && shippingAddress) {
                        setBillingAddress(shippingAddress);
                        API.updateCheckoutSessionAddresses(session.token, { billingAddressId: shippingAddress._id });
                      }
                      setUseSameAddress(!!checked);
                    }}
                  />
                  <Label htmlFor="same">Same as Shipping address</Label>
                </div>
                {!useSameAddress && billingAddress && <CheckoutAddressSelection
                  addresses={addresses}
                  selectedAddress={billingAddress}
                  onSelect={billingAddressChangeHandle}
                />}
                </>
              )}
            </div>
          )}
        </div>

        {/* RIGHT SIDE - Summary */}
        <div className="w-full md:w-[350px] flex flex-col gap-6">
          <h2 className="text-2xl font-bold">Order Summary</h2>
          <div className="rounded-xl border p-4 bg-muted/50 space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="font-medium">Subtotal</span>
              <span>{formatCurrency(session.subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Shipping</span>
              <span>{formatCurrency(session.shipping)}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Tax</span>
              <span>{formatCurrency(session.tax)}</span>
            </div>
            <div className="border-t pt-2 flex justify-between text-base font-semibold">
              <span>Total</span>
              <span>{formatCurrency(session.total)}</span>
            </div>
          </div>

          <Button type="submit" className="w-full mt-2" size="lg" disabled={formState.isSubmitting}>
            {formState.isSubmitting ? (
              <>
                <LoaderCircle className="animate-spin mr-2 h-4 w-4" />
                Processing
              </>
            ) : formState.isSubmitted ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                {paymentMethod === "cash_on_delivery" ? "Order Placed" : "Payment Confirmed"}
              </>
            ) : (
              <>
                {paymentMethod === "cash_on_delivery" ? "Place Order" : "Confirm Payment"}
              </>
            )}
          </Button>
        </div>
      </form>
      {/* Add/Edit Dialog */}
      <AddressDialog
        open={addressDialogOpen}
        onOpenChange={setAddressDialogOpen}
        onSubmit={updateAddressesState}
      />
    </AddressContext.Provider>
  )
}

export default CheckoutForm

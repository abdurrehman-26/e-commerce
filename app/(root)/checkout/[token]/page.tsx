import API from "@/API"
import CheckoutForm from "@/components/checkout-form";
import StripeWrapper from "@/components/stripe-wrapper/stripe-wrapper";
import { cookies } from "next/headers"

interface CheckoutPageParams {
  token: string;
}

export default async function CheckoutPage({params}: { params: Promise<CheckoutPageParams> }) {
    const userCookies = await cookies()
    const {token} = await params
    const checkoutSession = await API.getCheckoutSession(token, userCookies)
    const addresses = await API.getUserAddresses(userCookies)
    return (
      <StripeWrapper >
        <CheckoutForm session={checkoutSession.session} initialAddresses={addresses.addresses} />
      </StripeWrapper>
    )
}
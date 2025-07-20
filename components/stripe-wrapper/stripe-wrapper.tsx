"use client";
import { stripePromise } from '@/utils/stripe';
import { Elements } from '@stripe/react-stripe-js';
import { StripeElementsOptions } from '@stripe/stripe-js';
import React from 'react'


type StripeWrapperProps = {
  children: React.ReactNode;
};

const StripeWrapper = ({children}: StripeWrapperProps) => {
  const stripeOptions: StripeElementsOptions ={
    mode: "payment",
    amount: 15000,
    currency: "pkr",
    appearance: {
      theme: "stripe"
    },
  }

  return (
    <Elements stripe={stripePromise} options={stripeOptions}>
      {children}
    </Elements>
  )
}

export default StripeWrapper

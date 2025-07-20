"use client"
import React from 'react'
import { AddressSelectorDialog } from '../address-selector-dialog';

export type Address = {
  _id: string;
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  postalCode: string;
  country: {
    name: string,
    code: string
  };
  phone: string
};

type CheckoutAddressSelectionProps = {
  addresses: Address[],
  addressFieldName: string,
  value?: Address; // currently selected address
  onChange?: (val: Address) => void;
}

const CheckoutAddressSelection = ({
  addresses,
  addressFieldName,
  value,
  onChange
}: CheckoutAddressSelectionProps) => {
  const selectedAddress = value ?? addresses[0];
  return (
    <div>
      <p className="text-lg font-semibold mb-1">{addressFieldName}</p>
      <div className="border rounded-md p-4 bg-white">
          <div className="flex justify-between items-start">
          <div>
              <p className="font-semibold">{selectedAddress.fullName}</p>
              <p>{selectedAddress.addressLine1}</p>
              {selectedAddress.addressLine2 && <p>{selectedAddress.addressLine2}</p>}
              <p>
              {selectedAddress.city}, {selectedAddress.postalCode}, {selectedAddress.country.name}
              </p>
          </div>
          <AddressSelectorDialog
          addresses={addresses}
          onSelect={(newAddress) => {
            if (onChange) onChange(newAddress);
          }}
          currentAddressId={selectedAddress._id}
          />
          </div>
      </div>
    </div>
  )
}

export default CheckoutAddressSelection

"use client"
import React from 'react'
import { AddressSelectorDialog } from '../address-selector-dialog';

export type Address = {
  addressName: string;
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
  isDefault?: boolean
};

type CheckoutAddressSelectionProps = {
  addresses: Address[];
  selectedAddress: Address;
  onSelect: (address: Address) => void;
};

const CheckoutAddressSelection = ({
  addresses,
  selectedAddress,
  onSelect
}: CheckoutAddressSelectionProps) => {

  return (
    <div className="border rounded-md p-4 bg-white">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-muted-foreground mb-1">
            {selectedAddress.addressName}
          </p>
          <p className="font-medium">{selectedAddress.fullName}</p>
          <p>{selectedAddress.addressLine1}</p>
          {selectedAddress.addressLine2 && (
            <p>{selectedAddress.addressLine2}</p>
          )}
          <p>
            {selectedAddress.city}, {selectedAddress.postalCode},{" "}
            {selectedAddress.country.name}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            {selectedAddress.phone}
          </p>
        </div>

        <AddressSelectorDialog
          addresses={addresses}
          currentAddressId={selectedAddress._id}
          onSelect={(newAddress) => {
            onSelect(newAddress);
          }}
        />
      </div>
    </div>
  );
}

export default CheckoutAddressSelection

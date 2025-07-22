import React from 'react'
import { Address } from '../checkout-address-selection'
import { Home, MapPin } from 'lucide-react';

interface MyOrderDetailsAddressProps {
  address: Address,
  title: string
}

const MyOrderDetailsAddress = ({address, title}: MyOrderDetailsAddressProps) => {
  return (
    <div className="flex flex-col gap-2">
      <h4 className="font-semibold text-base mb-2 text-foreground-800 flex items-center gap-2">
        {title === "Shipping address" ? <MapPin className="h-5 w-5 text-indigo-600" /> : <Home className="h-5 w-5 text-green-600" />}
        {title}
      </h4>
      <p className="text-foreground-700 text-sm">{address.fullName}</p>
      <p className="text-foreground-700 text-sm">{address.addressLine1}</p>
      {address.addressLine2 && <p className="text-foreground-700 text-sm">{address.addressLine2}</p>}
      <p className="text-foreground-600 text-sm">{address.city}, {address.postalCode}</p>
      <p className="text-foreground-600 text-sm">{address.country.name}</p>
      {address.phone && <p className="text-foreground-600 text-sm">Phone: {address.phone}</p>}
    </div>
  );
}

export default MyOrderDetailsAddress

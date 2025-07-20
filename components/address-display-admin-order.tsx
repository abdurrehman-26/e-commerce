import { Address } from "./checkout-address-selection"

interface AddressDisplayAdminOrder {
    addressTitle: string,
    address: Address
}

export default function AddressDisplayAdminOrder({addressTitle, address}: AddressDisplayAdminOrder) {
    return (
        <div>
            <p className='font-semibold mb-1'>{addressTitle}</p>
            <p className='text-sm'>{address.fullName}</p>
            <p className='text-sm'>Flat D-10</p>
            <p className='text-sm'>{address.addressLine1}</p>
            {address.addressLine2 && <p className='text-sm'>{address.addressLine2}</p>}
            <p className='text-sm'>{address.city}</p>
            <p className='text-sm'>{address.postalCode}</p>
            <p className='text-sm'>{address.country.name}</p>
            <p className='text-sm'>{address.phone}</p>
          </div>
    )
}
'use client'

import { Controller, useForm } from 'react-hook-form'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useEffect, useMemo } from 'react'
import API from '@/API'
import { toast } from 'sonner'
import { Address } from '../checkout-address-selection'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { countries } from '@/lib/countries'

export type AddressFormValues = {
  _id: string
  addressName: string
  fullName: string
  addressLine1: string
  addressLine2?: string
  city: string
  country: {
    name: string
    code: string
  }
  postalCode: string
  phone: string
}

type AddressDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialAddress?: AddressFormValues | null
  onSubmit: (data: Address) => void
}

const EMPTY_ADDRESS: AddressFormValues = {
  _id: '',
  addressName: '',
  fullName: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  postalCode: '',
  phone: '',
  country: { name: '', code: '' },
}

export const AddressDialog = ({
  open,
  onOpenChange,
  initialAddress,
  onSubmit,
}: AddressDialogProps) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<AddressFormValues>({
    defaultValues: EMPTY_ADDRESS
  })

  useEffect(() => {
    if (initialAddress) {
      reset(initialAddress)
    } else {
      reset(EMPTY_ADDRESS)
    }
  }, [initialAddress, reset, open])

  const submit = async (data: AddressFormValues) => {
    if (!initialAddress) {
      const addAddress = await API.AddAddress({address: data})
      if (addAddress.status === "success") {
        toast.success("Address added successfully.")
        onSubmit(addAddress.addedAddress)
      } else {
        toast.error("failed to add address.")
      }
    } else {
      const updateAddress = await API.updateAddress({addressID: data._id, address: data})
      if (updateAddress.status === "success") {
        toast.success("Address updated successfully.")
        onSubmit(updateAddress.updatedAddress)
      } else {
        toast.error("failed to update address.")
      }
    }
    onOpenChange(false)
    reset()
  }

  const countryOptions = useMemo(() => countries.map(c => ({
    label: c.name,
    value: c.code,
  })), [])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>{initialAddress ? 'Edit Address' : 'Add New Address'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(submit)} className="flex flex-col flex-1 overflow-hidden">
          <div className="overflow-y-auto p-2 space-y-4 flex-1">
            <div className="space-y-2">
              <Label>Address Name</Label>
              <Input {...register('addressName', { required: 'Required' })} placeholder="e.g. Home" />
              {errors.addressName && <p className="text-sm text-red-600">{errors.addressName.message}</p>}
            </div>

            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input {...register('fullName', { required: 'Required' })} placeholder="John Doe" />
              {errors.fullName && <p className="text-sm text-red-600">{errors.fullName.message}</p>}
            </div>

            <div className="space-y-2">
              <Label>Address Line 1</Label>
              <Input {...register('addressLine1', { required: 'Required' })} placeholder="123 Main St" />
              {errors.addressLine1 && <p className="text-sm text-red-600">{errors.addressLine1.message}</p>}
            </div>

            <div className="space-y-2">
              <Label>Address Line 2</Label>
              <Input {...register('addressLine2')} placeholder="Apartment, suite, etc. (optional)" />
              {errors.addressLine2 && <p className="text-sm text-red-600">{errors.addressLine2.message}</p>}
            </div>

            <div className="space-y-2">
              <Label>Postal Code</Label>
              <Input {...register('postalCode', { required: 'Required' })} placeholder="e.g. 12345" />
              {errors.postalCode && <p className="text-sm text-red-600">{errors.postalCode.message}</p>}
            </div>

            <div className="space-y-2">
              <Label>City</Label>
              <Input {...register('city', { required: 'Required' })} placeholder="e.g. Karachi" />
              {errors.city && <p className="text-sm text-red-600">{errors.city.message}</p>}
            </div>

            <div className="space-y-2">
              <Controller
              name="country"
              control={control}
              rules={{ required: 'Required' }}
              render={({ field }) => (
                <div className="space-y-2">
                  <Label>Country</Label>
                  <Select
                    value={field.value?.code}
                    onValueChange={(val) => {
                      const selected = countries.find(c => c.code === val)
                      field.onChange(selected ? { name: selected.name, code: selected.code } : { name: '', code: '' })
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a country" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup className="max-h-60 overflow-y-auto">
                                {countryOptions.map((country) => (
                                  <SelectItem key={country.value} value={country.value}>
                                    {country.label}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          {errors.country?.code && <p className="text-sm text-red-600">{errors.country.code.message}</p>}
                        </div>
                      )}
                    />
              {errors.country?.name && <p className="text-sm text-red-600">{errors.country.name.message}</p>}
            </div>

            <div className="space-y-2">
              <Label>Phone</Label>
              <Input {...register('phone', { required: 'Required' })} placeholder="+92 300 1234567" />
              {errors.phone && <p className="text-sm text-red-600">{errors.phone.message}</p>}
            </div>
          </div>

          <DialogFooter className='pt-4'>
            <Button type="submit">
              {initialAddress ? 'Update' : 'Save'}
            </Button>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

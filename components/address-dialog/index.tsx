'use client'

import { useForm } from 'react-hook-form'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { useEffect } from 'react'

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
  isDefault?: boolean
}

type AddressDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialAddress?: AddressFormValues | null
  onSubmit: (data: AddressFormValues) => void
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
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<AddressFormValues>({
    defaultValues: {
      _id: '',
      addressName: '',
      fullName: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      country: {
        name: '',
        code: ''
      },
      postalCode: '',
      phone: '',
      isDefault: false,
    },
  })

  useEffect(() => {
    if (initialAddress) {
      reset(initialAddress)
    } else {
      reset({
        _id: '',
        addressName: '',
        fullName: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        country: {
          name: '',
          code: ''
        },
        postalCode: '',
        phone: '',
        isDefault: false,
      })
    }
  }, [initialAddress, reset, open])

  const submit = (data: AddressFormValues) => {
    onSubmit(data)
    onOpenChange(false)
    reset()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>{initialAddress ? 'Edit Address' : 'Add New Address'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(submit)} id="address-form" className="flex flex-col flex-1 overflow-hidden">
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
              <Label>Country</Label>
              <Input {...register('country.name', { required: 'Required' })} placeholder="e.g. Pakistan" />
              {errors.country?.name && <p className="text-sm text-red-600">{errors.country.name.message}</p>}
            </div>

            <div className="space-y-2">
              <Label>Phone</Label>
              <Input {...register('phone', { required: 'Required' })} placeholder="+92 300 1234567" />
              {errors.phone && <p className="text-sm text-red-600">{errors.phone.message}</p>}
            </div>

            <div className="flex items-center space-x-2 pt-2">
              <Checkbox
                id="isDefault"
                checked={watch('isDefault')}
                onCheckedChange={checked => setValue('isDefault', !!checked)}
                disabled={initialAddress?.isDefault}
              />
              <Label htmlFor="isDefault">Set as default address</Label>
            </div>
          </div>

          <DialogFooter className='pt-4'>
            <Button type="submit" form="address-form">
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

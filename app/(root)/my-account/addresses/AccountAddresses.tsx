'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { AddressDialog } from '@/components/address-dialog'
import { Address } from '@/components/checkout-address-selection'
import {
  MapPin,
  User,
  Phone,
  Home,
  Trash2,
  Pencil,
  CheckCircle,
  Plus,
} from 'lucide-react'
import API from '@/API'
import { toast } from 'sonner'

interface AccountAddressesProps {
  initialAddresses: Address[]
}

const AccountAddresses = ({ initialAddresses }: AccountAddressesProps) => {
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses)
  const [addressDialogOpen, setAddressDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const openAddDialog = () => {
    setSelectedAddress(null)
    setAddressDialogOpen(true)
  }

  const openEditDialog = (address: Address) => {
    const addr = addresses.find(a => a._id === address._id)
    if (addr) {
      setSelectedAddress(address)
      setAddressDialogOpen(true)
    }
  }

  const confirmDelete = (id: string) => {
    setDeleteId(id)
    setDeleteDialogOpen(true)
  }

  const handleDelete = async () => {
    if (deleteId) {
      const deleteRes = await API.deleteAddress({addressID: deleteId})
      if (deleteRes.status === "success") {
        setAddresses(prev => prev.filter(addr => addr._id !== deleteId))
        toast.success("Address deleted successfully")
      } else {
        toast.error("Failed to delete address")
      }
    }
    setDeleteId(null)
    setDeleteDialogOpen(false)
  }

  const submitAddress = (data: Address) => {
    setAddresses(prev => {
      const exists = prev.find(addr => addr._id === data._id);

      if (exists) {
        // Updating existing
        if (data.isDefault) {
          return prev.map(addr =>
            addr._id === data._id
              ? data
              : { ...addr, isDefault: false }
          );
        }
        return prev.map(addr => (addr._id === data._id ? data : addr));
      } else {
        // Adding new
        if (data.isDefault) {
          return [data, ...prev.map(addr => ({ ...addr, isDefault: false }))];
        }
        return [data, ...prev];
      }
    });

    setSelectedAddress(null);
  };

  const setAsDefault = async (addressID: string) => {
    const res = await API.setDefaultAddress({ addressID });
    if (res.status === "success") {
      setAddresses(prev =>
        prev.map(addr => ({
          ...addr,
          isDefault: addr._id === addressID
        }))
      );
      toast.success("Default address updated");
    } else {
      toast.error(res.message || "Failed to update default address");
    }
  };



  return (
    <div className="w-full max-w-3xl py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Your Addresses</h1>
        <Button onClick={openAddDialog}><Plus />Add New Address</Button>
      </div>

      {addresses?.length === 0 ? (
        <p className="text-muted-foreground">No addresses found.</p>
      ) : (
        <div className="space-y-4">
          {addresses?.map(addr => (
            <Card key={addr._id} className="border shadow-sm p-4">
              <CardHeader className="p-0 space-y-4">
                <div className="flex justify-between items-start">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Home className="w-4 h-4 text-primary" />
                      <span className="font-medium text-lg">{addr.addressName}</span>
                      {addr.isDefault && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full flex items-center gap-1 ml-2">
                          <CheckCircle className="w-3 h-3" />
                          Default
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span>{addr.fullName}</span>
                    </div>

                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground mt-1 flex-shrink-0" />
                      <div>
                        <p>{addr.addressLine1}, {addr.addressLine2}</p>
                        <p>{addr.city}, {addr.postalCode}, {addr.country.name}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span>{addr.phone}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-1">
                    {!addr.isDefault && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setAsDefault(addr._id)}
                        className="flex items-center gap-1 cursor-pointer text-green-600 hover:bg-green-50"
                      >
                        <CheckCircle className="w-4 h-4" /> Set as Default
                      </Button>
                    )}

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditDialog(addr)}
                      className="flex items-center gap-1 cursor-pointer"
                    >
                      <Pencil className="w-4 h-4" /> Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => confirmDelete(addr._id)}
                      className="flex items-center gap-1 cursor-pointer"
                      disabled={addr.isDefault}
                    >
                      <Trash2 className="w-4 h-4" /> Delete
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}

      {/* Add/Edit Dialog */}
      <AddressDialog
        open={addressDialogOpen}
        onOpenChange={setAddressDialogOpen}
        initialAddress={selectedAddress}
        onSubmit={submitAddress}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Address</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete this address?</p>
          <DialogFooter>
            <Button className='cursor-pointer' variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button className='cursor-pointer' variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AccountAddresses

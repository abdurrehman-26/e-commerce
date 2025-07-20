"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { cn } from "@/lib/utils"; // for conditional classes
import { Address } from "../checkout-address-selection";

type AddressSelectorDialogProps = {
  addresses: Address[];
  currentAddressId: string;
  onSelect: (address: Address) => void;
};

export function AddressSelectorDialog({
  addresses,
  currentAddressId,
  onSelect,
}: AddressSelectorDialogProps) {
  const [selectedId, setSelectedId] = useState(currentAddressId);

  const selectedAddress = addresses.find((a) => a._id === selectedId)!;

  return (
    <Dialog>
      <div>
        <DialogTrigger asChild>
          <Button variant="link" className="underline">
            Change
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Select Address</DialogTitle>
            <DialogDescription>
              Choose one of your saved addresses for this order.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {addresses.map((address) => (
              <button
                key={address._id}
                type="button"
                onClick={() => setSelectedId(address._id)}
                className={cn(
                  "w-full text-left border rounded-md p-4 transition-all",
                  address._id === selectedId
                    ? "border-primary bg-muted"
                    : "border-border hover:bg-muted/50"
                )}
              >
                <p className="font-medium">{address.fullName}</p>
                <p>{address.addressLine1}</p>
                {address.addressLine2 && <p>{address.addressLine2}</p>}
                <p>
                  {address.city}, {address.postalCode}, {address.country.name}
                </p>
              </button>
            ))}
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                type="button"
                onClick={() => onSelect(selectedAddress)}
              >
                Select
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </div>
    </Dialog>
  );
}

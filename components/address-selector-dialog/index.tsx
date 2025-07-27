import { MapPin, Plus} from "lucide-react";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { useContext, useState } from "react";
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
import { Button } from "@/components/ui/button";
import { Address } from "../checkout-address-selection";
import { AddressContext } from "../checkout-form";

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
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const context = useContext(AddressContext)

  return (
    <>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <div>
          <DialogTrigger asChild>
            <Button variant="link" className="underline cursor-pointer px-0">
              Change
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-2xl max-h-[90svh]">
            <DialogHeader>
              <DialogTitle>Select Address</DialogTitle>
              <DialogDescription>
                Choose one of your saved addresses for this order.
              </DialogDescription>
            </DialogHeader>

            <div className="max-h-[60vh] overflow-y-auto space-y-4 py-4 px-1">
              <Button variant="secondary" className="w-full cursor-pointer" onClick={() => context?.setAddressDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add New Address
              </Button>

              {addresses.map((address) => {
                const isSelected = address._id === selectedId;

                return (
                  <div
                    key={address._id}
                    onClick={() => setSelectedId(address._id)}
                    className={cn(
                      "relative w-full text-left border rounded-xl p-4 shadow-sm transition-colors duration-150 flex gap-4 items-start group cursor-pointer",
                      isSelected && "border-primary"
                    )}
                  >
                    <MapPin className="mt-1 w-5 h-5 text-muted-foreground shrink-0" />

                    <div className="flex flex-col gap-2 w-full">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex gap-2 items-center">
                          <p className="font-semibold text-base">
                            {address.addressName}
                          </p>
                          {address.isDefault && (
                            <Badge className="bg-primary/10 text-primary text-xs font-medium">
                              Default
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="space-y-1 text-sm text-muted-foreground">
                        <p className="text-sm font-medium text-foreground">
                          {address.fullName}
                        </p>
                        <p>{address.addressLine1}</p>
                        {address.addressLine2 && <p>{address.addressLine2}</p>}
                        <p>
                          {address.city}, {address.postalCode},{" "}
                          {address.country.name}
                        </p>
                        <p>📞 {address.phone}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <DialogFooter className="pt-4">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button
                onClick={() => {
                  const address = addresses.find(
                    (address) => address._id === selectedId
                  );
                  if (address) {
                    onSelect(address);
                    setDialogOpen(false);
                  }
                }}
              >
                Select
              </Button>
            </DialogFooter>
          </DialogContent>
        </div>
      </Dialog>
    </>
  );
}

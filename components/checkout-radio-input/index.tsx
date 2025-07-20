import React from 'react'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { cn } from "@/lib/utils";

type CheckoutRadioInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  selected: boolean;
};

const CheckoutRadioInput = ({
  selected,
  label,
  ...props
  }: CheckoutRadioInputProps) => {
  return (
    <Label className={cn('flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-all',
      selected
      ? "border-primary bg-muted shadow-sm"
      : "border-border hover:border-muted"
    )}>
      <div>
        <Input type='radio' {...props} checked={selected} />
      </div>
      <span>{label}</span>
    </Label>
  )
}

export default CheckoutRadioInput

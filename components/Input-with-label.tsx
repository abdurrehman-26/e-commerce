import { Input } from "./ui/input"
import { Label } from "./ui/label"
import type { InputHTMLAttributes } from "react"

interface InputWithLabelProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
}

export const InputWithLabel = ({ label, ...props }: InputWithLabelProps) => {
  return (
    <div>
      <Label className="mb-2 ml-1" htmlFor={label}>{label}</Label>
      <Input id={label} {...props} />
    </div>
  )
}

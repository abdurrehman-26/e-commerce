import React from 'react'
import { Button } from './ui/button'
import { Minus, Plus } from 'lucide-react'

interface QuantityControlProps {
  decreaseQuantityHandle: () => void,
  QuantityValue: number,
  onQuantityChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  increaseQuantityHandle: () => void
}

function QuantityControl({
  decreaseQuantityHandle,
  QuantityValue,
  onQuantityChange,
  increaseQuantityHandle
}: QuantityControlProps ) {
  return (
    <div className="flex">
      <Button size="icon" onClick={decreaseQuantityHandle} variant="ghost" className="flex hover:bg-transparent hover:dark:bg-transparent cursor-pointer items-center justify-center size-6">
        <Minus />
      </Button>
      <input
        className="outline-none max-sm:text-xs w-8 text-center"
        type="text"
        value={QuantityValue}
        onChange={onQuantityChange}
      />
      <Button size="icon" onClick={increaseQuantityHandle} variant="ghost" className="flex hover:bg-transparent hover:dark:bg-transparent cursor-pointer items-center justify-center size-6">
        <Plus />
      </Button>
    </div>
  )
}

export default QuantityControl

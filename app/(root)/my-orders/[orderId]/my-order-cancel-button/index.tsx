"use client"
import { Button } from '@/components/ui/button'
import React from 'react'

const MyOrderCancelButton = () => {
  return (
    <Button className="cursor-pointer" variant="destructive" size="sm" onClick={() => console.log("cancelling order...")}>Cancel order</Button>
  )
}

export default MyOrderCancelButton

'use client'

import * as React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"

interface NameFormValues {
  newName: string
}

const ChangeNameDialog = ({initialName, children, onSubmit, open, onOpenChange }: {initialName?: string, children: React.ReactNode, onSubmit: (data: NameFormValues) => void, open: boolean, onOpenChange: (state: boolean) => void }) => {
  const {register, handleSubmit, formState} = useForm<NameFormValues>({
    defaultValues: {
      newName: initialName
    },
  })
  const handleFormSubmit = (data: NameFormValues) => {
    onSubmit(data)
    onOpenChange(false)
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Change Name</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="newName">Name</Label>
            <Input id="newName" placeholder="Enter your full name" {...register('newName', { required: 'Required' })} />
            {formState.errors.newName && <p className="text-sm text-red-600">{formState.errors.newName.message}</p>}
          </div>
          <Button type="submit" className="mt-2 w-full">
            Update Name
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default ChangeNameDialog

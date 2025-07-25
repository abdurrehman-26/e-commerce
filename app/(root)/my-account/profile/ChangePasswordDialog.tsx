'use client'

import * as React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import API from "@/API"
import { toast } from "sonner"

interface PasswordFormValues {
  oldPassword: string
  newPassword: string,
  confirmNewPassword: string
}

const ChangePasswordDialog = ({ children, open, setOpen  }: { children: React.ReactNode, open: boolean, setOpen: (state: boolean) => void  }) => {
  const {register, handleSubmit, formState, watch, reset} = useForm<PasswordFormValues>()
  const password = watch("newPassword")
  const submitPasswordFrom = async (data: PasswordFormValues) => {
    const passwordChangeRes = await API.updatePassword({oldPassword: data.oldPassword, newPassword: data.newPassword})
    if (passwordChangeRes.status === "success") {
      toast.success(passwordChangeRes.message)
      setOpen(false)
    } else {
      toast.error(passwordChangeRes.message)
    }
  }
  React.useEffect(() => {
    reset({
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: ""
    })
  }, [open, reset])
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(submitPasswordFrom)} className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input id="currentPassword" type="password" {...register('oldPassword', { required: 'Required' })} />
            {formState.errors.oldPassword && <p className="text-sm text-red-600">{formState.errors.oldPassword.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input id="newPassword" type="password" {...register('newPassword', { required: 'Required' })} />
            {formState.errors.newPassword && <p className="text-sm text-red-600">{formState.errors.newPassword.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input id="confirmPassword" type="password" {...register('confirmNewPassword', { required: 'Required', validate: (value) => value === password || "Password do not match"})} />
            {formState.errors.confirmNewPassword && <p className="text-sm text-red-600">{formState.errors.confirmNewPassword.message}</p>}
          </div>
          <Button type="submit" className="mt-2 w-full" disabled={!formState.isValid}>
            Update Password
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default ChangePasswordDialog

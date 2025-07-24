'use client'

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Pencil, KeyRound } from "lucide-react"
import ChangePasswordDialog from "./ChangePasswordDialog"
import ChangeNameDialog from "./ChangeNameDialog"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { setName } from "@/features/user/userSlice"
import API from "@/API"
import { toast } from "sonner"

const ProfilePage = () => {
  const name = useAppSelector(state => state.user.data?.name)
  const dispatch = useAppDispatch()
  async function UpdateNameHandle({newName}:{newName: string}) {
    const updateNameRes = await API.updateName(newName) 
    if (updateNameRes.status === "success") {
      dispatch(setName({newName}))
      toast.success("Name updated successfully.")
    } else {
      toast.error("Failed to update name.")
    }
  }
  const [changeNameDialogState, setChangeNameDialogState] = useState<boolean>(false)
  return (
    <div className="w-full max-w-3xl mx-auto py-10 px-4 space-y-8">
      {/* Page Heading */}
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Profile Info</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Manage your account details and credentials
        </p>
      </div>

      {/* Change Name */}
      <Card className="border border-muted shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle className="text-lg font-semibold">Name</CardTitle>
            <p className="text-sm text-muted-foreground">This is the name associated with your account.</p>
          </div>
          <ChangeNameDialog initialName={name} onSubmit={UpdateNameHandle} open={changeNameDialogState} onOpenChange={setChangeNameDialogState}>
            <Button variant="outline" size="sm">
              <Pencil className="w-4 h-4 mr-1" />
              Edit
            </Button>
          </ChangeNameDialog>
        </CardHeader>
        <CardContent>
          <p className="text-base text-gray-800 font-medium">{name}</p>
        </CardContent>
      </Card>

      {/* Change Password */}
      <Card className="border border-muted shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle className="text-lg font-semibold">Password</CardTitle>
            <p className="text-sm text-muted-foreground">You can update your login password here.</p>
          </div>
          <ChangePasswordDialog>
            <Button variant="outline" size="sm">
              <KeyRound className="w-4 h-4 mr-1" />
              Change
            </Button>
          </ChangePasswordDialog>
        </CardHeader>
        <CardContent>
          <p className="text-base text-gray-800 font-medium">••••••••••</p>
        </CardContent>
      </Card>
    </div>
  )
}

export default ProfilePage

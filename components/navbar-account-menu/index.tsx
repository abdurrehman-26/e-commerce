"use client";
import React, { useState } from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { CircleUserRound, LayoutDashboard, LogOut, Package2, User } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../ui/alert-dialog';
import API from '@/API';
import { clearUser } from '@/features/user/userSlice';
import { clearCart } from '@/features/cart/cartSlice';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

function NavbarAccountMenu() {
  const isLoggedIn = useAppSelector(state => state.user.isAuthenticated)
  const isAdmin = useAppSelector(state => state.user.data?.isAdmin)
  const userData = useAppSelector(state => state.user.data)

  const [dialogState, setDialogState] = useState<boolean>(false)

  const user_links =[
    {
      icon: User,
      title: "My account",
      link: "/my-account"
    },
    {
      icon: Package2,
      title: "My orders",
      link: "/my-orders"
    },
  ]

  const router = useRouter()

  const dispatch = useAppDispatch()

  if (!isLoggedIn) {
    return (
    <Button asChild variant="outline" size="sm">
        <Link href="/login">Login</Link>
    </Button>
  )
  }

  const handleLogout = async () => {
    const res = await API.logout()
    if (res.status) {
      toast.success("You logged out successfully.")
      dispatch(clearUser())
      dispatch(clearCart())
      router.push("/")
    }
  }

  return (
    <>
      <DropdownMenu>
          <div>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className='rounded-full p-1 has-[>svg]:p-1 h-fit cursor-pointer'>
                <CircleUserRound className='size-6' />
              </Button>
            </DropdownMenuTrigger>
          </div>
          <DropdownMenuContent className='mt-1 min-w-[200px] mr-4 rounded-sm'>
            <DropdownMenuLabel>
              <p>My Account</p>
              <p>Signed in as {userData?.email}</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {isAdmin && (
              <>
                <DropdownMenuItem asChild>
                  <Link href="/admin">
                    <LayoutDashboard />
                    Admin Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </>
            )}
            {user_links.map((user_link) => (
              <DropdownMenuItem key={user_link.title} className='cursor-pointer p-2 text-md' asChild>
                <Link href={user_link.link}>
                  <user_link.icon />
                  {user_link.title}
                </Link>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className='cursor-pointer p-2 text-md' variant='destructive' onClick={() => setDialogState(true)}>
                <LogOut />
                Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={dialogState} onOpenChange={(o) => setDialogState(o)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will logout your account on this device.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button asChild variant="destructive" onClick={handleLogout}>
              <AlertDialogAction>
                  Continue
              </AlertDialogAction>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default NavbarAccountMenu

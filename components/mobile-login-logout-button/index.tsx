"use client";
import { RootState } from '@/store/store'
import React from 'react'
import { useSelector } from 'react-redux'
import { Button } from '../ui/button'
import Link from 'next/link'

function MobileLoginLogoutButton() {
    const isLoggedIn = useSelector<RootState>(state => state.user.isAuthenticated)

    if (isLoggedIn) {
        return (
          <Button variant="destructive" asChild>
            <Link href="/login">Logout</Link>
          </Button>
        )
    }
  return (
    <Button asChild>
      <Link href="/login">Login</Link>
    </Button>
  )
}

export default MobileLoginLogoutButton

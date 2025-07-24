import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const BlockUnauthUser = () => {
  return (
    <div className="text-center p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-red-600">Unauthorized</h1>
      <p className="mt-2 text-gray-600">
        You do not have permission to access this page.
      </p>
      <p className="mt-2 text-gray-600">Login to continue.</p>

      <div className="mt-2">
        <Link href="/login">
          <Button variant="default" className="px-6 cursor-pointer">
            Go to Login
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default BlockUnauthUser

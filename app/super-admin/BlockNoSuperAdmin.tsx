import React from 'react'

const BlockNoSuperAdmin = () => {
  return (
    <div className="text-center p-6">
      <h1 className="text-2xl font-bold text-red-600">Unauthorized</h1>
      <p className="mt-2 text-gray-600">
        You do not have permission to access this page.
      </p>
      <p className="mt-2 text-gray-600">
        Login with a super admin account to access.
      </p>
    </div>
  )
}

export default BlockNoSuperAdmin

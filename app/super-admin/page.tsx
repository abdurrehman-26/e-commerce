import React from 'react'
import SuperAdminClient from './pageClient'
import API from '@/API'
import { cookies } from 'next/headers'
import BlockNoSuperAdmin from './BlockNoSuperAdmin'

const SuperAdminPage = async () => {
  const userCookies = await cookies()
  const user = await API.getuser(userCookies)
  if (!user.user?.isSuperAdmin) {
    return <BlockNoSuperAdmin />
  }
  const usersData = await API.admin.getUsersList({userCookies})
  return <SuperAdminClient usersData={usersData.data}  />
}

export default SuperAdminPage

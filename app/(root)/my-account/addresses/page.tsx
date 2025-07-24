import React from 'react'
import AccountAddresses from './AccountAddresses'
import API from '@/API'
import { cookies } from 'next/headers'

const AddressesPage = async () => {
  const userCookies = await cookies()
  const AddressesData = await API.getUserAddresses(userCookies)
  return <AccountAddresses initialAddresses={AddressesData.addresses} />
}

export default AddressesPage

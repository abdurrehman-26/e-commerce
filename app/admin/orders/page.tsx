import API from '@/API'
import { OrderTable } from '@/components/OrderTable/order-table'
import { TableOrder } from '@/types'
import { cookies } from 'next/headers'
import React from 'react'

async function getData(): Promise<TableOrder[]> {
  const userCookies = await cookies()
  const orders = await API.admin.getAllTableOrders(userCookies)
  return orders.data
}

export default async function Page() {
    const data = await getData()
  return (
    <div className="container mx-auto px-3 py-10">
        <OrderTable data={data} />
    </div>
  )
}

"use client"

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  createColumnHelper,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import React, { useMemo } from "react"
import Image from "next/image"
import { formatCurrency } from "@/lib/formatCurrency"

export interface OrderPageProduct {
    product: {
        image: string,
        title: string
    },
    quantity: number
    price: number,
    total: number
}

export function OrderPageProductTable({
  data,
}: {data: OrderPageProduct[]}) {

  const columnHelper = createColumnHelper<OrderPageProduct>()

  const columns = useMemo(() => [
  columnHelper.accessor("product", {
    header: "Product",
    cell: (info) => {
      const { image, title } = info.getValue()
      return (
        <div className="flex items-center gap-4">
          <Image
            src={image}
            alt="Product"
            width={40}
            height={40}
            className="h-10 w-10 object-cover rounded"
          />
          <div className="max-w-[200px] truncate">{title}</div>
        </div>
      )
    },
    enableSorting: false,
    enableHiding: false,
  }),
  columnHelper.accessor("price", {
    header: "Price",
    cell: (info) => formatCurrency(info.getValue()),
  }),
  columnHelper.accessor("quantity", {
    header: "Qty",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("total", {
    header: "Total",
    cell: (info) => formatCurrency(info.getValue()),
  }),
], [columnHelper])


  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  })

  return (
    <div>
        <div className="rounded-md border @container/main">
            <Table>
                <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                        return (
                        <TableHead key={header.id}>
                            {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                                )}
                        </TableHead>
                        )
                    })}
                    </TableRow>
                ))}
                </TableHeader>
                <TableBody>
                {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                    <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                    >
                        {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                        ))}
                    </TableRow>
                    ))
                ) : (
                    <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                        No results.
                    </TableCell>
                    </TableRow>
                )}
                </TableBody>
            </Table>
        </div>
    </div>
  )
}
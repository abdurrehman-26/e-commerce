"use client"

import {
  flexRender,
  SortingState,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  getFilteredRowModel,
  ColumnFiltersState,
  VisibilityState,
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
import React from "react"
import { Input } from "@/components/ui/input"
import { TableOrder } from "@/types"
import { Checkbox } from "../ui/checkbox"
import Link from "next/link"
import { Badge } from "../ui/badge"
import { capitalize, statusColors } from "@/lib/utils"
import { formatDate } from "@/lib/formatDate"
import { formatCurrency } from "@/lib/formatCurrency"
import { TablePagination } from "../table-pagination"
import { TableViewOptions } from "../table-view-option"
import { TableColumnHeader } from "../table-column-header"
import { useRouter } from "next/navigation"

export function OrderTable({
  data,
}: {data: TableOrder[]}) {

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const columnHelper = createColumnHelper<TableOrder>()

  const columns = React.useMemo(() =>{
    return [
  columnHelper.display({
    id: "select",
    header: ({ table }) => (
      <div className="w-12">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="w-12">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
    }
  ),
  columnHelper.accessor("order_No", {
  header: ({ column }) => (
        <TableColumnHeader column={column} title="Order No" />
      ),
  filterFn: (row, columnId, filterValue) => {
    const value = row.getValue<string>(columnId);
    return value?.toString().includes(filterValue?.toString());
  },
  cell: (info) => (
    <Link href={`/admin/order/${info.getValue()}`} className="font-semibold hover:underline">
      #{info.getValue()}
    </Link>
  ),
  },),
  columnHelper.accessor("user_Details", {
    header: ({ column }) => ( // <-- Use the DataTableColumnHeader here
        <TableColumnHeader column={column} title="Customer" />
      ),
    cell: (info) => (
      <div>
        <div className="font-medium">{info.getValue()?.name}</div>
        <div className="text-sm text-gray-500">{info.getValue()?.email}</div>
      </div>
    ),
  },),
  columnHelper.accessor("payment_Method", {
    header: ({ column }) => ( // <-- Use the DataTableColumnHeader here
        <TableColumnHeader column={column} title="Payment Method" />
      ),
    cell: (info) => {
      const payment_method = info.getValue()
      return ( 
        <span>{capitalize(payment_method.replace(/_/g, " "))}</span>
      )
    },
  },),
  columnHelper.accessor("payment_Status", {
    header: ({ column }) => ( // <-- Use the DataTableColumnHeader here
        <TableColumnHeader column={column} title="Payment Status" />
      ),
    cell: (info) => {
      const status = info.getValue();
      return (
        <Badge className={`rounded-full px-2 py-1 text-xs font-medium ${statusColors[status] || ""}`}>
          {capitalize(status.replace("_", " "))}
        </Badge>
      );
    },
  },),
  columnHelper.accessor("status", {
    header: ({ column }) => ( // <-- Use the DataTableColumnHeader here
        <TableColumnHeader column={column} title="Order Status" />
      ),
    cell: (info) => {
      const status = info.getValue();
      return (
        <Badge className={`rounded-full px-2 py-1 text-xs font-medium ${statusColors[status] || ""}`}>
          {capitalize(status.replace("_", " "))}
        </Badge>
      );
    },
  }),
  columnHelper.accessor("total", {
    header: ({ column }) => ( // <-- Use the DataTableColumnHeader here
        <TableColumnHeader column={column} title="Total" />
      ),
    cell: (info) => `${formatCurrency(info.getValue())}`,
  }),
  columnHelper.accessor("created_At", {
    header: ({ column }) => ( // <-- Use the DataTableColumnHeader here
        <TableColumnHeader column={column} title="Date" />
      ),
    cell: (info) => formatDate(info.getValue()),
  })
  ]
  },[columnHelper])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection
    },
  })

  const router = useRouter()

  return (
    <div>
        <div className="flex items-center py-4 gap-2">
        <Input
          placeholder="Filter by Order No..."
          value={(table.getColumn("order_No")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("order_No")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <TableViewOptions table={table} />
        </div>
        <div className="@container/main rounded-md border">
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
                    className="cursor-pointer"
                     onClick={(e) => {
                        // Check if the click came from an input or button (like a checkbox)
                        const target = e.target as HTMLElement
                        if (
                          target.closest("input") || 
                          target.closest("button") || 
                          target.closest("label")
                        ) {
                          return // Do not navigate
                        }

                        router.push(`order/${row.original.order_No}`)
                      }}
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
        <TablePagination table={table} />
    </div>
  )
}
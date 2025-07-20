import API from "@/API"
import { ProductTable } from "@/components/ProductTable/product-table"
import { TableProduct } from "@/types"
import { Plus } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

async function getData(): Promise<TableProduct[]> {
  const products = await API.admin.getAllTableProducts()
  return products.data
}

export default async function Page() {
  const data = await getData()
  return (
    <div className="container mx-auto px-3 py-10">
      <div className="flex mb-2">
        <Button
          asChild
          className="ml-auto"
        >
          <Link href= "products/new"><Plus /> Add Product</Link>
        </Button>
      </div>
      <ProductTable data={data} />
    </div>
  )
}
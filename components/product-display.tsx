"use client";
import { useState } from "react";
import ProductCard from "./product-card";
import ProductGrid from "./product-grid";
import { Product } from "@/types";
import { Button } from "./ui/button";
import DotLoader from "./dot-loader";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

interface LoaderFnArgs {
  page?: number; // or string if your app handles it as string
  userCookies?: ReadonlyRequestCookies;
}

interface LoaderFnResult {
  status: string;
  data: Product[];
  pagination: {
    total: number,
    page: number,
    totalPages: number,
    limit: number
  }
}

export interface ProductDisplayProps {
  initialProducts: Product[];
  initialPagination?: {
    total: number,
    page: number,
    totalPages: number,
    limit: number
  }
  title?: string;
  loaderFn?: (args?: LoaderFnArgs) => Promise<LoaderFnResult>;
}

export default function ProductsDisplay({
  initialProducts,
  title,
  loaderFn,
  initialPagination,
}: ProductDisplayProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(2); // page 1 is already fetched
  const [isLastPage, setIsLastPage] = useState(initialPagination?.page === initialPagination?.totalPages)

  async function handleLoadMore() {
    setLoadingMore(true);
    if (!loaderFn || isLastPage) return;
    const res = await loaderFn({page}); // adjust as needed
    setProducts(prev => [...prev, ...res.data]);
    setPage(prev => prev + 1);
    if (res.status === "success" && res.pagination) {
      const isLast = res.pagination.page === res.pagination.totalPages;
      setIsLastPage(isLast);
    }
    setLoadingMore(false);
  }

  return (
    <section className="py-2 w-full">
      {title && <div className="mb-5 px-3">
        <span className="text-foreground sm:text-xl md:text-2xl font-semibold">
          {title}
        </span>
      </div>}
      <ProductGrid>
        {products.map((product, index) => (
          <ProductCard product={product} key={index} />
        ))}
      </ProductGrid>

      {loaderFn && !isLastPage && <div className="flex justify-center py-2">
        {!loadingMore ? (
          <Button
            className="font-semibold rounded-full cursor-pointer"
            variant="outline"
            onClick={handleLoadMore}
            disabled={loadingMore || isLastPage}
          >
            Load more
          </Button>
        ) : (
          <DotLoader message="Fetching products..." />
        )}
      </div>}
    </section>
  );
}

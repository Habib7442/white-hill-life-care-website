import { ProductCard } from "@/components/product-card"
import type { Product } from "@/lib/products"
import { cn } from "cn"

/** The medicines card grid: 1 column, 2 from 640 px, 3 from 1024 px. */
export function ProductGrid({ products, className }: { products: Product[]; className?: string }) {
  return (
    <ul className={cn("grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8", className)}>
      {products.map((product) => (
        <li key={product._id}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  )
}

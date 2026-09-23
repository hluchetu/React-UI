import { useEffect, useState } from "react";
import { ProductCard } from "./components/ProductCard";
import { PaginationControls } from "./components/PaginationControls";
import "./ProductPagination.css";

type Product = {
  id: number;
  title: string;
  thumbnail: string;
};

const PAGE_SIZE = 10;
const PRODUCTS_URL = "https://dummyjson.com/products?limit=0";

export function ProductPagination() {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    async function loadProducts() {
      try {
        const response = await fetch(PRODUCTS_URL);
        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }
        const data: unknown = await response.json();
        if (
          typeof data !== "object" || data === null ||
          !("products" in data) || !Array.isArray(data.products) ||
          !data.products.every((product: unknown) =>
            typeof product === "object" && product !== null &&
            "id" in product && typeof product.id === "number" &&
            "title" in product && typeof product.title === "string" &&
            "thumbnail" in product && typeof product.thumbnail === "string"
          )
        ) {
          throw new Error("The API returned invalid product data.");
        }
        if (!ignore) setProducts(data.products);
      } catch (error) {
        if (!ignore) {
          setError(error instanceof Error ? error.message : "Unable to load products.");
        }
      } finally {
        if (!ignore) setIsLoading(false);
      }
    }

    void loadProducts();
    return () => {
      ignore = true;
    };
  }, []);

  const totalPages = Math.ceil(products.length / PAGE_SIZE);
  const start = currentPage * PAGE_SIZE;
  const visibleProducts = products.slice(start, start + PAGE_SIZE);

  const handlePageChange = (page: number) => {
    if (!Number.isInteger(page) || page < 0 || page >= totalPages) return;
    setCurrentPage(page);
  };

  return (
    <main className="product-pagination">
      <h1>Product Pagination</h1>
      <p className="pagination-intro">Browse products, ten at a time.</p>
      {isLoading ? (
        <p role="status">Loading products…</p>
      ) : error ? (
        <p className="pagination-error" role="alert">{error}</p>
      ) : products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <>
          <p className="pagination-summary" role="status">
            Showing {start + 1}–{start + visibleProducts.length} of {products.length} products.
            {" "}Page {currentPage + 1} of {totalPages}.
          </p>
          <ul className="products-grid">
            {visibleProducts.map((product) => (
              <li key={product.id}>
                <ProductCard title={product.title} thumbnail={product.thumbnail} />
              </li>
            ))}
          </ul>
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </main>
  );
}

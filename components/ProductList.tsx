"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const DEFAULT_PAGE_SIZE = 12;
const SMALL_SCREEN_PAGE_SIZE = 6;
const SMALL_SCREEN_BREAKPOINT = 760;

type Product = {
  _id: string;
  title: string;
  price: string;
  coverImage: string;
  images?: string[];
  alt?: string;
  description?: string;
  category?: string;
  quantity?: number;
};

export default function ProductList() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(DEFAULT_PAGE_SIZE);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async (pageNumber: number, limit: number = pageSize) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`/api/products?page=${pageNumber}&limit=${limit}`);
      if (!res.ok) throw new Error("Failed to load products");
      const data = await res.json();
      setProducts(data.products);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error(err);
      setError((err as any)?.message ?? String(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  useEffect(() => {
    const setSize = () => {
      const isSmall = window.innerWidth <= SMALL_SCREEN_BREAKPOINT;
      setPageSize(isSmall ? SMALL_SCREEN_PAGE_SIZE : DEFAULT_PAGE_SIZE);
    };

    setSize();
    const onResize = () => {
      const isSmall = window.innerWidth <= SMALL_SCREEN_BREAKPOINT;
      const newSize = isSmall ? SMALL_SCREEN_PAGE_SIZE : DEFAULT_PAGE_SIZE;
      setPageSize((current) => {
        if (current === newSize) return current;
        setPage(1);
        fetchProducts(1, newSize);
        return newSize;
      });
    };

    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handlePage = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
  };

  return (
    <section id="products" className="section products-section py-28" ref={sectionRef}>
      <div className="text-center mb-16">
        <p className="text-[#839958] tracking-[5px] text-sm mb-5">Curated collection</p>
        <h2 className="text-4xl">All Products</h2>
        <p className="max-w-2xl mx-auto mt-4">Browse our full range of premium gifts with thoughtful curation and top-rated selections.</p>
        {/* <div className="mt-4">
          <button onClick={() => setTopRated((v) => !v)} className={`px-4 py-2 rounded ${topRated ? 'bg-[#839958] text-white' : 'bg-[#F7F4D5] text-[#0A3323]'}`}>
            {topRated ? 'Showing Top Rated' : 'Show Top Rated'}
          </button>
        </div> */}
      </div>

      {loading && (
        <div className="px-8 md:px-20">
          <div className="mb-6 flex items-center justify-between">
            <div className="h-3 w-24 rounded-full bg-[#E8E2C8]" />
            <div className="h-3 w-16 rounded-full bg-[#E8E2C8]" />
          </div>

          <div className="grid gap-10 md:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="animate-pulse rounded-[25px] bg-[#F7F4D5] p-6 shadow-md">
                <div className="mb-6 h-[260px] rounded-[18px] bg-[#E8E2C8]" />
                <div className="mb-3 h-6 w-3/4 rounded-full bg-[#E8E2C8]" />
                <div className="mb-2 h-3 rounded-full bg-[#E8E2C8]" />
                <div className="mb-2 h-3 w-5/6 rounded-full bg-[#E8E2C8]" />
                <div className="h-3 w-2/3 rounded-full bg-[#E8E2C8]" />
              </div>
            ))}
          </div>
        </div>
      )}

      {error && (
        <div className="loader-shell" style={{ color: "var(--rosy-brown)" }}>
          <p>Error: {error}</p>
        </div>
      )}

      {!loading && !error && products.length === 0 && (
        <div className="mx-auto max-w-md rounded-[24px] border border-[#E8E2C8] bg-[#F7F4D5] px-8 py-12 text-center text-[#0A3323] shadow-sm">
          <p className="text-lg font-medium">No products available right now.</p>
          <p className="mt-2 text-sm text-[#5f6c41]">Please check back soon for fresh collections.</p>
        </div>
      )}

      {!loading && !error && products.length > 0 && (
        <>
          <div className="grid md:grid-cols-3 gap-10 px-8 md:px-20">
            {products.map((product, idx) => (
              <Link key={product._id} href={`/products/${product._id}`} className="block">
                <article className="flex h-full flex-col bg-[#F7F4D5] text-[#0A3323] rounded-[25px] p-6 shadow-md hover:shadow-lg transition">
                  <div className="h-[260px] mb-6 bg-[#839958] rounded-[18px] overflow-hidden relative">
                    <Image src={product.coverImage} alt={product.alt ?? product.title} fill sizes="(max-width: 680px) 100vw, 33vw" className="object-cover" />
                  </div>
                  <div className="mb-6 flex-1">
                    <h3 className="text-2xl mb-2">{product.title}</h3>
                    <p className="text-sm">{product.description?.slice(0, 120)}{(product.description?.length ?? 0) > 120 ? '...' : ''}</p>
                  </div>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-xl">{product.price}</span>
                    <span className="text-sm">Qty: {product.quantity ?? 0}</span>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          <div className="pagination-bar text-center mt-12">
            <button onClick={() => handlePage(page - 1)} className="mr-4 px-4 py-2 rounded bg-[#F7F4D5]" disabled={page <= 1}>Previous</button>
            <span className="mx-2">Page {page} of {totalPages}</span>
            <button onClick={() => handlePage(page + 1)} className="ml-4 px-4 py-2 rounded bg-[#F7F4D5]" disabled={page >= totalPages}>Next</button>
          </div>
        </>
      )}
    </section>
  );
}

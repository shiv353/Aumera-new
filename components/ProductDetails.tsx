"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

type ProductType = {
  _id?: string;
  title?: string;
  price?: string;
  coverImage?: string;
  images?: string[];
  alt?: string;
  description?: string;
  category?: string;
  quantity?: number;
  contains?: string;
};

export default function ProductDetails({ product }: { product: ProductType }) {
  const images: string[] = product.images && product.images.length ? product.images : [product.coverImage || ""];
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const thumbListRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const containsItems = (product.contains ?? "")
    .split(";")
    .map((item) => item.trim())
    .filter(Boolean);

  useEffect(() => {
    if (activeIndex >= images.length) setActiveIndex(0);
  }, [images.length, activeIndex]);

  const showImage = (index: number) => {
    if (index === activeIndex || isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIndex(index);
      setIsTransitioning(false);
    }, 180);
  };

  const handlePrevious = () => setActiveIndex((i) => (i - 1 + images.length) % images.length);
  const handleNext = () => setActiveIndex((i) => (i + 1) % images.length);
  const orderMessage = `Hi! I would like to order ${product.title ?? "this product"}.`;
  const whatsappUrl = `https://wa.me/917016731747?text=${encodeURIComponent(orderMessage)}`;

  return (
    <section className="section product-detail-section px-8 py-20 md:px-20">
      <div className="mb-6 flex items-center justify-between gap-4">
        <button onClick={() => router.back()} className="text-sm text-[#0A3323] underline underline-offset-4">
          ← Back
        </button>
      </div>

      <div className="grid items-start gap-10 md:grid-cols-2">
        <div>
          <div className="mb-6 overflow-hidden rounded-[20px] border border-[#0A3323]/10 bg-[#F7F4D5] p-3">
            <Image
              src={images[activeIndex]}
              alt={product.alt ?? product.title ?? "product image"}
              width={900}
              height={700}
              className="h-auto w-full rounded-[16px] object-cover"
            />
          </div>

          <div className="flex gap-3 overflow-x-auto" ref={thumbListRef}>
            {images.map((img: string, i: number) => (
              <button
                key={i}
                onClick={() => showImage(i)}
                className={`flex-none overflow-hidden rounded-[14px] border ${i === activeIndex ? "border-[#839958] ring-1 ring-[#839958]/20" : "border-[#0A3323]/10"}`}
              >
                <Image src={img} alt={`${product.title ?? ""} ${i + 1}`} width={80} height={80} className="h-[80px] w-[80px] object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-3 text-sm tracking-[4px] text-[#839958]">Product details</p>
          <h1 className="mb-4 text-3xl text-[#0A3323]">{product.title}</h1>

          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span className="text-2xl font-medium text-[#0A3323]">{product.price}</span>
            <span className="text-sm text-[#5f6c41]">Qty: {product.quantity ?? 0}</span>
          </div>

          <p className="mb-6 text-[#0A3323]/80">
            Category: <span className="font-semibold text-[#0A3323]">{product.category}</span>
          </p>

          <div className="prose max-w-none">
            <h3 className="text-lg font-semibold text-[#0A3323]">Description</h3>
            <p className="leading-7 text-[#0A3323]/80">{product.description || "No description available."}</p>
          </div>

          {containsItems.length > 0 ? (
            <div className="mt-8">
              <h3 className="mb-3 text-lg font-semibold text-[#0A3323]">Contains</h3>
              <ul className="space-y-3 text-sm text-[#0A3323]">
                {containsItems.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#839958]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center rounded-full bg-[#0A3323] px-4 py-2 text-sm font-medium text-[#F7F4D5] transition hover:bg-[#1a4f32]"
          >
            Order Now
          </a>
        </div>
      </div>
    </section>
  );
}

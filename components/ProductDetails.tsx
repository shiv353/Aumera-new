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
  rating?: number;
};

export default function ProductDetails({ product }: { product: ProductType }) {
  const images: string[] = product.images && product.images.length ? product.images : [product.coverImage || ""];
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const thumbListRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

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

  return (
    <section className="section product-detail-section py-20 px-8 md:px-20">
      <div className="product-detail-header mb-6">
        <button onClick={() => router.back()} className="text-sm underline mb-2">← Back</button>
      </div>

      <div className="grid md:grid-cols-2 gap-10 items-start">
        <div>
          <div className={`mb-6 rounded-lg overflow-hidden`}>
            <Image src={images[activeIndex]} alt={product.alt ?? product.title ?? "product image"} width={900} height={700} className="object-cover w-full h-auto" />
          </div>

          <div className="flex gap-3 overflow-x-auto" ref={thumbListRef}>
            {images.map((img: string, i: number) => (
              <button key={i} onClick={() => showImage(i)} className={`flex-none border ${i === activeIndex ? 'ring-2 ring-[#839958]' : ''} rounded`}>
                <Image src={img} alt={`${product.title ?? ''} ${i + 1}`} width={80} height={80} className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[#839958] tracking-[5px] text-sm mb-3">Product details</p>
          <h1 className="text-3xl mb-4">{product.title}</h1>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-2xl font-medium">{product.price}</span>
            <span className="text-sm">{(product.rating ?? 0).toFixed(1)}★</span>
          </div>
          <p className="mb-6">Category: <strong>{product.category}</strong></p>
          <div className="prose max-w-none">
            <h3>Description</h3>
            <p>{product.description || 'No description available.'}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

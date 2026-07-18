"use client";

import { Fragment, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Check, Edit3, Plus, Search, Trash2, X } from "lucide-react";

type Product = {
  _id: string;
  title: string;
  price: string;
  coverImage: string;
  images?: string[];
  alt: string;
  description: string;
  category: string;
  rating: number;
};

type ProductDraft = {
  title: string;
  price: string;
  coverImage: string;
  images: string;
  alt: string;
  description: string;
  category: string;
  rating: number | string;
};

const emptyDraft: ProductDraft = {
  title: "",
  price: "",
  coverImage: "",
  images: "",
  alt: "",
  description: "",
  category: "",
  rating: 4.5,
};

export default function AdminDashboardPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [addDraft, setAddDraft] = useState<ProductDraft>(emptyDraft);
  const [addError, setAddError] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<ProductDraft>(emptyDraft);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [creatingProduct, setCreatingProduct] = useState(false);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [searchTerm]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await fetch("/api/products?limit=100");
      if (!response.ok) throw new Error("Failed to load products");
      const data = await response.json();
      setProducts(Array.isArray(data.products) ? data.products : []);
    } catch (err) {
      setError((err as Error).message || "Unable to load products.");
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return products;
    return products.filter((product) => {
      const text = [
        product.title,
        product.price,
        product.category,
        product.alt,
        product.description,
        ...(product.images || []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return text.includes(query);
    });
  }, [products, searchTerm]);

  const totalPages = Math.max(Math.ceil(filteredProducts.length / itemsPerPage), 1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const openAddModal = () => {
    setAddDraft(emptyDraft);
    setAddError("");
    setIsAddOpen(true);
  };

  const closeAddModal = () => {
    setIsAddOpen(false);
    setAddError("");
    setAddDraft(emptyDraft);
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const startEdit = (product: Product) => {
    setEditingId(product._id);
    setDraft({
      title: product.title,
      price: product.price,
      coverImage: product.coverImage,
      images: (product.images || []).join(", "),
      alt: product.alt,
      description: product.description,
      category: product.category,
      rating: product.rating,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setDraft(emptyDraft);
  };

  const updateDraft = (field: keyof ProductDraft, value: string | number) => {
    setDraft((current) => ({ ...current, [field]: value }));
  };

  const updateAddDraft = (field: keyof ProductDraft, value: string | number) => {
    setAddDraft((current) => ({ ...current, [field]: value }));
  };

  const validateDraft = (candidate: ProductDraft) => {
    const errors: string[] = [];
    if (!candidate.title.trim()) errors.push("Title is required.");
    if (!candidate.price.trim()) errors.push("Price is required.");
    if (!candidate.coverImage.trim()) errors.push("Cover image is required.");
    if (!candidate.alt.trim()) errors.push("Alt text is required.");
    if (!candidate.category.trim()) errors.push("Category is required.");
    if (!candidate.description.trim()) errors.push("Description is required.");
    if (!candidate.images.trim()) errors.push("At least one image is required.");
    return errors;
  };

  const saveProduct = async (productId: string) => {
    if (!draft) return;

    const errors = validateDraft(draft);
    if (errors.length) {
      setError(errors.join(" "));
      return;
    }

    try {
      setSavingId(productId);
      setError("");
      const response = await fetch(`/api/products/${productId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...draft,
          images: draft.images
            .toString()
            .split(",")
            .map((value) => value.trim())
            .filter(Boolean),
        }),
      });

      if (!response.ok) throw new Error("Failed to save product.");
      const updated = await response.json();
      setProducts((current) => current.map((item) => (item._id === productId ? updated : item)));
      cancelEdit();
    } catch (err) {
      setError((err as Error).message || "Unable to save product.");
    } finally {
      setSavingId(null);
    }
  };

  const deleteProduct = async (productId: string) => {
    if (!window.confirm("Delete this product permanently?")) return;
    try {
      setError("");
      const response = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete product.");
      setProducts((current) => current.filter((item) => item._id !== productId));
    } catch (err) {
      setError((err as Error).message || "Unable to delete product.");
    }
  };

  const createProduct = async () => {
    const errors = validateDraft(addDraft);
    if (errors.length) {
      setAddError(errors.join(" "));
      return;
    }

    try {
      setCreatingProduct(true);
      setAddError("");
      const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...addDraft,
          images: addDraft.images
            .toString()
            .split(",")
            .map((value) => value.trim())
            .filter(Boolean),
          rating: Number(addDraft.rating),
        }),
      });
      if (!response.ok) throw new Error("Failed to create product.");
      const created = await response.json();
      setProducts((current) => [created, ...current]);
      closeAddModal();
    } catch (err) {
      setAddError((err as Error).message || "Unable to create product.");
    } finally {
      setCreatingProduct(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F4D5] text-[#0A3323]">
      <header className="sticky top-0 z-30 border-b border-[#0A3323]/10 bg-[#F7F4D5]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-6 md:flex-row md:items-center md:justify-between md:px-12">
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-[#839958]">Admin</p>
            <h1 className="mt-3 text-4xl font-semibold md:text-5xl">Catalog dashboard</h1>
            {/* <p className="mt-3 max-w-2xl text-sm leading-7 text-[#0A3323]/80">
              Refined product management built with Archive's premium palette and clean layout.
            </p> */}
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <label className="relative flex w-full items-center rounded-full border border-[#0A3323]/15 bg-[#F7F4D5] px-4 py-3 shadow-sm md:w-[360px]">
              <Search className="mr-2 h-4 w-4 text-[#0A3323]/60" />
              <input
                type="search"
                value={searchTerm}
                onChange={(event) => handleSearch(event.target.value)}
                placeholder="Search products"
                className="w-full bg-transparent text-sm text-[#0A3323] outline-none placeholder:text-[#0A3323]/50"
              />
            </label>
            <button
              type="button"
              onClick={openAddModal}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#0A3323] px-6 py-3 text-sm font-semibold text-[#F7F4D5] transition hover:bg-[#1a4f32]"
            >
              <Plus className="h-4 w-4" />
              Add product
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10 md:px-12">
        <section className="space-y-8">
          {/* <div className="rounded-[32px] border border-[#0A3323]/10 bg-white p-8 shadow-[0_24px_80px_rgba(10,51,35,0.08)]">
            <div className="grid gap-6 md:grid-cols-[1.4fr_0.9fr] md:items-center">
              <div>
                <p className="text-sm uppercase tracking-[0.4em] text-[#839958]">Inventory overview</p>
                <h2 className="mt-4 text-3xl font-semibold">Products in catalog</h2>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-[#0A3323]/80">
                  Keep the product library polished and aligned with Archive design language.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-[28px] bg-[#F7F4D5] p-5 text-sm shadow-sm">
                  <p className="text-xs uppercase tracking-[0.4em] text-[#839958]">Total products</p>
                  <p className="mt-4 text-3xl font-semibold">{products.length}</p>
                </div>
                <div className="rounded-[28px] bg-[#F7F4D5] p-5 text-sm shadow-sm">
                  <p className="text-xs uppercase tracking-[0.4em] text-[#839958]">Visible</p>
                  <p className="mt-4 text-3xl font-semibold">{visibleProducts.length}</p>
                </div>
                <div className="rounded-[28px] bg-[#F7F4D5] p-5 text-sm shadow-sm">
                  <p className="text-xs uppercase tracking-[0.4em] text-[#839958]">Page</p>
                  <p className="mt-4 text-3xl font-semibold">{currentPage}</p>
                </div>
              </div>
            </div>
          </div> */}

          {error ? (
            <div className="rounded-[28px] border border-red-200 bg-red-50 p-6 text-sm text-red-800">{error}</div>
          ) : null}

          <div className="rounded-[32px] border border-[#0A3323]/10 bg-white p-6 shadow-[0_24px_80px_rgba(10,51,35,0.08)]">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.4em] text-[#839958]">Product listing</p>
                <p className="mt-2 text-sm text-[#0A3323]/80">{filteredProducts.length} products found</p>
              </div>
              <div className="rounded-full border border-[#0A3323]/15 bg-[#F7F4D5] px-4 py-2 text-sm text-[#0A3323]/70">
                Page {currentPage} of {totalPages}
              </div>
            </div>

            {loading ? (
              <div className="flex min-h-[280px] items-center justify-center py-16 text-sm text-[#0A3323]/60">Loading products...</div>
            ) : visibleProducts.length === 0 ? (
              <div className="flex min-h-[260px] items-center justify-center py-16 text-sm text-[#0A3323]/70">No matching products found.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                  <thead className="border-b border-[#0A3323]/10 text-[#0A3323]/70">
                    <tr>
                      <th className="px-4 py-4">Product</th>
                      <th className="px-4 py-4">Category</th>
                      <th className="px-4 py-4">Price</th>
                      <th className="px-4 py-4">Rating</th>
                      <th className="px-4 py-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#0A3323]/10">
                    {visibleProducts.map((product) => {
                      const editing = editingId === product._id;
                      return (
                        <Fragment key={product._id}>
                          <tr className="bg-[#F7F4D5]">
                            <td className="px-4 py-5 align-top">
                              <div className="flex items-start gap-4">
                                <div
                                  className="h-16 w-16 overflow-hidden rounded-3xl bg-[#0A3323]/5"
                                  style={{ backgroundImage: `url(${product.coverImage})`, backgroundSize: "cover", backgroundPosition: "center" }}
                                />
                                <div>
                                  <p className="font-semibold text-[#0A3323]">{product.title}</p>
                                  <p className="max-w-xl text-sm text-[#0A3323]/70 line-clamp-2">{product.description}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-5 align-top text-[#0A3323]/80">{product.category}</td>
                            <td className="px-4 py-5 align-top text-[#0A3323]/80">{product.price}</td>
                            <td className="px-4 py-5 align-top text-[#0A3323]/80">{product.rating.toFixed(1)} ★</td>
                            <td className="px-4 py-5 align-top">
                              <div className="flex flex-wrap gap-2">
                                <button
                                  type="button"
                                  onClick={() => startEdit(product)}
                                  className="inline-flex items-center gap-2 rounded-full border border-[#0A3323]/15 bg-white px-4 py-2 text-sm font-semibold text-[#0A3323] transition hover:border-[#0A3323]"
                                >
                                  <Edit3 className="h-4 w-4" />
                                  Edit
                                </button>
                                <button
                                  type="button"
                                  onClick={() => deleteProduct(product._id)}
                                  className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-100"
                                >
                                  <Trash2 className="h-4 w-4" />
                                  Delete
                                </button>
                                <Link
                                  href={`/products/${product._id}`}
                                  className="inline-flex items-center gap-2 rounded-full bg-[#0A3323] px-4 py-2 text-sm font-semibold text-[#F7F4D5] transition hover:bg-[#1a4f32]"
                                >
                                  View
                                </Link>
                              </div>
                            </td>
                          </tr>

                          {editing ? (
                            <tr className="bg-white">
                              <td colSpan={5} className="px-4 py-5">
                                <div className="grid gap-4 lg:grid-cols-2">
                                  <label className="block">
                                    <span className="mb-2 block text-sm font-semibold text-[#0A3323]">Title</span>
                                    <input
                                      value={draft.title}
                                      onChange={(event) => updateDraft("title", event.target.value)}
                                      className="w-full rounded-3xl border border-[#0A3323]/15 bg-[#F7F4D5] px-4 py-3 text-sm outline-none focus:border-[#839958]"
                                    />
                                  </label>
                                  <label className="block">
                                    <span className="mb-2 block text-sm font-semibold text-[#0A3323]">Price</span>
                                    <input
                                      value={draft.price}
                                      onChange={(event) => updateDraft("price", event.target.value)}
                                      className="w-full rounded-3xl border border-[#0A3323]/15 bg-[#F7F4D5] px-4 py-3 text-sm outline-none focus:border-[#839958]"
                                    />
                                  </label>
                                  <label className="block">
                                    <span className="mb-2 block text-sm font-semibold text-[#0A3323]">Category</span>
                                    <input
                                      value={draft.category}
                                      onChange={(event) => updateDraft("category", event.target.value)}
                                      className="w-full rounded-3xl border border-[#0A3323]/15 bg-[#F7F4D5] px-4 py-3 text-sm outline-none focus:border-[#839958]"
                                    />
                                  </label>
                                  <label className="block">
                                    <span className="mb-2 block text-sm font-semibold text-[#0A3323]">Rating</span>
                                    <input
                                      type="number"
                                      step="0.1"
                                      min="0"
                                      max="5"
                                      value={draft.rating}
                                      onChange={(event) => updateDraft("rating", event.target.value)}
                                      className="w-full rounded-3xl border border-[#0A3323]/15 bg-[#F7F4D5] px-4 py-3 text-sm outline-none focus:border-[#839958]"
                                    />
                                  </label>
                                  <label className="block">
                                    <span className="mb-2 block text-sm font-semibold text-[#0A3323]">Cover image URL</span>
                                    <input
                                      value={draft.coverImage}
                                      onChange={(event) => updateDraft("coverImage", event.target.value)}
                                      className="w-full rounded-3xl border border-[#0A3323]/15 bg-[#F7F4D5] px-4 py-3 text-sm outline-none focus:border-[#839958]"
                                    />
                                  </label>
                                  <label className="block">
                                    <span className="mb-2 block text-sm font-semibold text-[#0A3323]">Alt text</span>
                                    <input
                                      value={draft.alt}
                                      onChange={(event) => updateDraft("alt", event.target.value)}
                                      className="w-full rounded-3xl border border-[#0A3323]/15 bg-[#F7F4D5] px-4 py-3 text-sm outline-none focus:border-[#839958]"
                                    />
                                  </label>
                                  <label className="block md:col-span-2">
                                    <span className="mb-2 block text-sm font-semibold text-[#0A3323]">Image URLs</span>
                                    <input
                                      value={draft.images}
                                      onChange={(event) => updateDraft("images", event.target.value)}
                                      className="w-full rounded-3xl border border-[#0A3323]/15 bg-[#F7F4D5] px-4 py-3 text-sm outline-none focus:border-[#839958]"
                                    />
                                  </label>
                                  <label className="block md:col-span-2">
                                    <span className="mb-2 block text-sm font-semibold text-[#0A3323]">Description</span>
                                    <textarea
                                      rows={3}
                                      value={draft.description}
                                      onChange={(event) => updateDraft("description", event.target.value)}
                                      className="w-full rounded-[28px] border border-[#0A3323]/15 bg-[#F7F4D5] px-4 py-3 text-sm outline-none focus:border-[#839958]"
                                    />
                                  </label>
                                </div>
                                <div className="mt-4 flex flex-wrap gap-3">
                                  <button
                                    type="button"
                                    onClick={() => saveProduct(product._id)}
                                    disabled={savingId === product._id}
                                    className="inline-flex items-center gap-2 rounded-full bg-[#839958] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#6c8450] disabled:cursor-not-allowed disabled:opacity-60"
                                  >
                                    <Check className="h-4 w-4" />
                                    Save
                                  </button>
                                  <button
                                    type="button"
                                    onClick={cancelEdit}
                                    className="inline-flex items-center gap-2 rounded-full border border-[#0A3323]/15 bg-white px-5 py-3 text-sm font-semibold text-[#0A3323] transition hover:border-[#0A3323]"
                                  >
                                    <X className="h-4 w-4" />
                                    Cancel
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ) : null}
                        </Fragment>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-sm text-[#0A3323]/70">Showing {visibleProducts.length} of {filteredProducts.length} products</div>
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage <= 1}
                    className="rounded-full border border-[#0A3323]/15 bg-[#F7F4D5] px-4 py-2 text-sm transition disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage >= totalPages}
                    className="rounded-full border border-[#0A3323]/15 bg-[#F7F4D5] px-4 py-2 text-sm transition disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          {/* </div> */}

        </section>
      </main>

      {isAddOpen ? (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-[#0A3323]/60 px-4 py-6">
          <div className="w-full max-w-3xl rounded-[32px] bg-white p-8 shadow-[0_40px_120px_rgba(10,51,35,0.25)]">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.4em] text-[#839958]">New product</p>
                <h2 className="mt-3 text-3xl font-semibold">Create new product</h2>
              </div>
              <button
                type="button"
                onClick={closeAddModal}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#0A3323]/15 bg-[#F7F4D5] text-[#0A3323] transition hover:bg-[#E8E3CE]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {addError ? (
              <div className="mb-6 rounded-3xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">{addError}</div>
            ) : null}

            <div className="grid gap-5 md:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-[#0A3323]">Title</span>
                <input
                  type="text"
                  value={addDraft.title}
                  onChange={(event) => updateAddDraft("title", event.target.value)}
                  className="w-full rounded-3xl border border-[#0A3323]/10 bg-[#F7F4D5] px-4 py-3 text-sm outline-none focus:border-[#839958]"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-[#0A3323]">Price</span>
                <input
                  type="text"
                  value={addDraft.price}
                  onChange={(event) => updateAddDraft("price", event.target.value)}
                  placeholder="₹2,499"
                  className="w-full rounded-3xl border border-[#0A3323]/10 bg-[#F7F4D5] px-4 py-3 text-sm outline-none focus:border-[#839958]"
                />
              </label>
              <label className="block md:col-span-2">
                <span className="mb-2 block text-sm font-medium text-[#0A3323]">Cover image URL</span>
                <input
                  type="text"
                  value={addDraft.coverImage}
                  onChange={(event) => updateAddDraft("coverImage", event.target.value)}
                  placeholder="https://..."
                  className="w-full rounded-3xl border border-[#0A3323]/10 bg-[#F7F4D5] px-4 py-3 text-sm outline-none focus:border-[#839958]"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-[#0A3323]">Alt text</span>
                <input
                  type="text"
                  value={addDraft.alt}
                  onChange={(event) => updateAddDraft("alt", event.target.value)}
                  className="w-full rounded-3xl border border-[#0A3323]/10 bg-[#F7F4D5] px-4 py-3 text-sm outline-none focus:border-[#839958]"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-[#0A3323]">Category</span>
                <input
                  type="text"
                  value={addDraft.category}
                  onChange={(event) => updateAddDraft("category", event.target.value)}
                  className="w-full rounded-3xl border border-[#0A3323]/10 bg-[#F7F4D5] px-4 py-3 text-sm outline-none focus:border-[#839958]"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-[#0A3323]">Rating</span>
                <input
                  type="number"
                  min="0"
                  max="5"
                  step="0.1"
                  value={addDraft.rating}
                  onChange={(event) => updateAddDraft("rating", event.target.value)}
                  className="w-full rounded-3xl border border-[#0A3323]/10 bg-[#F7F4D5] px-4 py-3 text-sm outline-none focus:border-[#839958]"
                />
              </label>
              <label className="block md:col-span-2">
                <span className="mb-2 block text-sm font-medium text-[#0A3323]">Image URLs</span>
                <input
                  type="text"
                  value={addDraft.images}
                  onChange={(event) => updateAddDraft("images", event.target.value)}
                  placeholder="Separate with commas"
                  className="w-full rounded-3xl border border-[#0A3323]/10 bg-[#F7F4D5] px-4 py-3 text-sm outline-none focus:border-[#839958]"
                />
              </label>
              <label className="block md:col-span-2">
                <span className="mb-2 block text-sm font-medium text-[#0A3323]">Description</span>
                <textarea
                  rows={4}
                  value={addDraft.description}
                  onChange={(event) => updateAddDraft("description", event.target.value)}
                  className="w-full rounded-3xl border border-[#0A3323]/10 bg-[#F7F4D5] px-4 py-3 text-sm outline-none focus:border-[#839958]"
                />
              </label>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={closeAddModal}
                className="rounded-full border border-[#0A3323]/15 bg-white px-6 py-3 text-sm text-[#0A3323] transition hover:border-[#0A3323]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={createProduct}
                disabled={creatingProduct}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0A3323] px-6 py-3 text-sm font-semibold text-[#F7F4D5] transition hover:bg-[#1a4f32] disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Plus className="h-4 w-4" />
                {creatingProduct ? "Creating..." : "Create product"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

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
  quantity: number;
  contains?: string;
};

type ProductDraft = {
  title: string;
  price: string;
  coverImage: string;
  images: string;
  alt: string;
  description: string;
  category: string;
  quantity: number | string;
  contains: string;
};

const emptyDraft: ProductDraft = {
  title: "",
  price: "",
  coverImage: "",
  images: "",
  alt: "",
  description: "",
  category: "",
  quantity: 0,
  contains: "",
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
      setProducts(
        Array.isArray(data.products)
          ? data.products.map((product: Product) => ({ ...product, _id: String(product._id) }))
          : []
      );
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
    setEditingId(String(product._id));
    setDraft({
      title: product.title,
      price: product.price,
      coverImage: product.coverImage,
      images: (product.images || []).join(", "),
      alt: product.alt,
      description: product.description,
      category: product.category,
      quantity: product.quantity ?? 0,
      contains: product.contains ?? "",
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
      const normalizedUpdated = { ...updated, _id: String(updated._id) };
      setProducts((current) => current.map((item) => (String(item._id) === String(productId) ? normalizedUpdated : item)));
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
      setProducts((current) => current.filter((item) => String(item._id) !== String(productId)));
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
          quantity: Number(addDraft.quantity),
        }),
      });
      if (!response.ok) throw new Error("Failed to create product.");
      const created = await response.json();
      const normalizedCreated = { ...created, _id: String(created._id) };
      setProducts((current) => [normalizedCreated, ...current]);
      closeAddModal();
    } catch (err) {
      setAddError((err as Error).message || "Unable to create product.");
    } finally {
      setCreatingProduct(false);
    }
  };

  return (
    <div className="min-h-screen bg-[rgb(247_244_213)] text-[#2f3a3b]">
      <header className="sticky top-0 z-30 border-b border-[#cfcaa8]/70 bg-[rgb(250_248_222)]">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-6 md:flex-row md:items-center md:justify-between md:px-12">
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-[#8a7d4d]">Admin</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-[-0.02em] md:text-5xl text-[#2f3a3b]">Catalog dashboard</h1>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <label className="relative flex w-full items-center rounded-full border border-[#cfcaa8]/70 bg-[rgb(251_250_229)] px-4 py-3 md:w-[360px]">
              <Search className="mr-2 h-4 w-4 text-[#5f6f70]/70" />
              <input
                type="search"
                value={searchTerm}
                onChange={(event) => handleSearch(event.target.value)}
                placeholder="Search products"
                className="w-full bg-transparent text-sm text-[#2f3a3b] outline-none placeholder:text-[#5f6f70]/70"
              />
            </label>
            <button
              type="button"
              onClick={openAddModal}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#8a7d4d] px-6 py-3 text-sm font-semibold text-[rgb(247_244_213)] transition hover:bg-[#756a3f]"
            >
              <Plus className="h-4 w-4" />
              Add product
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1600px] px-4 py-8 sm:px-6 lg:px-8">
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
            <div className="rounded-[28px] border border-red-200 bg-red-50 p-6 text-sm text-red-800 shadow-sm">{error}</div>
          ) : null}

          <div className="rounded-[24px] border border-[#cfcaa8]/70 bg-[rgb(250_248_222)] p-5">
            {/* <div className="mb-6 rounded-[24px] border border-[#0A3323]/10 bg-[#FCFAEF] p-5">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.4em] text-[#839958]">Inventory overview</p>
                  <h2 className="mt-2 text-2xl font-semibold text-[#0A3323]">Keep the catalog polished and up to date</h2>
                  <p className="mt-2 text-sm leading-6 text-[#0A3323]/70">{filteredProducts.length} products found and ready for customers.</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <div className="rounded-full border border-[#0A3323]/10 bg-white px-4 py-2 text-sm text-[#0A3323]/70">
                    Total: {products.length}
                  </div>
                  <div className="rounded-full border border-[#0A3323]/10 bg-white px-4 py-2 text-sm text-[#0A3323]/70">
                    Visible: {visibleProducts.length}
                  </div>
                </div>
              </div>
            </div> */}

            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.4em] text-[#8a7d4d]">Product listing</p>
                <p className="mt-2 text-sm text-[#4a5456]/80">Manage products with a consistent, premium workflow.</p>
              </div>
              <div className="rounded-full border border-[#cfcaa8]/70 bg-[rgb(247_244_213)] px-4 py-2 text-sm text-[#4a5456]/80">
                Page {currentPage} of {totalPages}
              </div>
            </div>

            {loading ? (
              <div className="flex min-h-[280px] items-center justify-center rounded-[24px] border border-dashed border-[#cfcaa8]/70 bg-[rgb(248_247_220)] py-16 text-sm text-[#4a5456]/70">
                Loading products...
              </div>
            ) : visibleProducts.length === 0 ? (
              <div className="flex min-h-[260px] items-center justify-center rounded-[24px] border border-dashed border-[#cfcaa8]/70 bg-[rgb(248_247_220)] py-16 text-sm text-[#4a5456]/70">
                No matching products found.
              </div>
            ) : (
              <div className="overflow-x-auto rounded-[24px] border border-[#0A3323]/10">
                <table className="min-w-full text-left text-sm">
                  <thead className="bg-[rgb(248_247_220)] text-[#4a5456]/80">
                    <tr>
                      <th className="px-4 py-4">Product</th>
                      <th className="px-4 py-4">Category</th>
                      <th className="px-4 py-4">Price</th>
                      <th className="px-4 py-4">Quantity</th>
                      <th className="px-4 py-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#cfcaa8]/60 bg-[rgb(251_250_229)]">
                    {visibleProducts.map((product) => {
                      const editing = editingId === product._id;
                      return (
                        <Fragment key={product._id}>
                          <tr className="bg-[rgb(251_250_229)] transition hover:bg-[rgb(248_247_220)]">
                            <td className="px-4 py-5 align-top">
                              <div className="flex items-start gap-4">
                                <div
                                  className="h-16 w-16 overflow-hidden rounded-3xl bg-[#0A3323]/5"
                                  style={{ backgroundImage: `url(${product.coverImage})`, backgroundSize: "cover", backgroundPosition: "center" }}
                                />
                                <div>
                                  <p className="font-semibold text-[#2f3a3b]">{product.title}</p>
                                  <p className="max-w-xl text-sm text-[#4a5456]/70 line-clamp-2">{product.description}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-5 align-top text-[#4a5456]/80">{product.category}</td>
                            <td className="px-4 py-5 align-top text-[#4a5456]/80">{product.price}</td>
                            <td className="px-4 py-5 align-top text-[#4a5456]/80">{product.quantity ?? 0}</td>
                            <td className="px-4 py-5 align-top">
                              <div className="flex flex-wrap gap-2">
                                <button
                                  type="button"
                                  onClick={() => startEdit(product)}
                                  className="inline-flex items-center gap-2 rounded-full border border-[#cfcaa8]/70 bg-[rgb(247_244_213)] px-4 py-2 text-sm font-semibold text-[#2f3a3b] transition hover:bg-[rgb(242_239_200)]"
                                >
                                  <Edit3 className="h-4 w-4" />
                                  Edit
                                </button>
                                <button
                                  type="button"
                                  onClick={() => deleteProduct(product._id)}
                                  className="inline-flex items-center gap-2 rounded-full border border-[#cfcaa8]/70 bg-[rgb(248_244_223)] px-4 py-2 text-sm font-semibold text-[#6a3c2f] transition hover:bg-[rgb(243_239_208)]"
                                >
                                  <Trash2 className="h-4 w-4" />
                                  Delete
                                </button>
                                <Link
                                  href={`/products/${product._id}`}
                                  className="inline-flex items-center gap-2 rounded-full bg-[#8a7d4d] px-4 py-2 text-sm font-semibold text-[rgb(247_244_213)] transition hover:bg-[#756a3f]"
                                >
                                  View
                                </Link>
                              </div>
                            </td>
                          </tr>

                          {editing ? (
                            <tr className="bg-[rgb(248_247_220)]">
                              <td colSpan={5} className="px-4 py-5">
                                <div className="rounded-[20px] border border-[#cfcaa8]/70 bg-[rgb(251_250_229)] p-4 sm:p-5">
                                  <div className="mb-4 flex items-center justify-between">
                                    <div>
                                      <p className="text-sm uppercase tracking-[0.4em] text-[#8a7d4d]">Edit product</p>
                                      <p className="mt-1 text-sm text-[#4a5456]/70">Refine the details before saving.</p>
                                    </div>
                                  </div>
                                  <div className="grid gap-4 lg:grid-cols-2">
                                  <label className="block">
                                    <span className="mb-2 block text-sm font-semibold text-[#2f3a3b]">Title</span>
                                    <input
                                      value={draft.title}
                                      onChange={(event) => updateDraft("title", event.target.value)}
                                      className="w-full rounded-2xl border border-[#0A3323]/10 bg-[#FCFAEF] px-4 py-3 text-sm text-[#0A3323] outline-none transition focus:border-[#839958] focus:ring-2 focus:ring-[#839958]/20"
                                    />
                                  </label>
                                  <label className="block">
                                    <span className="mb-2 block text-sm font-semibold text-[#2f3a3b]">Price</span>
                                    <input
                                      value={draft.price}
                                      onChange={(event) => updateDraft("price", event.target.value)}
                                      className="w-full rounded-2xl border border-[#0A3323]/10 bg-[#FCFAEF] px-4 py-3 text-sm text-[#0A3323] outline-none transition focus:border-[#839958] focus:ring-2 focus:ring-[#839958]/20"
                                    />
                                  </label>
                                  <label className="block">
                                    <span className="mb-2 block text-sm font-semibold text-[#2f3a3b]">Category</span>
                                    <input
                                      value={draft.category}
                                      onChange={(event) => updateDraft("category", event.target.value)}
                                      className="w-full rounded-2xl border border-[#0A3323]/10 bg-[#FCFAEF] px-4 py-3 text-sm text-[#0A3323] outline-none transition focus:border-[#839958] focus:ring-2 focus:ring-[#839958]/20"
                                    />
                                  </label>
                                  <label className="block">
                                    <span className="mb-2 block text-sm font-semibold text-[#2f3a3b]">Quantity</span>
                                    <input
                                      type="number"
                                      min="0"
                                      step="1"
                                      value={draft.quantity}
                                      onChange={(event) => updateDraft("quantity", event.target.value)}
                                      className="w-full rounded-2xl border border-[#0A3323]/10 bg-[#FCFAEF] px-4 py-3 text-sm text-[#0A3323] outline-none transition focus:border-[#839958] focus:ring-2 focus:ring-[#839958]/20"
                                    />
                                  </label>
                                  <label className="block">
                                    <span className="mb-2 block text-sm font-semibold text-[#2f3a3b]">Cover image URL</span>
                                    <input
                                      value={draft.coverImage}
                                      onChange={(event) => updateDraft("coverImage", event.target.value)}
                                      className="w-full rounded-2xl border border-[#0A3323]/10 bg-[#FCFAEF] px-4 py-3 text-sm text-[#0A3323] outline-none transition focus:border-[#839958] focus:ring-2 focus:ring-[#839958]/20"
                                    />
                                  </label>
                                  <label className="block">
                                    <span className="mb-2 block text-sm font-semibold text-[#2f3a3b]">Alt text</span>
                                    <input
                                      value={draft.alt}
                                      onChange={(event) => updateDraft("alt", event.target.value)}
                                      className="w-full rounded-2xl border border-[#0A3323]/10 bg-[#FCFAEF] px-4 py-3 text-sm text-[#0A3323] outline-none transition focus:border-[#839958] focus:ring-2 focus:ring-[#839958]/20"
                                    />
                                  </label>
                                  <label className="block md:col-span-2">
                                    <span className="mb-2 block text-sm font-semibold text-[#2f3a3b]">Contains (use ; to separate)</span>
                                    <input
                                      value={draft.contains}
                                      onChange={(event) => updateDraft("contains", event.target.value)}
                                      placeholder="Premium desk accessories;Elegant packaging"
                                      className="w-full rounded-2xl border border-[#0A3323]/10 bg-[#FCFAEF] px-4 py-3 text-sm text-[#0A3323] outline-none transition focus:border-[#839958] focus:ring-2 focus:ring-[#839958]/20"
                                    />
                                  </label>
                                  <label className="block md:col-span-2">
                                    <span className="mb-2 block text-sm font-semibold text-[#2f3a3b]">Image URLs</span>
                                    <input
                                      value={draft.images}
                                      onChange={(event) => updateDraft("images", event.target.value)}
                                      className="w-full rounded-2xl border border-[#0A3323]/10 bg-[#FCFAEF] px-4 py-3 text-sm text-[#0A3323] outline-none transition focus:border-[#839958] focus:ring-2 focus:ring-[#839958]/20"
                                    />
                                  </label>
                                  <label className="block md:col-span-2">
                                    <span className="mb-2 block text-sm font-semibold text-[#2f3a3b]">Description</span>
                                    <textarea
                                      rows={3}
                                      value={draft.description}
                                      onChange={(event) => updateDraft("description", event.target.value)}
                                      className="w-full rounded-2xl border border-[#0A3323]/10 bg-[#FCFAEF] px-4 py-3 text-sm text-[#0A3323] outline-none transition focus:border-[#839958]"
                                    />
                                  </label>
                                </div>
                                <div className="mt-4 flex flex-wrap gap-3">
                                  <button
                                    type="button"
                                    onClick={() => saveProduct(product._id)}
                                    disabled={savingId === product._id}
                                    className="inline-flex items-center gap-2 rounded-full bg-[#8a7d4d] px-5 py-3 text-sm font-semibold text-[rgb(247_244_213)] transition hover:bg-[#756a3f] disabled:cursor-not-allowed disabled:opacity-60"
                                  >
                                    <Check className="h-4 w-4" />
                                    Save
                                  </button>
                                  <button
                                    type="button"
                                    onClick={cancelEdit}
                                    className="inline-flex items-center gap-2 rounded-full border border-[#cfcaa8]/70 bg-[rgb(247_244_213)] px-5 py-3 text-sm font-semibold text-[#2f3a3b] transition hover:bg-[rgb(242_239_200)]"
                                  >
                                    <X className="h-4 w-4" />
                                    Cancel
                                  </button>
                                </div>
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
                <div className="text-sm text-[#4a5456]/70">Showing {visibleProducts.length} of {filteredProducts.length} products</div>
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage <= 1}
                    className="rounded-full border border-[#0A3323]/10 bg-[#F7F4D5] px-4 py-2 text-sm text-[#0A3323] transition disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage >= totalPages}
                    className="rounded-full border border-[#0A3323]/10 bg-[#F7F4D5] px-4 py-2 text-sm text-[#0A3323] transition disabled:cursor-not-allowed disabled:opacity-50"
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
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-[#3c3a33]/55 px-3 py-4 sm:px-6">
          <div className="w-full max-w-4xl max-h-[90dvh] overflow-hidden rounded-[24px] border border-[#cfcaa8]/70 bg-[rgb(250_248_222)]">
            <div className="max-h-[90dvh] overflow-y-auto p-5 sm:p-8">
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.4em] text-[#8a7d4d]">New product</p>
                  <h2 className="mt-3 text-3xl font-semibold text-[#2f3a3b]">Create new product</h2>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-[#4a5456]/70">
                    Add a fresh product with polished details and keep the catalog ready for customers.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={closeAddModal}
                  className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#cfcaa8]/70 bg-[rgb(247_244_213)] text-[#2f3a3b] transition hover:bg-[rgb(242_239_200)]"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {addError ? (
                <div className="mb-6 rounded-3xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">{addError}</div>
              ) : null}

              <div className="space-y-5 rounded-[28px] border border-[#cfcaa8]/70 bg-[rgb(251_250_229)] p-4 sm:p-5">
                <div className="grid gap-5 md:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-[#2f3a3b]">Title</span>
                    <input
                      type="text"
                      value={addDraft.title}
                      onChange={(event) => updateAddDraft("title", event.target.value)}
                      className="w-full rounded-2xl border border-[#cfcaa8]/70 bg-[rgb(252_251_238)] px-4 py-3 text-sm text-[#2f3a3b] outline-none transition focus:border-[#8a7d4d] focus:ring-2 focus:ring-[#8a7d4d]/20"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-[#2f3a3b]">Price</span>
                    <input
                      type="text"
                      value={addDraft.price}
                      onChange={(event) => updateAddDraft("price", event.target.value)}
                      placeholder="₹2,499"
                      className="w-full rounded-2xl border border-[#cfcaa8]/70 bg-[rgb(252_251_238)] px-4 py-3 text-sm text-[#2f3a3b] outline-none transition focus:border-[#8a7d4d] focus:ring-2 focus:ring-[#8a7d4d]/20"
                    />
                  </label>
                  <label className="block md:col-span-2">
                    <span className="mb-2 block text-sm font-semibold text-[#2f3a3b]">Cover image URL</span>
                    <input
                      type="text"
                      value={addDraft.coverImage}
                      onChange={(event) => updateAddDraft("coverImage", event.target.value)}
                      placeholder="https://..."
                      className="w-full rounded-2xl border border-[#cfcaa8]/70 bg-[rgb(252_251_238)] px-4 py-3 text-sm text-[#2f3a3b] outline-none transition focus:border-[#8a7d4d] focus:ring-2 focus:ring-[#8a7d4d]/20"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-[#2f3a3b]">Alt text</span>
                    <input
                      type="text"
                      value={addDraft.alt}
                      onChange={(event) => updateAddDraft("alt", event.target.value)}
                      className="w-full rounded-2xl border border-[#cfcaa8]/70 bg-[rgb(252_251_238)] px-4 py-3 text-sm text-[#2f3a3b] outline-none transition focus:border-[#8a7d4d] focus:ring-2 focus:ring-[#8a7d4d]/20"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-[#2f3a3b]">Category</span>
                    <input
                      type="text"
                      value={addDraft.category}
                      onChange={(event) => updateAddDraft("category", event.target.value)}
                      className="w-full rounded-2xl border border-[#cfcaa8]/70 bg-[rgb(252_251_238)] px-4 py-3 text-sm text-[#2f3a3b] outline-none transition focus:border-[#8a7d4d] focus:ring-2 focus:ring-[#8a7d4d]/20"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-[#2f3a3b]">Quantity</span>
                    <input
                      type="number"
                      min="0"
                      step="1"
                      value={addDraft.quantity}
                      onChange={(event) => updateAddDraft("quantity", event.target.value)}
                      className="w-full rounded-2xl border border-[#cfcaa8]/70 bg-[rgb(252_251_238)] px-4 py-3 text-sm text-[#2f3a3b] outline-none transition focus:border-[#8a7d4d] focus:ring-2 focus:ring-[#8a7d4d]/20"
                    />
                  </label>
                  <label className="block md:col-span-2">
                    <span className="mb-2 block text-sm font-semibold text-[#2f3a3b]">Contains (use ; to separate)</span>
                    <input
                      type="text"
                      value={addDraft.contains}
                      onChange={(event) => updateAddDraft("contains", event.target.value)}
                      placeholder="Premium desk accessories;Elegant packaging"
                      className="w-full rounded-2xl border border-[#cfcaa8]/70 bg-[rgb(252_251_238)] px-4 py-3 text-sm text-[#2f3a3b] outline-none transition focus:border-[#8a7d4d] focus:ring-2 focus:ring-[#8a7d4d]/20"
                    />
                  </label>
                  <label className="block md:col-span-2">
                    <span className="mb-2 block text-sm font-semibold text-[#2f3a3b]">Image URLs</span>
                    <input
                      type="text"
                      value={addDraft.images}
                      onChange={(event) => updateAddDraft("images", event.target.value)}
                      placeholder="Separate with commas"
                      className="w-full rounded-2xl border border-[#cfcaa8]/70 bg-[rgb(252_251_238)] px-4 py-3 text-sm text-[#2f3a3b] outline-none transition focus:border-[#8a7d4d] focus:ring-2 focus:ring-[#8a7d4d]/20"
                    />
                  </label>
                  <label className="block md:col-span-2">
                    <span className="mb-2 block text-sm font-semibold text-[#2f3a3b]">Description</span>
                    <textarea
                      rows={4}
                      value={addDraft.description}
                      onChange={(event) => updateAddDraft("description", event.target.value)}
                      className="w-full rounded-2xl border border-[#cfcaa8]/70 bg-[rgb(252_251_238)] px-4 py-3 text-sm text-[#2f3a3b] outline-none transition focus:border-[#8a7d4d] focus:ring-2 focus:ring-[#8a7d4d]/20"
                    />
                  </label>
                </div>
              </div>

              <div className="mt-8 flex flex-col-reverse gap-3 border-t border-[#cfcaa8]/70 pt-6 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeAddModal}
                  className="rounded-full border border-[#cfcaa8]/70 bg-[rgb(247_244_213)] px-6 py-3 text-sm font-semibold text-[#2f3a3b] transition hover:bg-[rgb(242_239_200)]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={createProduct}
                  disabled={creatingProduct}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#8a7d4d] px-6 py-3 text-sm font-semibold text-[rgb(247_244_213)] transition hover:bg-[#756a3f] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Plus className="h-4 w-4" />
                  {creatingProduct ? "Creating..." : "Create product"}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

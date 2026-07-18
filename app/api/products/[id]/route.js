import dbConnect from "@/lib/db";
import Product from "@/lib/models/Product";
import localProducts from "../../../../data/products";

const normalizeProductData = (body) => {
  const normalized = { ...body };

  if (typeof normalized.images === "string") {
    normalized.images = normalized.images
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean);
  }

  if (typeof normalized.quantity === "string" && normalized.quantity.trim() !== "") {
    normalized.quantity = Number(normalized.quantity);
  }

  if (typeof normalized.contains === "string") {
    normalized.contains = normalized.contains.trim();
  }

  return normalized;
};

export async function GET(request, { params }) {
  try {
    const resolvedParams = await params;
    const id = resolvedParams.id;
    console.log(`[api] GET /api/products/${id} - MONGODB_URI=${!!process.env.MONGODB_URI}`);
    if (process.env.MONGODB_URI) {
      await dbConnect();
      const product = await Product.findById(id).lean();
      console.log(`[api] DB lookup result for ${id}:`, !!product);
      if (!product) return new Response(JSON.stringify({ error: "Product not found" }), { status: 404 });
      return new Response(JSON.stringify({ ...product, _id: String(product._id) }), { status: 200, headers: { "Content-Type": "application/json" } });
    }

    const product = localProducts.find((p) => String(p._id) === String(id));
    console.log(`[api] Local fallback lookup for ${id}:`, !!product);
    if (!product) return new Response(JSON.stringify({ error: "Product not found" }), { status: 404 });
    return new Response(JSON.stringify(product), { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (error) {
    console.error("Error fetching product:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch product" }), { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  try {
    const resolvedParams = await params;
    const id = resolvedParams.id;
    const body = await request.json();

    if (process.env.MONGODB_URI) {
      await dbConnect();
      const product = await Product.findByIdAndUpdate(id, { $set: normalizeProductData(body) }, { new: true, runValidators: true });

      if (!product) return new Response(JSON.stringify({ error: "Product not found" }), { status: 404 });
      const plainProduct = product.toObject ? product.toObject() : product;
      return new Response(JSON.stringify({ ...plainProduct, _id: String(plainProduct._id) }), { status: 200, headers: { "Content-Type": "application/json" } });
    }

    const index = localProducts.findIndex((p) => String(p._id) === String(id));
    if (index === -1) return new Response(JSON.stringify({ error: "Product not found" }), { status: 404 });

    const updatedProduct = {
      ...localProducts[index],
      ...normalizeProductData(body),
      _id: String(id),
      updatedAt: new Date().toISOString()
    };

    localProducts[index] = updatedProduct;
    return new Response(JSON.stringify(updatedProduct), { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (error) {
    console.error("Error updating product:", error);
    return new Response(JSON.stringify({ error: "Failed to update product" }), { status: 500 });
  }
}

export async function PUT(request, ctx) {
  return PATCH(request, ctx);
}

export async function DELETE(request, { params }) {
  try {
    const resolvedParams = await params;
    const id = resolvedParams.id;

    if (process.env.MONGODB_URI) {
      await dbConnect();
      const product = await Product.findByIdAndDelete(id);
      if (!product) return new Response(JSON.stringify({ error: "Product not found" }), { status: 404 });
      return new Response(JSON.stringify({ success: true, deletedProductId: id }), { status: 200 });
    }

    const index = localProducts.findIndex((p) => String(p._id) === String(id));
    if (index === -1) return new Response(JSON.stringify({ error: "Product not found" }), { status: 404 });

    localProducts.splice(index, 1);
    return new Response(JSON.stringify({ success: true, deletedProductId: id }), { status: 200 });
  } catch (error) {
    console.error("Error deleting product:", error);
    return new Response(JSON.stringify({ error: "Failed to delete product" }), { status: 500 });
  }
}

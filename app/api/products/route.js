import localProducts from "../../../data/products";
import dbConnect from "@/lib/db";
import Product from "@/lib/models/Product";

const normalizeProductData = (body) => {
  const normalized = { ...body };

  if (typeof normalized.images === "string") {
    normalized.images = normalized.images
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean);
  }

  if (typeof normalized.rating === "string" && normalized.rating.trim() !== "") {
    normalized.rating = Number(normalized.rating);
  }

  return normalized;
};

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const limit = parseInt(url.searchParams.get("limit") || "12", 10);
    const topRated = url.searchParams.get("topRated") === "true";

    if (process.env.MONGODB_URI) {
      await dbConnect();
      const query = {};
      const total = await Product.countDocuments(query);
      const totalPages = Math.max(Math.ceil(total / limit), 1);
      const skip = (Math.max(page, 1) - 1) * limit;
      const sort = topRated ? { rating: -1, createdAt: -1 } : { createdAt: -1 };
      const products = await Product.find(query).sort(sort).skip(skip).limit(limit).lean();

      return new Response(JSON.stringify({ products, total, totalPages, page, limit }), {
        status: 200,
        headers: { "Cache-Control": "public, max-age=60, stale-while-revalidate=30", "Content-Type": "application/json" }
      });
    }

    const sorted = [...localProducts].sort((a, b) => {
      if (topRated) return (b.rating || 0) - (a.rating || 0) || new Date(b.createdAt) - new Date(a.createdAt);
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    const total = sorted.length;
    const totalPages = Math.max(Math.ceil(total / limit), 1);
    const skip = (Math.max(page, 1) - 1) * limit;
    const pageItems = sorted.slice(skip, skip + limit);

    return new Response(JSON.stringify({ products: pageItems, total, totalPages, page, limit }), {
      status: 200,
      headers: { "Cache-Control": "public, max-age=60, stale-while-revalidate=30", "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Error in products API:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch products" }), { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const normalized = normalizeProductData(body);

    if (process.env.MONGODB_URI) {
      await dbConnect();
      const createdProduct = await Product.create({
        ...normalized,
        createdAt: new Date(),
        updatedAt: new Date()
      });

      return new Response(JSON.stringify(createdProduct), {
        status: 201,
        headers: { "Content-Type": "application/json" }
      });
    }

    const newProduct = {
      _id: String(Date.now()),
      ...normalized,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    localProducts.unshift(newProduct);

    return new Response(JSON.stringify(newProduct), {
      status: 201,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Error creating product:", error);
    return new Response(JSON.stringify({ error: "Failed to create product" }), { status: 500 });
  }
}

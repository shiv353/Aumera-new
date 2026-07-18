import dbConnect from "@/lib/db";
import Product from "@/lib/models/Product";
import localProducts from "../../../data/products";

export async function GET() {
  try {
    if (!process.env.MONGODB_URI) {
      return new Response(JSON.stringify({ error: "MONGODB_URI not configured" }), { status: 400 });
    }

    await dbConnect();

    // optionally clear existing
    // await Product.deleteMany({});

    const created = await Product.insertMany(localProducts.map((p) => ({
      title: p.title,
      price: p.price,
      coverImage: p.coverImage,
      images: p.images,
      alt: p.alt,
      description: p.description,
      category: p.category,
      quantity: p.quantity ?? p.rating ?? 0,
      contains: p.contains ?? ""
    })));

    return new Response(JSON.stringify({ inserted: created.length }), { status: 201 });
  } catch (error) {
    console.error("Seeding error:", error);
    return new Response(JSON.stringify({ error: "Failed to seed products" }), { status: 500 });
  }
}

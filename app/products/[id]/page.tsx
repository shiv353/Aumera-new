import Footer from "@/components/Footer";
import ProductDetails from "@/components/ProductDetails";
import localProducts from "../../../data/products";
import dbConnect from "@/lib/db";
import Product from "@/lib/models/Product";

export default async function ProductPage({ params }: { params: { id: string } }) {
  try {
    const resolvedParams = await params;
    const id = resolvedParams.id;

    if (process.env.MONGODB_URI) {
      await dbConnect();
      const product = await Product.findById(id).lean();
      if (product) {
        return (
          <>
            <main>
              <ProductDetails product={JSON.parse(JSON.stringify(product))} />
            </main>
            <Footer />
          </>
        );
      }
    }

    const local = (localProducts as any[]).find((p) => String(p._id) === String(id));
    if (local) {
      return (
        <>
          <main>
            <ProductDetails product={local} />
          </main>
          <Footer />
        </>
      );
    }

    return (
      <main className="section">
        <h1>Product not found</h1>
        <p>The requested product could not be located.</p>
      </main>
    );
  } catch (error) {
    console.error("Error loading product:", error);
    return (
      <main className="section">
        <h1>Error</h1>
        <p>Unable to load product details.</p>
      </main>
    );
  }
}

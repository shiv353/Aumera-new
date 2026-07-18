import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductList from "@/components/ProductList";

export default function ProductsPage() {
  return (
    <>
      <Navbar />
      <main>
        <ProductList />
      </main>
      <Footer />
    </>
  );
}

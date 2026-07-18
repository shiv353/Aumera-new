import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Collections from "@/components/Collections";
import Products from "@/components/Products";
import BrandStory from "@/components/BrandStory";
import Corporate from "@/components/Corporate";
import Footer from "@/components/Footer";
import WhatsApp from "@/components/WhatsApp";

export default function Home() {
  return (
    <>
      {/* <div className="w-full bg-[#0A3323] text-[#F7F4D5] py-2 text-center">TAILWIND CHECK: if you see green background, Tailwind is working</div> */}
      {/* Fixed Navbar */}
      <Navbar />

      <main>

        {/* Hero */}
        <Hero />

        {/* Main Content */}
        <div className="bg-[#F7F4D5]">

          <Collections />

          <Products />

          <BrandStory />

          <Corporate />

          <Footer />

        </div>

      </main>

      {/* Floating WhatsApp Button */}
      <WhatsApp />
    </>
  );
}
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Corporate from "@/components/Corporate";

export default function CorporatePage() {
  return (
    <>
    <Navbar/>
    <main className="flex min-h-screen items-center justify-center bg-[rgb(247_244_213)] px-6 py-20 text-[#2f3a3b]">
      <div className="max-w-xl text-center">
        <p className="mb-4 text-sm uppercase tracking-[0.4em] text-[#8a7d4d]">Corporate</p>
        <h1 className="mb-4 text-4xl font-semibold sm:text-5xl">Coming soon</h1>
        <p className="text-lg leading-8 text-[#4a5456]">
          This page is being prepared for you. It will be updated soon with our corporate gifting experience.
        </p>
      </div>
    </main>
    <Footer/>
    </>
  );
}

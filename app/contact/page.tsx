import ContactHero from "./ContactHero";
import ContactCards from "./ContactCards";
import ContactForm from "./ContactForm";
import ContactCTA from "./ContactCTA";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ContactPage() {
  return (
    <>
    <Navbar />
    <main className="bg-[#F7F4D5] text-[#0A3323] min-h-screen">
      <ContactHero />
      <ContactCards />
      <ContactForm />
      {/* <ContactCTA /> */}
    </main>
    <Footer />
    </>
  );
}
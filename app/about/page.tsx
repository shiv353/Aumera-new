import FadeIn from "@/components/FadeIn";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function AboutPage() {
  return (
    <>
  <Navbar/>
    <main className="bg-[#F7F4D5] text-[#0A3323] min-h-screen">
      {/* ================= HERO ================= */}

      <FadeIn>
        <section className="pt-40 pb-28 px-8 overflow-hidden">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
            {/* LEFT */}

            <div>
              <p className="uppercase tracking-[6px] text-[#839958] text-sm mb-5">
                About Us
              </p>

              <h1 className="text-5xl md:text-7xl font-serif leading-[1.05]">
                Every Gift Begins
                <br />
                With A Thought.
              </h1>

              <p className="mt-10 text-lg leading-9 text-[#0A3323]/75 max-w-xl">
                The Aumera Gifts was built around one simple belief—that
                meaningful gifting should feel personal, effortless, and
                beautifully presented.
              </p>

              <p className="mt-6 text-lg leading-9 text-[#0A3323]/75 max-w-xl">
                From festive celebrations and corporate appreciation to
                personalised moments, every hamper is thoughtfully curated to
                create experiences that are remembered long after they're
                received.
              </p>
            </div>

            {/* RIGHT */}

            <div className="flex justify-center">
              <img
                src="/aumera-submark.png"
                alt="The Aumera Gifts"
                className="
    w-[380px]
    opacity-90
    animate-pulse
  "
              />
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ================= FOUNDER ================= */}

      <FadeIn delay={0.15}>
        <section className="pb-32 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              {/* Founder Image */}

              <div>
                <img
                  src="/founder.jpg"
                  alt="Honey Patel"
                  className="
    w-full
    aspect-[4/5]
    object-cover
    object-[50%_15%]
    rounded-[36px]
    shadow-xl
    brightness-110
    contrast-105
    saturate-110
  "
                />
              </div>

              {/* Founder Content */}

              <div>
                <p className="uppercase tracking-[6px] text-[#839958] text-sm mb-4">
                  Founder
                </p>

                <h2 className="text-5xl md:text-6xl font-serif mb-10 leading-tight">
                  Honey Patel
                </h2>

                <p className="text-lg leading-9 text-[#0A3323]/80 mb-8">
                  The Aumera Gifts began as a passion for creating meaningful
                  gifting experiences that feel personal, thoughtful, and
                  beautifully presented. Every hamper is curated with care,
                  blending quality products, elegant packaging, and attention to
                  the smallest details.
                </p>

                <p className="text-lg leading-9 text-[#0A3323]/80 mb-8">
                  Today, the brand specialises in festive gifting, corporate
                  gifting, and personalised hampers designed to celebrate
                  relationships, milestones, gratitude, and every occasion that
                  deserves to be remembered.
                </p>

                <p className="text-lg leading-9 text-[#0A3323]/80 mb-10">
                  My vision is simple—to make gifting effortless while ensuring
                  every gift feels intentional, memorable, and genuinely
                  meaningful.
                </p>

                <div className="border-l-2 border-[#839958] pl-6">
                  <p className="italic text-2xl font-serif leading-relaxed">
                    "Every gift holds a story. My hope is that each one becomes
                    a lasting memory."
                  </p>

                  <p className="mt-6 uppercase tracking-[2px] text-[#839958] text-sm">
                    — Honey Patel
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>
      {/* ================= WHAT WE STAND FOR ================= */}

      <FadeIn delay={0.2}>
        <section className="py-32 px-8 bg-[#0A3323] text-[#F7F4D5]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <p className="uppercase tracking-[6px] text-[#839958] text-sm mb-5">
                What We Stand For
              </p>

              <h2 className="text-5xl md:text-6xl font-serif leading-tight">
                Thoughtfully Curated.
                <br />
                Beautifully Presented.
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-10">
              <div className="rounded-[32px] border border-[#839958]/30 p-10 transition-all duration-500 hover:-translate-y-2 hover:bg-[#133D2C]">
                <h3 className="text-3xl font-serif mb-6">Thoughtful</h3>

                <p className="leading-8 text-[#F7F4D5]/80">
                  Every hamper is carefully curated with products that
                  complement one another, creating a complete gifting
                  experience.
                </p>
              </div>

              <div className="rounded-[32px] border border-[#839958]/30 p-10 transition-all duration-500 hover:-translate-y-2 hover:bg-[#133D2C]">
                <h3 className="text-3xl font-serif mb-6">Personal</h3>

                <p className="leading-8 text-[#F7F4D5]/80">
                  Every celebration is unique. Our hampers are designed to
                  reflect the people, relationships and moments they are created
                  for.
                </p>
              </div>

              <div className="rounded-[32px] border border-[#839958]/30 p-10 transition-all duration-500 hover:-translate-y-2 hover:bg-[#133D2C]">
                <h3 className="text-3xl font-serif mb-6">Elegant</h3>

                <p className="leading-8 text-[#F7F4D5]/80">
                  From premium packaging to carefully selected products, every
                  detail is considered with care.
                </p>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ================= OUR PURPOSE ================= */}

      <FadeIn delay={0.3}>
        <section className="py-32 px-8">
          <div className="max-w-5xl mx-auto text-center">
            <p className="uppercase tracking-[6px] text-[#839958] text-sm mb-5">
              Our Purpose
            </p>

            <h2 className="text-5xl md:text-6xl font-serif leading-tight mb-12">
              We believe the smallest
              <br />
              gestures create the
              <br />
              biggest memories.
            </h2>

            <p className="text-lg leading-9 text-[#0A3323]/80 max-w-3xl mx-auto">
              Whether it's celebrating festivals, welcoming new beginnings,
              expressing gratitude, or strengthening professional relationships,
              we believe gifting is more than an exchange—it's a way of creating
              lasting connections.
            </p>
          </div>
        </section>
      </FadeIn>

      {/* ================= COLLECTIONS ================= */}

      <FadeIn delay={0.4}>
        <section className="py-32 px-8 bg-[#0A3323] text-[#F7F4D5]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <p className="uppercase tracking-[6px] text-[#839958] text-sm mb-5">
                Our Collections
              </p>

              <h2 className="text-5xl md:text-6xl font-serif">
                Designed For
                <br />
                Every Occasion.
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="rounded-[32px] bg-[#143A2C] p-10 transition duration-500 hover:-translate-y-2">
                <h3 className="text-3xl font-serif mb-6">Festive</h3>

                <p className="leading-8 text-[#F7F4D5]/80">
                  Curated hampers for Raksha Bandhan, Diwali, Christmas, New
                  Year and every celebration in between.
                </p>
              </div>

              <div className="rounded-[32px] bg-[#143A2C] p-10 transition duration-500 hover:-translate-y-2">
                <h3 className="text-3xl font-serif mb-6">Corporate</h3>

                <p className="leading-8 text-[#F7F4D5]/80">
                  Professional gifting solutions designed for clients,
                  employees, business partners and corporate events.
                </p>
              </div>

              <div className="rounded-[32px] bg-[#143A2C] p-10 transition duration-500 hover:-translate-y-2">
                <h3 className="text-3xl font-serif mb-6">Personalised</h3>

                <p className="leading-8 text-[#F7F4D5]/80">
                  Custom gifting experiences for birthdays, weddings,
                  anniversaries, baby showers and life's memorable moments.
                </p>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ================= CTA ================= */}

      <FadeIn delay={0.5}>
        <section className="py-32 px-8">
          <div className="max-w-4xl mx-auto text-center">
            <p className="uppercase tracking-[6px] text-[#839958] text-sm mb-5">
              Let's Create Something Meaningful
            </p>

            <h2 className="text-5xl md:text-6xl font-serif leading-tight mb-10">
              Every celebration
              <br />
              deserves a thoughtful gift.
            </h2>

            <p className="text-lg leading-9 text-[#0A3323]/80 max-w-2xl mx-auto mb-12">
              Whether you're looking for festive gifting, corporate gifting, or
              a personalised hamper, we'd love to create something memorable for
              you.
            </p>

            <a
              href="https://wa.me/917016731747"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full bg-[#0A3323] px-10 py-4 text-[#F7F4D5] transition-all duration-300 hover:-translate-y-1 hover:bg-[#839958]"
            >
              Start Your Gifting Journey
            </a>
          </div>
        </section>
      </FadeIn>
    </main>
    <Footer />
      </>
  );
}

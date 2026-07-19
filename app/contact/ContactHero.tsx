import FadeIn from "@/components/FadeIn";

export default function ContactHero() {
  return (
    <FadeIn>
      <section className="relative overflow-hidden bg-[#F7F4D5] px-8 pt-40 pb-28">

        {/* Background Watermark */}

        <img
          src="bio.png"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute right-[-20px] top-1/2 w-[600px] -translate-y-1/2 opacity-50 select-none"
        />

        <div className="relative mx-auto grid max-w-7xl items-center gap-20 lg:grid-cols-2">

          {/* Left */}

          <div>

            <p className="mb-5 uppercase tracking-[6px] text-sm text-[#839958]">
              Contact
            </p>

            <h1 className="font-serif text-5xl leading-[1.05] md:text-7xl">
              Let's Create
              <br />
              Something
              <br />
              Meaningful.
            </h1>

            <p className="mt-10 max-w-xl text-lg leading-9 text-[#0A3323]/75">
              Every thoughtful gift begins with a conversation.
              Whether you're planning festive gifting, corporate
              appreciation or a personalised hamper, we'd love
              to help you create something memorable.
            </p>

            <a
              href="https://wa.me/917016731747"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-12 inline-flex items-center rounded-full bg-[#0A3323] px-8 py-4 text-[#F7F4D5] transition-all duration-300 hover:-translate-y-1 hover:bg-[#839958]"
            >
              Start on WhatsApp →
            </a>

          </div>

          

        </div>

      </section>
    </FadeIn>
  );
}
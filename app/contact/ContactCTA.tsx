import FadeIn from "@/components/FadeIn";

export default function ContactCTA() {
  return (
    <FadeIn>
      <section className="relative overflow-hidden bg-[#0A3323] px-8 py-36 text-[#F7F4D5]">

        {/* Background Glow */}

        <div className="absolute -top-32 right-0 h-[450px] w-[450px] rounded-full bg-[#839958]/10 blur-3xl" />

        <div className="relative mx-auto max-w-5xl text-center">

          <p className="mb-5 uppercase tracking-[6px] text-sm text-[#839958]">
            The Aumera Gifts
          </p>

          <h2 className="font-serif text-5xl leading-tight md:text-7xl">
            Every Thoughtful Gift
            <br />
            Begins With
            <br />
            A Conversation.
          </h2>

          <p className="mx-auto mt-10 max-w-2xl text-lg leading-9 text-[#F7F4D5]/75">
            Whether you're celebrating a festival, appreciating your team,
            planning wedding favours, or creating a personalised surprise,
            we're here to curate something meaningful.
          </p>

          <div className="mt-16">

            <a
              href="https://wa.me/917016731747"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-full bg-[#F7F4D5] px-10 py-4 text-[#0A3323] transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-white"
            >
              Let's Start →
            </a>

          </div>

          {/* Logo */}

          <div className="mt-24 flex justify-center">

            <img
              src="aumera-submark.png"
              alt="The Aumera Gifts"
              className="w-56 opacity-100"
            />

          </div>

        </div>

      </section>
    </FadeIn>
  );
}
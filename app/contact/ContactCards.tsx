import FadeIn from "@/components/FadeIn";
import {
  Phone,
  MapPin,
  Clock3,
  MessageCircle,
} from "lucide-react";

export default function ContactCards() {
  return (
    <FadeIn>
      <section className="bg-[#F7F4D5] px-8 pb-24">

        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2 xl:grid-cols-4">

          {/* Phone */}

          <div className="group rounded-[32px] border border-transparent bg-[#0A3323] p-8 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">

            <Phone
              size={34}
              className="mb-8 text-[#839958]"
            />

            <p className="mb-3 text-xs uppercase tracking-[4px] text-[#839958]">
              Call
            </p>

            <h3 className="mb-4 font-serif text-2xl text-[#F7F4D5]">
              Let's Talk
            </h3>

            <p className="leading-8 text-[#F7F4D5]/75">
              +91 70167 31747
            </p>

          </div>

          {/* WhatsApp */}

          <div className="group rounded-[32px] border border-transparent bg-[#0A3323] p-8 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">

            <MessageCircle
              size={34}
              className="mb-8 text-[#839958]"
            />

            <p className="mb-3 text-xs uppercase tracking-[4px] text-[#839958]">
              WhatsApp
            </p>

            <h3 className="mb-4 font-serif text-2xl text-[#F7F4D5]">
              Quick Replies
            </h3>

            <p className="leading-8 text-[#F7F4D5]/75">
              Fast responses for all gifting enquiries.
            </p>

          </div>

          {/* Location */}

          <div className="group rounded-[32px] border border-transparent bg-[#0A3323] p-8 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">

            <MapPin
              size={34}
              className="mb-8 text-[#839958]"
            />

            <p className="mb-3 text-xs uppercase tracking-[4px] text-[#839958]">
              Location
            </p>

            <h3 className="mb-4 font-serif text-2xl text-[#F7F4D5]">
              Ahmedabad
            </h3>

            <p className="leading-8 text-[#F7F4D5]/75">
              Gujarat, India
            </p>

          </div>

          {/* Response */}

          <div className="group rounded-[32px] border border-transparent bg-[#0A3323] p-8 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">

            <Clock3
              size={34}
              className="mb-8 text-[#839958]"
            />

            <p className="mb-3 text-xs uppercase tracking-[4px] text-[#839958]">
              Response
            </p>

            <h3 className="mb-4 font-serif text-2xl text-[#F7F4D5]">
              Within 24 Hours
            </h3>

            <p className="leading-8 text-[#F7F4D5]/75">
              We usually respond on the same day.
            </p>

          </div>

        </div>

      </section>
    </FadeIn>
  );
}
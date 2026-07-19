"use client";

import { useState, useCallback } from "react";
import FadeIn from "@/components/FadeIn";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    occasion: "",
    message: "",
  });

  const handleChange = useCallback(
    (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      const { name, value } = e.target;

      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    []
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const text = `
Hello The Aumera Gifts 🌿

Name: ${form.name}

Email: ${form.email}

Phone: ${form.phone}

Occasion: ${form.occasion}

Requirement:
${form.message}
`;

    window.open(
      `https://wa.me/917016731747?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  };

  const inputClass =
    "rounded-2xl border border-[#CFC58F] bg-[#FBF7E8] px-6 py-4 text-[#0A3323] placeholder:text-[#0A3323]/50 outline-none transition-all duration-300 focus:border-[#839958] focus:bg-[#FFFDF6] focus:ring-2 focus:ring-[#839958]/10";

  return (
    <FadeIn>
      <section className="bg-[#F7F4D5] px-8 py-28">
        <div className="mx-auto max-w-5xl">
          {/* Heading */}
          <div className="mb-16 text-center">
            <p className="mb-4 text-sm uppercase tracking-[6px] text-[#839958]">
              Enquiry
            </p>

            <h2 className="font-serif text-5xl leading-tight md:text-6xl text-[#0A3323]">
              Tell Us About
              <br />
              Your Requirement
            </h2>

            <p className="mx-auto mt-8 max-w-2xl leading-8 text-[#0A3323]/70">
              Share a few details and we'll help curate something thoughtful
              for your celebration.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="
              rounded-[42px]
              border
              border-[#D6CB96]
              bg-gradient-to-br
              from-[#F8F5E4]
              via-[#F5F1DD]
              to-[#EEE8C8]
              p-10
              md:p-14
              shadow-[0_15px_40px_rgba(10,51,35,0.08)]
              transition-all
              duration-300
            "
          >
            <div className="grid gap-8 md:grid-cols-2">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                value={form.name}
                onChange={handleChange}
                className={inputClass}
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                required
                value={form.email}
                onChange={handleChange}
                className={inputClass}
              />

              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                required
                value={form.phone}
                onChange={handleChange}
                className={inputClass}
              />

              <input
                type="text"
                name="occasion"
                placeholder="Occasion (Corporate, Wedding, Diwali...)"
                value={form.occasion}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <textarea
              rows={7}
              name="message"
              placeholder="Tell us what you're looking for..."
              required
              value={form.message}
              onChange={handleChange}
              className={`${inputClass} mt-8 w-full resize-none py-5`}
            />

            <button
              type="submit"
              className="
                mt-10
                rounded-full
                bg-[#0A3323]
                px-10
                py-4
                text-[#F7F4D5]
                font-medium
                transition-all
                duration-300
                hover:-translate-y-1
                hover:bg-[#839958]
                hover:shadow-lg
                active:translate-y-0
              "
            >
              Start Your Gifting Journey →
            </button>
          </form>
        </div>
      </section>
    </FadeIn>
  );
}
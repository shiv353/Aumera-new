"use client";

import { useState } from "react";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const message = `Hello The Aumera Gifts!%0A%0AName: ${formData.name}%0AEmail: ${formData.email}%0APhone: ${formData.phone}%0A%0AMessage: ${formData.message}`;
    const whatsappUrl = `https://wa.me/917016731747?text=${message}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    setSubmitted(true);
  };

  return (
    <section className="bg-[rgb(247_244_213)] px-6 pb-24 pt-32 text-[#2f3a3b] md:px-10 md:pt-36 lg:px-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-xl">
          <p className="mb-4 text-sm uppercase tracking-[0.35em] text-[#8a7d4d]">Contact us</p>
          <h1 className="mb-5 text-4xl font-semibold leading-tight sm:text-5xl">
            Let’s create something timeless together
          </h1>
          <p className="text-lg leading-8 text-[#4a5456]">
            Share your requirement and we’ll help you with a thoughtful gifting solution that feels refined and personal.
          </p>

          <div className="mt-8 rounded-[20px] border border-[#cfcaa8]/70 bg-[rgb(250_248_222)] p-6">
            <h2 className="mb-3 text-xl font-semibold text-[#2f3a3b]">Prefer direct contact?</h2>
            <p className="mb-2 text-[#4a5456]">Phone: +91 70167 31747</p>
            <p className="text-[#4a5456]">Location: Ahmedabad, Gujarat</p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-2xl rounded-[24px] border border-[#cfcaa8]/70 bg-[rgb(250_248_222)] p-6 text-[#2f3a3b] shadow-sm sm:p-8"
        >
          <div className="grid gap-5 md:grid-cols-2">
            <label className="block md:col-span-2">
              <span className="mb-2 block text-sm font-semibold text-[#2f3a3b]">Your name</span>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-2xl border border-[#cfcaa8]/70 bg-[rgb(252_251_238)] px-4 py-3 text-sm text-[#2f3a3b] outline-none transition focus:border-[#8a7d4d] focus:ring-2 focus:ring-[#8a7d4d]/20"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-[#2f3a3b]">Email</span>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-2xl border border-[#cfcaa8]/70 bg-[rgb(252_251_238)] px-4 py-3 text-sm text-[#2f3a3b] outline-none transition focus:border-[#8a7d4d] focus:ring-2 focus:ring-[#8a7d4d]/20"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-[#2f3a3b]">Phone</span>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full rounded-2xl border border-[#cfcaa8]/70 bg-[rgb(252_251_238)] px-4 py-3 text-sm text-[#2f3a3b] outline-none transition focus:border-[#8a7d4d] focus:ring-2 focus:ring-[#8a7d4d]/20"
              />
            </label>

            <label className="block md:col-span-2">
              <span className="mb-2 block text-sm font-semibold text-[#2f3a3b]">How can we help?</span>
              <textarea
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="w-full rounded-2xl border border-[#cfcaa8]/70 bg-[rgb(252_251_238)] px-4 py-3 text-sm text-[#2f3a3b] outline-none transition focus:border-[#8a7d4d] focus:ring-2 focus:ring-[#8a7d4d]/20"
              />
            </label>
          </div>

          <button
            type="submit"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-[#8a7d4d] px-6 py-3 text-sm font-semibold text-[rgb(247_244_213)] transition hover:bg-[#756a3f]"
          >
            Send on WhatsApp
          </button>

          {submitted ? (
            <p className="mt-4 text-sm text-[#4a5456]">Your message is ready to be sent on WhatsApp.</p>
          ) : null}
        </form>
      </div>
    </section>
  );
}

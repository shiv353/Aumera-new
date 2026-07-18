import {
  MessageCircle,
  Phone,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";

const policies = [
  {
    title: "Privacy Policy",
    icon: ShieldCheck,
    description:
      "We respect your privacy. We only collect the information necessary to process orders, communicate about shipments, and improve your experience.",
  },
  {
    title: "Refund Policy",
    icon: RotateCcw,
    description:
      "If you are not satisfied with an item, contact our support within 14 days to initiate a return and we will guide you through the process.",
  },
  {
    title: "Shipping Policy",
    icon: Truck,
    description:
      "Orders are processed within 2–4 business days, with expedited options available at checkout and tracking shared once dispatched.",
  },
];

const sections = [
  {
    title: "Collections",
    icon: Sparkles,
    links: [
      { label: "Rakhi Collection", href: "/rakhi" },
      { label: "Corporate Gifts", href: "#" },
      { label: "Festive Hampers", href: "#" },
      { label: "Personalised Gifts", href: "#" },
    ],
  },
  {
    title: "Contact",
    icon: Phone,
    links: [
      { label: "Ahmedabad, Gujarat", href: "#" },
      { label: "+91 70167 31747", href: "tel:+917016731747" },
      { label: "WhatsApp", href: "https://wa.me/917016731747" },
    ],
  },
  {
    title: "Follow Us",
    icon: MessageCircle,
    links: [
      { label: "Instagram", href: "https://www.instagram.com/theaumeragifts?igsh=NG5wa2NjanAzc2Rp&utm_source=qr" },
      { label: "Facebook", href: "https://www.facebook.com/share/1BWzBoavwt/?mibextid=wwXIfr" },
      { label: "WhatsApp", href: "https://wa.me/917016731747" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="w-full bg-[#0A3323] text-[#F7F4D5]">
      <div className="w-full px-8 py-16 md:px-16 lg:px-20 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.8fr_0.8fr_0.8fr]">
          <div>
            <img
              src="/logo.png"
              alt="The Aumera Gifts"
              className="mb-6 h-[55px] w-[170px] object-contain"
            />

            <p className="max-w-md text-xl leading-9 text-[#839958] md:text-xl">
              Luxury gifting, thoughtfully curated.
              <br />
              Designed to celebrate every occasion with elegance.
            </p>
          </div>

          {sections.map((section) => {
            const Icon = section.icon;

            return (
              <div key={section.title}>
                <div className="mb-4 flex items-center gap-2">
                  <Icon className="h-4 w-4 text-[#839958]" />
                  <h3 className="text-[1.05rem] font-medium tracking-wide text-[#F7F4D5] md:text-[1.4rem]">{section.title}</h3>
                </div>

                <ul className="space-y-3 text-[1.05rem] text-[#839958] md:text-[1.15rem]">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target={link.href.startsWith("http") ? "_blank" : undefined}
                        rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="transition hover:text-[#F7F4D5]"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* <div className="mt-12 border-t border-[#839958]/30 pt-8">
          <div className="mb-6 flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-[#839958]" />
            <h3 className="text-[1.05rem] font-medium tracking-wide text-[#F7F4D5]">Policies & Support</h3>
          </div>

          <div className="space-y-4">
            {policies.map((policy) => {
              const Icon = policy.icon;

              return (
                <div
                  key={policy.title}
                  className="rounded-xl border border-[#839958]/20 bg-[#113d2c] px-4 py-4"
                >
                  <div className="mb-2 flex items-center gap-2">
                    <Icon className="h-4 w-4 text-[#839958]" />
                    <h4 className="text-[1rem] font-medium text-[#F7F4D5]">{policy.title}</h4>
                  </div>
                  <p className="text-[0.95rem] leading-7 text-[#839958]">{policy.description}</p>
                </div>
              );
            })}
          </div>
        </div> */}

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-[#839958]/30 pt-8 md:flex-row">
          <p className="text-[1rem] text-[#839958] md:text-[1.05rem]">
            © {new Date().getFullYear()} The Aumera Gifts. All Rights Reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-[1rem] text-[#839958] md:text-[1.05rem]">
            <a href="#" className="transition hover:text-[#F7F4D5]">
              Privacy Policy
            </a>
            <a href="#" className="transition hover:text-[#F7F4D5]">
              Terms & Conditions
            </a>
            <a href="#" className="transition hover:text-[#F7F4D5]">
              Shipping Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
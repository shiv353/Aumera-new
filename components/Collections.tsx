import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Collections() {
  const collections = [
    {
      title: "Rakhi Collection",
      desc: "Thoughtfully curated hampers celebrating sibling bonds.",
      href: "/products",
      image:
        "https://images.unsplash.com/photo-1692902288471-4beec045f56d?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Corporate Gifts",
      desc: "Premium gifting solutions for meaningful partnerships.",
      href: "/products",
      image:
        "https://images.unsplash.com/photo-1635166304779-8ebcfe8e57bd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y29ycG9yYXRlJTIwZ2lmdHxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      title: "Festive Collection",
      desc: "Elegant gifts crafted for every celebration.",
      href: "/products",
      image:
        "https://images.unsplash.com/photo-1700788629800-ad3a0b202054?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGRpd2FsaSUyMGdpZnRzfGVufDB8fDB8fHww",
    },
    {
      title: "Personalised",
      desc: "Made specially to create unforgettable memories.",
      href: "/products",
      image:
        "https://images.unsplash.com/photo-1512911325838-de9e0bc5d464?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cGVyc29uYWxpc2VkJTIwZ2lmdHxlbnwwfHwwfHx8MA%3D%3D",
    },
  ];

  return (
    <section className="bg-[#F7F4D5] px-6 sm:px-8 md:px-20 py-24 md:py-32">
      <div className="max-w-[1400px] mx-auto">
        
        <div className="text-center mb-16 md:mb-24">
          <p className="text-[#839958] tracking-[5px] text-sm mb-5 uppercase font-medium">
            Explore
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-[#0A3323] leading-tight mb-8">
            Our Collections
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
          {collections.map((item) => (
            <Link 
              key={item.title} 
              href={item.href}
              className="group block bg-[#F7F4D5] text-[#0A3323] rounded-[35px] p-4 sm:p-6 luxury-hover"
            >
              {/* Image Container with original rounding but taller elegant aspect ratio */}
              <div className="relative aspect-[3/4] md:aspect-[4/5] rounded-[25px] mb-8 overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-[2000ms] ease-out group-hover:scale-110"
                  style={{ backgroundImage: `url(${item.image})` }}
                />
              </div>

              {/* Text Content */}
              <div className="text-center px-2">
                <h3 className="text-3xl text-[#0A3323] mb-4">
                  {item.title}
                </h3>
                <p className="text-[#0A3323]/80 text-base leading-relaxed mb-6">
                  {item.desc}
                </p>
                
                {/* Elegant subtle interactive element to replace the need for card backgrounds */}
                <div className="inline-flex items-center justify-center gap-2 text-[#839958] text-sm tracking-[2px] uppercase font-medium group-hover:text-[#0A3323] transition-colors">
                  <span>Discover</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}

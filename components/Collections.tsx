import Link from "next/link";

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
      title: "Personalised Gifts",
      desc: "Made specially to create unforgettable memories.",
      href: "/products",
      image:
        "https://images.unsplash.com/photo-1512911325838-de9e0bc5d464?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cGVyc29uYWxpc2VkJTIwZ2lmdHxlbnwwfHwwfHx8MA%3D%3D",
    },
  ];

  return (
    <section className="bg-[#F7F4D5] px-8 md:px-20 py-28">
      <div className="text-center mb-16">
        <p className="text-[#839958] tracking-[5px] text-sm mb-5">EXPLORE</p>

        <h2 className="text-5xl">Our Collections</h2>
      </div>

      <div className="grid md:grid-cols-4 gap-8">
        {collections.map((item) => (
          <div
            key={item.title}
            className="bg-[#F7F4D5] text-[#0A3323] rounded-[35px] p-8 luxury-hover"
          >
            <div
              className="h-[280px] rounded-[25px] mb-8 overflow-hidden bg-cover bg-center"
              style={{ backgroundImage: `url(${item.image})` }}
            />

            <h3 className="text-3xl mb-3">{item.title}</h3>

            <p className="mb-4">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function Products() {
  const products = [
    {
      name: "Aumera Royale",
      price: "₹999",
      desc: "Premium festive gifting experience."
    },
    {
      name: "Aumera Classic",
      price: "₹899",
      desc: "Elegant gifting for meaningful moments."
    },
    {
      name: "Aumera Essentials",
      price: "₹799",
      desc: "Beautifully curated everyday gifting."
    },
    {
      name: "Aumera Luxe",
      price: "₹1299",
      desc: "The ultimate expression of luxury."
    },
    {
      name: "Aumera Petite",
      price: "₹499",
      desc: "A sweet token of appreciation."
    }
  ];

  return (
    <section className="bg-[#0A3323] text-[#F7F4D5] px-6 sm:px-8 md:px-20 py-24 md:py-32">
      <div className="max-w-[1400px] mx-auto">
        
        <div className="text-center mb-16 md:mb-24">
          <p className="text-[#839958] tracking-[5px] text-sm mb-5 uppercase font-medium">
            SIGNATURE COLLECTION
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl leading-tight mb-8">
            The Aumera Edit
          </h2>
        </div>

        {/* Centered flex grid: Automatically places 3 on top row, 2 centered on bottom row */}
        <div className="flex flex-wrap justify-center gap-6 lg:gap-8">
          {products.map((product) => (
            <div
              key={product.name}
              className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-22px)] max-w-[340px] bg-[#F7F4D5] text-[#0A3323] rounded-[35px] p-5 sm:p-6 luxury-hover"
            >
              <div className="
                aspect-square
                bg-[#839958]
                rounded-[25px]
                mb-6
                flex
                items-center
                justify-center
                text-[#F7F4D5]
              ">
                Product Image
              </div>
  
              <h3 className="text-2xl mb-2 text-center">
                {product.name}
              </h3>
  
              <p className="mb-4 text-sm text-center text-[#0A3323]/80">
                {product.desc}
              </p>
  
              <div className="text-center">
                <span className="text-lg font-medium">
                  {product.price}
                </span>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
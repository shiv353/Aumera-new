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
      }
    ];
  
  
    return (
  
      <section className="bg-[#0A3323] text-[#F7F4D5] px-8 md:px-20 py-28">
  
  
        <div className="text-center mb-16">
  
          <p className="text-[#839958] tracking-[5px] text-sm mb-5">
            SIGNATURE COLLECTION
          </p>
  
  
          <h2 className="text-5xl">
            The Aumera Edit
          </h2>
  
        </div>
  
  
  
        <div className="grid md:grid-cols-3 gap-10">
  
  
          {products.map((product) => (
  
            <div
              key={product.name}
              className="bg-[#F7F4D5] text-[#0A3323] rounded-[35px] p-8 luxury-hover"
            >
  
  
              <div className="
                h-[280px]
                bg-[#839958]
                rounded-[25px]
                mb-8
                flex
                items-center
                justify-center
                text-[#F7F4D5]
              ">
                Product Image
              </div>
  
  
  
              <h3 className="text-3xl mb-3">
                {product.name}
              </h3>
  
  
              <p className="mb-4">
                {product.desc}
              </p>
  
  
              <span className="text-xl">
                {product.price}
              </span>
  
  
            </div>
  
          ))}
  
  
        </div>
  
  
      </section>
  
    );
  }
export default function RakhiPage() {
    return (
      <main className="min-h-screen bg-[#F7F4D5] text-[#0A3323] px-8 md:px-20 py-20">
        <p className="uppercase tracking-[5px] text-[#839958] mb-4">
          Rakhi Collection
        </p>
  
        <h1 className="text-5xl md:text-7xl mb-6">
          Celebrate Every
          <br />
          Sibling Bond
        </h1>
  
        <p className="max-w-2xl text-lg mb-16">
          Explore our thoughtfully curated Rakhi hampers,
          handcrafted to make every celebration memorable.
        </p>
  
        <div className="grid md:grid-cols-3 gap-8">
  
          <div className="rounded-[30px] overflow-hidden border border-[#839958] bg-white">
  
            <div className="h-72 bg-[#839958] flex items-center justify-center text-[#F7F4D5]">
              Rakhi Hamper Image
            </div>
  
            <div className="p-6">
  
              <h2 className="text-2xl mb-2">
                Nazariya
              </h2>
  
              <p className="mb-4">
                Evil Eye Rakhi Hamper
              </p>
  
              <p className="text-xl font-semibold">
                ₹499
              </p>
  
            </div>
  
          </div>
  
        </div>
  
      </main>
    );
  }
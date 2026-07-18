const products = [
  {
    _id: "1",
    title: "Executive Desk Hamper",
    price: "₹2,499",
    coverImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1200&q=80"
    ],
    alt: "Premium desk accessories gift set",
    description: "A thoughtfully curated hamper with premium desk accessories for the modern professional.",
    category: "Hampers",
    quantity: 12,
    contains: "Premium desk accessories;Elegant packaging;Thoughtful stationery",
    createdAt: new Date().toISOString()
  },
  {
    _id: "2",
    title: "Festive Luxe Box",
    price: "₹3,299",
    coverImage: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&w=1200&q=80"
    ],
    alt: "Festive gift box with wrapped items",
    description: "Seasonal premium selection with refined packaging and curated treats.",
    category: "Gift Sets",
    quantity: 8,
    contains: "Luxury wrapping;Curated treats;Festive accessories",
    createdAt: new Date().toISOString()
  },
  {
    _id: "3",
    title: "Wellness Essentials",
    price: "₹1,899",
    coverImage: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1608755728617-aefab37d2edd?auto=format&fit=crop&w=1200&q=80"
    ],
    alt: "Wellness gift products with candles and skincare",
    description: "Calming self-care items including candles, tea, and skincare for a restorative experience.",
    category: "Self Care",
    quantity: 15,
    contains: "Skincare essentials;Tea blend;Aromatherapy candle",
    createdAt: new Date().toISOString()
  },
  {
    _id: "4",
    title: "Artisan Treat Crate",
    price: "₹2,799",
    coverImage: "https://images.unsplash.com/photo-1481391319762-47dff72954d9?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1481391319762-47dff72954d9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80"
    ],
    alt: "Artisan food treats in a gift arrangement",
    description: "A selection of small-batch artisan treats sourced from local producers.",
    category: "Treats",
    quantity: 10,
    contains: "Artisan chocolates;Local snacks;Handcrafted packaging",
    createdAt: new Date().toISOString()
  },
  {
    _id: "5",
    title: "New Joiner Kit",
    price: "₹1,599",
    coverImage: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&w=1200&q=80"
    ],
    alt: "Modern workplace kit with notebooks and devices",
    description: "Welcome kit for new joiners including stationery, a mug, and onboarding essentials.",
    category: "Corporate",
    quantity: 6,
    contains: "Notebook set;Travel mug;Welcome card",
    createdAt: new Date().toISOString()
  }
];

export default products;

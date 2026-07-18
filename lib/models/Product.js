import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    price: { type: String, required: true },
    coverImage: { type: String, required: true },
    images: { type: [String], default: [] },
    alt: { type: String, required: true },
    description: { type: String, default: "" },
    category: { type: String, default: "Gift Sets" },
    rating: { type: Number, default: 4.5, min: 0, max: 5 }
  },
  { timestamps: true }
);

export default mongoose.models.Product || mongoose.model("Product", productSchema);

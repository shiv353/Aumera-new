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
    quantity: { type: Number, default: 0, min: 0 },
    contains: { type: String, default: "" }
  },
  { timestamps: true }
);

export default mongoose.models.Product || mongoose.model("Product", productSchema);

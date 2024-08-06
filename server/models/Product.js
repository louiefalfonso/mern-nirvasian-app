import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { type: String },
  sku: { type: String },
  description: { type: String },
  amount: { type: String },
  quantity: { type: String },
  type: {
    type: String,
    enum: [
      "Raw Materials",
      "Finished Goods",
      "Perishable Goods",
      "Hazardous Materials",
      "High-Value Goods",
      "Others",
    ],
  },
  status: {
    type: String,
    enum: ["In Stock", "Out Of Stock"],
  },
});

export default mongoose.model("Product", ProductSchema);

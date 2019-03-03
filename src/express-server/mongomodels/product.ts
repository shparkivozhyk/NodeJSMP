import { model, Schema } from "mongoose";

const ProductSchema: Schema = new Schema({
  id: String,
  title: String,
  price: String,
  reviews: String,
});

export const Product = model("Product", ProductSchema);

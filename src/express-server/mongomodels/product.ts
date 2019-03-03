import { model, Schema } from "mongoose";

const ProductSchema: Schema = new Schema({
  id: String,
  title: String,
  price: String,
  reviews: String,
  lastModifiedDate: Date,
});

ProductSchema.pre("save", function () {
  this["lastModifiedDate"] = new Date();
});

export const Product = model("Product", ProductSchema);

import { model, Schema } from "mongoose";

const ProductSchema: Schema = new Schema({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    minlength: [5, "Too short product title"],
  },
  price: String,
  reviews: {
    type: String,
    default: "No reviews for the product",
  },
  lastModifiedDate: Date,
});

ProductSchema.pre("save", function () {
  this["lastModifiedDate"] = new Date();
});

export const Product = model("Product", ProductSchema);

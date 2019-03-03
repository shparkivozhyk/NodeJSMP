import { model, Schema } from "mongoose";

const CitySchema: Schema = new Schema({
  name: String,
  country: String,
  capital: Boolean,
  location: {
    lat: Number,
    long: Number,
  },
});

export const City = model("City", CitySchema);

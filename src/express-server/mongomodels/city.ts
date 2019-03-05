import { model, Schema } from "mongoose";

const CitySchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: [2, "Too short city name"],
  },
  country: String,
  capital: {
    type: Boolean,
    default: false,
  },
  location: {
    lat: Number,
    long: Number,
  },
  lastModifiedDate: Date,
});

CitySchema.pre("save", function () {
  this["lastModifiedDate"] = new Date();
});

CitySchema.pre("findOneAndUpdate", function () {
  this.update({}, {
    $set: {
      lastModifiedDate: new Date(),
    },
  });
});

export const City = model("City", CitySchema);

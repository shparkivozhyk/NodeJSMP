import { model, Schema } from "mongoose";

const UserSchema: Schema = new Schema({
  username: String,
  email: String,
  password: String,
  lastModifiedDate: Date,
});

UserSchema.pre("save", function () {
  this["lastModifiedDate"] = new Date();
});

export const User = model("User", UserSchema);

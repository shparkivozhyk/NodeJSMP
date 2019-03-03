import { model, Schema } from "mongoose";

const UserSchema: Schema = new Schema({
  username: String,
  email: String,
  password: String,
});

export const User = model("User", UserSchema);

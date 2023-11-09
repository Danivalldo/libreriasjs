import { Schema, model } from "mongoose";

const userSchema = new Schema({
  username: String,
  pass: String,
});

const User = model("User", userSchema);

export default User;

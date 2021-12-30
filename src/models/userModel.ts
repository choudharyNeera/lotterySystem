import mongoose, { Schema, Model } from "mongoose";
import { connectDB } from "../db";

interface IUser extends mongoose.Document {
  name: string;
  username: string;
  password: String;
  credit: Number;
  userType: String;
  createdAt: Date;
}
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  credit: {
    type: Number,
    require: true,
    default: 1000,
  },
  userType: {
    type: String,
    enum: ["ADMIN", "USER"],
    default: "USER",
    min: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User =
  (mongoose.models.User as Model<IUser>) ||
  mongoose.model<IUser>("User", UserSchema);
export default User;

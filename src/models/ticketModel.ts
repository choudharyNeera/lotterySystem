import mongoose, { Schema, Model } from "mongoose";
import { connectDB } from "../db";

interface ITicket extends mongoose.Document {
  name: string;
  code: string;
  price: Number;
  reward: Number;
  maxCount: Number;
  available: Number;
  createdAt: Date;
}
const TicketSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: String,
    required: true,
    min: 1,
  },
  reward: {
    type: Number,
    require: true,
    default: 1,
  },
  maxCount: {
    type: Number,
    default: 5,
    min: 0,
  },
  available: {
    type: Number,
    default: 5,
    min: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Ticket =
  (mongoose.models.Ticket as Model<ITicket>) ||
  mongoose.model<ITicket>("Ticket", TicketSchema);
export default Ticket;

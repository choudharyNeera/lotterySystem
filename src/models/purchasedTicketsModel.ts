import mongoose, { isValidObjectId, Schema } from "mongoose";
import { connectDB } from "../db";
import User from "../models/userModel";
import Ticket from "../models/ticketModel";

const ObjectId = require("mongoose").Types.ObjectId;

interface IpurchasedTicket extends mongoose.Document {
  userId: String;
  ticketId: string;
  status: Boolean;
  createdAt: Date;
}
const PurchasedTicketSchema = new mongoose.Schema({
  userId: {
    type: ObjectId,
    ref: "userModel",
    required: true,
  },
  ticketId: {
    type: ObjectId,
    ref: "ticketModel",
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const PurchasedTicket = mongoose.model<IpurchasedTicket>(
  "PurchasedTicket",
  PurchasedTicketSchema
);
export default PurchasedTicket;

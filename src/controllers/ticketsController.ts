import { RequestHandler } from "express";
import Ticket from "../models/ticketModel";

export const allTickets: RequestHandler = async (req, res, next) => {
  let tickets = await Ticket.find().select(
    "_id code price maxCount available "
  );
  res.json({ status: 200, message: "Available tickets", tickets: tickets });
};

export const createTicket: RequestHandler = async (req, res, next) => {
  try {
    const role = res.locals.jwt.role;
    if (role == "ADMIN") {
      // create ticket
    } else {
      res.json({ status: 400, message: "Unauthorized access" });
    }
  } catch {
    res.json({ status: 400, message: "Some error occured" });
  }
};

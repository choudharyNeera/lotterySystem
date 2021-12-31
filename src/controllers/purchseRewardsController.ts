import { RequestHandler } from "express";
import Ticket from "../models/ticketModel";
import User from "../models/userModel";
import PurchasedTicket from "../models/purchasedTicketsModel";

interface IAllowPurchase {
  allowedPurchase: Boolean;
  message: String;
}
export const purchaseTicket: RequestHandler = async (req, res, next) => {
  if (res.locals.jwt.role == "USER") {
    const ticketId = req.params.ticketId;
    const foundTicket = await Ticket.findById(ticketId).select(
      "price available"
    );

    const userId = res.locals.jwt.id;
    const userDetail = await User.findById(userId).select("credit ");

    const required = {
      userId: userId,
      ticketId: ticketId,
      price: foundTicket!.price,
      availability: foundTicket!.available,
      credit: userDetail!.credit,
    };

    const canPurchaseLottery: IAllowPurchase = await allowForPurchase(required);
    if (canPurchaseLottery.allowedPurchase == true) {
      const finalPurchase = await purchaseLottery(required);
      if (finalPurchase == true) {
        res.json({ status: 200, message: "Ticket purchased" });
      } else {
        res.json({ status: 500, message: "Something went wrong" });
      }
    } else {
      res.json({ status: 400, message: canPurchaseLottery.message });
    }
  } else {
    res.json({
      status: 400,
      message: "Only users are allowed to purchase lottery",
    });
  }
};

async function allowForPurchase(required): Promise<any> {
  var allowedPurchaseObject = { allowedPurchase: false, message: "" };
  const purchasedTicket = await PurchasedTicket.find({
    userId: required.userId,
    ticketId: required.ticketId,
    status: true,
  });
  if (purchasedTicket.length == 0) {
    if (required.credit > required.price) {
      if (required.availability > 0) {
        allowedPurchaseObject.allowedPurchase = true;
      } else {
        allowedPurchaseObject.message = "Ticket not available for purchase";
      }
    } else {
      allowedPurchaseObject.message = "Insufficient balance";
    }
  } else {
    allowedPurchaseObject.message = "Already purchased";
  }
  return allowedPurchaseObject;
}

async function purchaseLottery(required): Promise<boolean> {
  var lotteryPurchased = false;
  const purchasedLottery = new PurchasedTicket({
    userId: required.userId,
    ticketId: required.ticketId,
  });

  try {
    purchasedLottery.save();
    const balance = required.credit - required.price;
    const newAvailable = required.availability - 1;
    await User.findByIdAndUpdate(required.userId, {
      $set: { credit: balance },
    });

    await Ticket.findByIdAndUpdate(required.ticketId, {
      $set: { available: newAvailable },
    });

    lotteryPurchased = true;
  } catch {
    lotteryPurchased = false;
  }

  return lotteryPurchased;
}

export const findWinner: RequestHandler = async (req, res, next) => {
  const TicketId = req.params.ticketId;
  const ticketData = await Ticket.findById(TicketId).select(
    "reward maxCount code"
  );
  const UsersWithTicket = await PurchasedTicket.find({
    ticketId: TicketId,
  });

  var userIds: String[] = [];

  UsersWithTicket.forEach((singleObject) => {
    userIds.push(singleObject.userId);
  });
  const max = UsersWithTicket.length - 1;
  const min = 0;
  const randomNo = Math.floor(Math.random() * (max - min + 1) + min);

  const userData = await User.findById(userIds[randomNo]).select("name credit");
  const totalCredit = Number(userData!.credit) + Number(ticketData!.reward);

  try {
    const updateCredit = await User.findByIdAndUpdate(userIds[randomNo], {
      credit: totalCredit,
    });

    const updateTicketAvailability = await Ticket.findByIdAndUpdate(TicketId, {
      available: ticketData!.maxCount,
    });

    const updateStatusOfPurchase = await PurchasedTicket.updateMany(
      {
        ticketId: TicketId,
        userId: { $in: userIds },
      },
      { status: false }
    );

    res.json({
      status: 200,
      message: "Winner is declared",
      winner: `Winner for ${ticketData!.code} is ${userData!.name} `,
    });
  } catch {
    res.json({
      status: 400,
      message: "Something went wrong",
    });
  }
};

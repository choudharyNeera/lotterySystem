import jwt from "jsonwebtoken";
const config = require("config");
import User from "../models/userModel";
import { RequestHandler } from "express";

export const middleware: RequestHandler = async (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    res.json({ status: 401, message: "Unauthorized access" });
  } else {
    try {
      const decoded = <any>jwt.verify(token, config.get("jwtToken"));
      res.locals.jwt = decoded.user;
      next();
    } catch (err) {
      res.json({ status: 400, message: "Incorrect token" });
    }
  }
};

export default middleware;

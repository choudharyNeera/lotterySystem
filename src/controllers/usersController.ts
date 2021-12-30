import { RequestHandler } from "express";
import User from "../models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const config = require("config");

export const createUser: RequestHandler = async (req, res, next) => {
  const userData = req.body;
  if (userData.name && userData.username && userData.password) {
    const userExist = await User.findOne({ username: userData.username });
    if (userExist) {
      res.json({ status: 400, message: "Username already exisits" });
    } else {
      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(userData.password, salt);

      const user = await new User({
        name: userData.name,
        username: userData.username,
        password: password,
        credit: 1000,
        userType: "USER",
      });

      user.save();
      res.json({
        status: 200,
        message: "User sign up successfully",
        data: user,
      });
    }
  } else {
    res.json({ status: 400, message: "Input missing" });
  }
};

export const login: RequestHandler = async (req, res, next) => {
  const userData = req.body;
  if (userData.username && userData.password) {
    const userExist = await User.findOne({ username: userData.username });
    if (userExist) {
      const isMatch = await bcrypt.compare(
        userData.password,
        <string>userExist.password
      );

      if (!isMatch) {
        res.json({ status: 400, message: "Invalid password" });
      } else {
        const payload = {
          user: {
            id: userExist.id,
            role: userExist.userType,
          },
        };

        jwt.sign(
          payload,
          config.get("jwtToken"),
          { expiresIn: 3600 },
          (err, token) => {
            if (err) throw err;
            res.json({
              status: 200,
              message: "User Logged in successfully",
              token: token,
            });
          }
        );
      }
    } else {
      res.json({ status: 400, message: "Invalid username" });
    }
  } else {
    res.json({ status: 400, message: "Input missing" });
  }
};

export const profileDetail: RequestHandler = async (req, res, next) => {
  try {
    const userId = res.locals.jwt.id;
    const details = await User.findOne({ _id: userId }).select(
      "_id name credit "
    );

    if (details) {
      res.json({ status: 200, message: "profile details", data: details });
    } else {
      res.json({ status: 400, message: "Invalid token" });
    }
  } catch {
    res.json({ status: 400, message: "Some error occured" });
  }
};

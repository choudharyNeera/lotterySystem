import { connect } from "http2";

const mongoose = require("mongoose");
const config = require("config");

const db = config.get("DB_URL");

// export const connectDB = mongoose.connect(db);

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`db connected to ${db}`);
  } catch {
    console.log("error");
  }
};

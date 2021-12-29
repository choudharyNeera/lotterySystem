import express from "express";
import usersRoutes from "./routes/users";
import ticketsRoutes from "./routes/tickets";
import authRoutes from "./routes/auth";
import * as bodyParser from "body-parser";
import { connectDB } from "./db";

const app = express();
app.use(bodyParser.json());

app.use("/users", usersRoutes);
app.use("/tickets", ticketsRoutes);
app.use("/", authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on ${PORT}`));
console.log(connectDB());

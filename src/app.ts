import express from "express";
import usersRoutes from "./routes/users";
import ticketsRoutes from "./routes/tickets";

const app = express();

app.use("/user", usersRoutes);
app.use("/ticket", ticketsRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on ${port}`));

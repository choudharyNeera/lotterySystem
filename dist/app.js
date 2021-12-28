"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = __importDefault(require("./routes/users"));
const tickets_1 = __importDefault(require("./routes/tickets"));
const app = (0, express_1.default)();
app.use("/user", users_1.default);
app.use("/ticket", tickets_1.default);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on ${port}`));

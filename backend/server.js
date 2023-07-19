import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import http from "http";
import colors from "colors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import {
  authenticationError,
  errorHandler,
  notFound,
  validationError,
} from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import promocodeRoutes from "./routes/promocodeRoutes.js";

connectDB();
dotenv.config();
const app = express();
app.use(cookieParser());
const server = http.createServer(app);
app.use(express.static("uploads"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
  }),
);
app.use(paymentRoutes);
app.use(userRoutes);
app.use(promocodeRoutes);
app.use(errorHandler);
app.use(notFound);
app.use(authenticationError);
app.use(validationError);
server.listen(
  process.env.PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port http://localhost:${process.env.PORT}`
      .yellow.bold,
  ),
);

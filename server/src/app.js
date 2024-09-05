import express from "express";
import { config } from "dotenv";
import NodeCache from "node-cache";
import cors from "cors";
import cookieParser from "cookie-parser";

// importing routes
import userRoute from "./routes/user.js";
import productRoute from "./routes/product.js";
import categoryRoute from "./routes/category.js";
import orderRoute from "./routes/order.js";
import reviewRoute from "./routes/review.js";
import { connectDB } from "./utils/features.js";
import { errorMiddleware } from "./middlewares/error.js";

config({
  path: "./.env",
});

const port = process.env.PORT;

export const cacheData = new NodeCache();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

//using routes
app.use("/api/v1/users", userRoute);
app.use("/api/v1/products", productRoute);
app.use("/api/v1/categories", categoryRoute);
app.use("/api/v1/orders", orderRoute);
app.use("/api/v1/reviews", reviewRoute);

app.use(errorMiddleware);

app.listen(port, () => {
  connectDB();
  console.log(`Backend server is running on http://localhost:${port}`);
});

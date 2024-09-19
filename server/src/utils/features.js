import mongoose from "mongoose";
import Product from "../models/product.js";
import { cacheData } from "../app.js";
import Review from "../models/review.js";

export const findAverageRatings = async (productId) => {
  let totalRating = 0;
  let totalReviews = 0;

  const reviews = await Review.find({ productId: productId });

  if (reviews.length === 0) {
    return {
      numOfReviews: 0,
      ratings: 0,
      numOfRatings: 0,
    };
  }
  for (const review of reviews) {
    totalRating += review.rating;
    if (review.comment) totalReviews += 1;
  }

  const averageRating = totalRating / reviews.length;

  return {
    numOfReviews:totalReviews,
    ratings: averageRating.toFixed(2),
    numOfRatings: reviews.length
  };
};

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DEV_MONGO_URI);
    console.log("Connected to mongoDB");
  } catch (error) {
    console.log(error);
  }
};

export const invalidateCache = async ({
  admin,
  product,
  productId,
  category,
  userId,
  order,
  orderId,
  review,
}) => {
  if (review) {
    cacheData.del(`reviews-${productId}`);
  }

  if (product) {
    const productKeys = ["latest-products", "all-categories"];

    const products = await Product.find({}).select("_id");

    if (productId) productKeys.push(`product-${productId}`);

    products.forEach((i) => {
      productKeys.push(`product-${i._id}`);
    });

    cacheData.del(productKeys);
  }

  if (category) {
    cacheData.del("all-categories");
  }

  if (order) {
    const orderKeys = ["all-orders", `my-orders-${userId}`, `order-${orderId}`];

    cacheData.del(orderKeys);
  }
};

export const reduceStock = async (products) => {
  for (let i = 0; i < products.length; i++) {
    const order = products[i];
    const product = await Product.findById(order.productId);
    if (!product) throw new Error("Productnot found");

    product.stock -= order.quantity;
    await product.save();
  }
};

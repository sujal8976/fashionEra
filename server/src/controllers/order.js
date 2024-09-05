import { cacheData } from "../app.js";
import Order from "../models/order.js";
import { invalidateCache, reduceStock } from "../utils/features.js";
import ErrorHandler from "../utils/utility-class.js";

export const myOrders = async (req, res, next) => {
  const { userId } = req.params;

  const key = `my-orders=${userId}`;

  let orders;

  if (cacheData.has(key)) orders = JSON.parse(cacheData.get(key));
  else {
    orders = await Order.find({ userId });
    if (!orders) return next(new ErrorHandler("No orders", 404));

    cacheData.set(key, JSON.stringify(orders));
  }

  return res.status(200).json({
    success: true,
    orders,
  });
};

export const allOrders = async (req, res, next) => {
  const key = "all-orders";

  let orders;

  if (cacheData.has(key)) orders = JSON.parse(cacheData.get(key));
  else {
    orders = await Order.find().populate("userId", "firstName");
    if (!orders) return next(new ErrorHandler("No orders Found", 404));

    cacheData.set(key, JSON.stringify(orders));
  }

  return res.status(200).json({
    success: true,
    orders,
  });
};

export const getSingleOrder = async (req, res, next) => {
  const { orderId } = req.params;
  const key = `order-${orderId}`;

  let order;
  if (cacheData.has(key)) order = JSON.parse(cacheData.get(key));
  else {
    order = await Order.findById(orderId);
    if (!order) return next(new ErrorHandler("No order Found", 404));

    cacheData.set(key, JSON.stringify(order));
  }

  return res.status(200).json({
    success: true,
    order,
  });
};

export const newOrder = async (req, res, next) => {
  const { userId, products, totalPrice, shippingAddress } = req.body;

  if (!shippingAddress || !userId || !products || !totalPrice)
    return next(new ErrorHandler("Add all fields", 400));

  const order = await Order.create({
    userId,
    products,
    totalPrice,
    shippingAddress,
  });

  await reduceStock(products);

  await invalidateCache({
    product: true,
    productId: order.products.map((i) => String(i.productId)),
    order: true,
    userId: userId,
    category: true,
  });

  return res.status(201).json({
    success: true,
    message: "Order Placed Sucsessfully",
  });
};

export const processOrder = async (req, res, next) => {
  const { orderId } = req.params;

  const order = await Order.findById(orderId);
  if (!order) return next(new ErrorHandler("No orders Found", 404));

  switch (order.orderStatus) {
    case "Pending":
      order.orderStatus = "Shipped";
      break;

    case "Shipped":
      order.orderStatus = "Delivered";
      break;

    default:
      order.orderStatus = "Delivered";
      break;
  }

  await order.save();

  await invalidateCache({
    product: false,
    order: true,
    admin: true,
    userId: order.userId,
    orderId: String(order._id),
  });

  return res.status(200).send("Order Proccessed Successfully");
};

export const deleteOrder = async (req, res, next) => {
  const { orderId } = req.params;

  await Order.deleteOne();

  await invalidateCache({
    product: false,
    order: true,
    admin: true,
    userId: order.user,
    orderId: String(orderId),
  });

  return res.status(200).send("Order Deleted Successfully");
};

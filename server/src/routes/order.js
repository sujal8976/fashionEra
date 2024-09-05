import express from "express";
import {
  myOrders,
  newOrder,
  allOrders,
  processOrder,
  getSingleOrder,
  deleteOrder,
} from "../controllers/order.js";
import { wrapAsync } from "../middlewares/wrapAsync.js";

const router = express.Router();

router.post("/new", wrapAsync(newOrder));
router.get("/myOrders/:userId", wrapAsync(myOrders));

//admin
router.get("/allOrders", wrapAsync(allOrders));

router
  .route("/order/:orderId")
  .get(wrapAsync(getSingleOrder))
  .put(wrapAsync(processOrder))
  .delete(wrapAsync(deleteOrder));

export default router;

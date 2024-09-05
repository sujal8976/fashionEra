import express from "express";
import {
  newReview,
  allReviewsOfProduct,
  deleteReview,
} from "../controllers/review.js";
import { wrapAsync } from "../middlewares/wrapAsync.js";

const router = express.Router();

router.post("/:userId/:productId/new", wrapAsync(newReview));
router.delete("/:userId/:reviewId", wrapAsync(deleteReview));
router.get("/:productId", wrapAsync(allReviewsOfProduct));

export default router;

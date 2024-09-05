import { cacheData } from "../app.js";
import Review from "../models/review.js";
import Product from "../models/product.js";
import User from "../models/user.js";
import ErrorHandler from "../utils/utility-class.js";
import { findAverageRatings, invalidateCache } from "../utils/features.js";

export const allReviewsOfProduct = async (req, res, next) => {
  let reviews;
  const key = `reviews-${req.params.productId}`;

  if (cacheData.has(key)) reviews = JSON.parse(cacheData.get(key));
  else {
    reviews = await Review.find({
      productId: req.params.productId,
    })
      .populate("authorId", "firstName lastName")
      .sort({
        updatedAt: -1,
      });
    if (!reviews) return next(new ErrorHandler("reviews not found", 404));

    cacheData.set(key, JSON.stringify(reviews));
  }

  invalidateCache({
    product: true,
    productId: String(req.params.productId),
    admin: true,
    review: true,
  });

  return res.status(200).json({
    success: true,
    reviews,
  });
};

export const newReview = async (req, res, next) => {
  const user = await User.findById(req.params.userId);
  if (!user) return next(new ErrorHandler("User not found", 404));

  const product = await Product.findById(req.params.productId);
  if (!product) return next(new ErrorHandler("Product Not Found", 404));

  const { comment, rating } = req.body;

  const allreadyReviewed = await Review.findOne({
    authorId: req.params.userId,
    productId: req.params.productId,
  });

  if (allreadyReviewed) {
    allreadyReviewed.comment = comment;
    allreadyReviewed.rating = rating;

    await allreadyReviewed.save();
  } else {
    await Review.create({
      comment,
      rating,
      authorId: req.params.userId,
      productId: req.params.productId,
    });
  }

  const { ratings, numOfReviews } = await findAverageRatings(product._id);

  product.ratings = ratings;
  product.numOfReviews = numOfReviews;

  await product.save();

  await invalidateCache({
    product: true,
    productId: String(product._id),
    admin: true,
    Review: true,
  });

  return res.status(allreadyReviewed ? 200 : 201).json({
    success: true,
    message: allreadyReviewed ? "Review updated" : "Review Added",
  });
};

export const deleteReview = async (req, res, next) => {
  const user = await User.findById(req.params.userId);
  if (!user) return next(new ErrorHandler("User not Found", 404));

  const review = await Review.findById(req.params.reviewId);
  if (!review) return next(new ErrorHandler("Review not Found", 404));

  const isAuthenticUser = review.authorId.toString() === user._id.toString();
  if (!isAuthenticUser) return next(new ErrorHandler("Not Authorized", 401));

  await review.deleteOne();

  const product = await Product.findById(review.productId);
  if (!product) return next(new ErrorHandler("Product not Found", 404));

  const { ratings, numOfReviews } = await findAverageRatings(product._id);

  product.ratings = ratings;
  product.numOfReviews = numOfReviews;

  await product.save();

  await invalidateCache({
    product: true,
    productId: String(product._id),
    admin: true,
  });

  return res.status(200).json({
    success: true,
    message: "Review Deleted",
  });
};

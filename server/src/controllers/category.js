import { cacheData } from "../app.js";
import Category from "../models/category.js";
import { invalidateCache } from "../utils/features.js";
import ErrorHandler from "../utils/utility-class.js";

export const newCategory = async (req, res, next) => {
  const newCat = await Category.create(req.body);

  await invalidateCache({ category: true });
  return res
    .status(201)
    .json({ success: true, message: "new Cat created", newCat });
};

export const allCategories = async (req, res, next) => {
  let categories;
  const key = "all-categories";

  if (cacheData.has(key)) categories = JSON.parse(cacheData.get(key));
  else {
    categories = await Category.find({})
      .populate({
        path: "parentCategory",
        select: "catName _id",
      })
      .sort({ catName: 1 });
    if (!categories) return next(new ErrorHandler("No Category Found", 404));
    cacheData.set(key, JSON.stringify(categories));
  }

  return res.status(200).json({ success: true, categories });
};

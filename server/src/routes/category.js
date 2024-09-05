import express from "express";
import { allCategories, newCategory } from "../controllers/category.js";
import { wrapAsync } from "../middlewares/wrapAsync.js";

const router = express.Router();

router.get("/", wrapAsync(allCategories));
router.post("/newCat", wrapAsync(newCategory));

export default router;

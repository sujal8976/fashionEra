import express from "express";
import { wrapAsync } from "../middlewares/wrapAsync.js";
import {
  newProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  getLatestProducts,
  getBrands,
} from "../controllers/product.js";

const router = express.Router();

//admin // has to be costumize for images upload
router.post("/newProduct", wrapAsync(newProduct));
// get all products with filters
router.get("/all", wrapAsync(getAllProducts));
// to get latest products
router.get("/latest", wrapAsync(getLatestProducts));
// to get all brands names , not unique
router.get("/brand", wrapAsync(getBrands));
router
  .route("/:id") //get single product
  .get(wrapAsync(getProduct))
  .put(wrapAsync(updateProduct)) //admin
  .delete(wrapAsync(deleteProduct)); //admin
export default router;

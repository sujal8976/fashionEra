import express from "express";
import {
  newRegister,
  login,
  getUser,
  logout,
  isUserExist,
} from "../controllers/user.js";
import { wrapAsync } from "../middlewares/wrapAsync.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/", wrapAsync(isUserExist));
router.post("/new", wrapAsync(newRegister));
router.post("/login", wrapAsync(login));
router
  .route("/:id")
  .get(verifyToken, wrapAsync(getUser))
  .post(verifyToken, wrapAsync(logout));

export default router;

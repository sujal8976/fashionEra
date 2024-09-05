import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/utility-class.js";

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) return next(new ErrorHandler("You are not Authenticated", 400));

    const decoded = await new Promise((resolve, reject) => {
      jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
          console.log(err);
          reject(err);
        } else resolve(decoded);
      });
    });

    req.userId = decoded._id;
    next();
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler("Failed to Authenticate", 401));
  }
};

import User from "../models/user.js";
import ErrorHandler from "../utils/utility-class.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const isUserExist = async (req, res, next) => {
  const { email } = req.body;

  if (!email) return next(new ErrorHandler("Email not Provided", 401));

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(200).json({
      userExist: false,
    });
  }

  return res.status(200).json({
    userExist: true,
  });
};

export const newRegister = async (req, res, next) => {
  const { googleId, name, email, gender, image, phone, password } = req.body;

  if (!name || !email || !gender || !password) {
    return next(new ErrorHandler("Please add all fields", 400));
  }

  const passwordHash = await bcrypt.hash(password, 10);

  let user = await User.findOne({ email });
  if (user) {
    return next(new ErrorHandler("Already Signed In with this email", 400));
  }

  if (googleId) {
    let user = await User.findOne({ googleId });
    if (user) return next(new ErrorHandler("Already Signed In", 400));
  }

  const newUser = new User({
    googleId,
    name,
    email,
    gender,
    phone,
    passwordHash,
    image,
  });

  await newUser.save();

  const payload = {
    _id: newUser._id.toString(),
    isAdmin: newUser.isAdmin,
    email: newUser.email,
  };

  if (newUser.googleId) payload.googleId = newUser.googleId;

  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);

  return res
    .status(201)
    .cookie("accessToken", token, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    })
    .json({
      success: true,
      message: `Welcome, ${newUser.name}`,
      userId: newUser._id.toString(),
    });
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(new ErrorHandler("Fields are missing", 400));

  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return next(new ErrorHandler("Invalid Email or Password", 400));
  }

  const payload = {
    _id: user._id.toString(),
    isAdmin: user.isAdmin,
    email: user.email,
  };

  if (user.googleId) payload.googleId = user.googleId;

  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);

  return res
    .status(200)
    .cookie("accessToken", token, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    })
    .json({
      success: true,
      message: `Welcome Back! ${user.name}`,
      userId: user._id.toString(),
    });
};

export const logout = async (req, res, next) => {
  const id = req.params.id;

  if (req.userId && req.userId !== id) {
    return next(new ErrorHandler("Authorization Failed", 401));
  }

  const user = await User.findById(id);
  if (!user) return next(new ErrorHandler("User Not Found", 404));

  res.clearCookie("accessToken", {
    httpOnly: true,
    sameSite: "strict",
  });

  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

export const getUser = async (req, res, next) => {
  const id = req.params.id;

  if (req.userId && req.userId !== id) {
    return next(new ErrorHandler("Authorization Failed", 401));
  }

  const user = await User.findById(id);
  if (!user) return next(new ErrorHandler("User not Found", 404));

  const userObj = user.toObject();
  delete userObj.passwordHash;

  return res.status(200).json({
    success: true,
    userData: userObj,
  });
};

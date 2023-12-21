// Authentication
import ErrorResponse from "../utils/errorResponse.js";
import asyncHandler from "./../middleware/asyncHandler.js";
import User from "../models/User.js";
import { sendTokenResponse } from "../utils/sendTokenResponse.js";

// @desc    Register user
// @router  POST /api/v1/auth/register
// @access  Public
const register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  // Create user (from the model static function - create)
  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  // Create token
  const token = user.getSignedJwtToken();

  res.status(200).json({ success: true, token });
});

// @desc    Login user
// @router  POST /api/v1/auth/login
// @access  Public
const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate email & password
  if (!email || !password) {
    return next(new ErrorResponse("Please provide an email and password", 400));
  }

  // Check for user
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  // Check if password matches (the entered password comes from "body")
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  // Debugging output
  console.log("User found:", user);
  console.log("Password matched:", isMatch);

  // Send token response
  sendTokenResponse(user, 200, res);
});


// @desc    Log user out / clear cookie
// @router  GET /api/v1/auth/logout
// @access  Private
const logout = asyncHandler(async (req, res, next) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  })

  res.status(200).json({
    success: true,
    data: {}
  });
});



// @desc    GET current logged in user
// @router  GET /api/v1/auth/me
// @access  Private
const getMe = asyncHandler(async (req, res, next) => {
  // const user = await User.findById(req.user.id);
  const user = req.user; // (protect)

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc    Update user details
// @router  PUT /api/v1/auth/updatedetails
// @access  Private
const updateDetails = asyncHandler(async (req, res, next) => {
  const fieldsToUpdate = {
    name: req.body.name,
    email: req.body.email,
  };

  const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc    Update password
// @router  PUT /api/v1/auth/updatepassword
// @access  Private
const updatePassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  console.log("PUT user", user)
  // Check current password
  if (!(await user.matchPassword(req.body.currentPassword))) {
    return next(new ErrorResponse("Password is incorrect", 401));
  }

  user.password = req.body.newPassword;
  await user.save();

  sendTokenResponse(user, 200, res);
});




export { register, login, logout, getMe };

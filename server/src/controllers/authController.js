import { createUser } from "../models/authModel.js";
import { verifyRefreshToken, saveRefreshToken } from "../../utils/tokensUtils.js";
import { generateTokens } from "../../utils/tokensUtils.js";
import {
  setAccessTokenCookie,
  setRefreshTokenCookie,
} from "../../utils/cookiesUtils.js";
import { getUserByEmail, getUserById } from "../models/userModel.js";
import bcrypt from "bcrypt";
import { asyncHandler } from "../middleware/asyncHandlerMiddleware.js";

// Register a new user
export const register = asyncHandler(async (req, res) => {
  const { name, email, phone, password, role } = req.validateData;
  if (!name || !email || !phone || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return res.status(400).json({ message: "Email already exists" });
  }

  const hashed_password = await bcrypt.hash(password, 10);
  const newUser = await createUser(
    name,
    email,
    phone,
    hashed_password,
    role,
    true,
  );
  if (!newUser) {
    return res.status(400).json({ message: "Failed to create user" });
  }
  return res
    .status(201)
    .json({ message: "User registered successfully", user: newUser });
});
// Login user
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.validateData;
  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
    const user = await getUserByEmail(email);
    if (!user) {
      return res
        .status(400)
        .json({ message: "User not register, please register first" });
    }
    // Check password
    const isMatch = await bcrypt.compare(password, user.hashed_password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Email or password is incorrect" });
    }
    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(user);

    // Set cookies
    setAccessTokenCookie(res, accessToken);
    setRefreshTokenCookie(res, refreshToken);
    // Send response
    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        userid: user.userid,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
});
// Logout user
export const logout = asyncHandler(async (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "No refresh token provided",
      });
    }
    const decoded = verifyRefreshToken(token);
    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Invalid refresh token",
      });
    }
    await saveRefreshToken(decoded.userid, null);
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Logout failed",
      error: error.message,
    });
  }
});
// current user
export const currentUser = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await getUserById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({
      message: "Current user retrieved successfully",
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
    });
  } catch (error) {
    console.log(" Error fetching current user:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
});

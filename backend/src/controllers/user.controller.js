import { asyncHandler } from "../utils/asyncHandler.js";
import { APIError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { Op } from "sequelize";
import bcrypt from "bcrypt";
const registerUser = asyncHandler(async (req, res) => {
  const { name, phone, email, password } = req.body;

  // Validate input fields
  if (!name || !email || !password) {
    throw new APIError(400, "Name, email, and password are required.");
  }

  // Check if email or phone already exists
  const existingUser = await User.findOne({
    where: {
      [Op.or]: [
        { email: email },
        phone ? { phone: phone } : null
      ].filter(Boolean) // remove null if phone is not provided
    }
  });

  if (existingUser) {
    throw new APIError(409, "Email or phone already registered.");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  // Create user (password hashing via hook)
  const newUser = await User.create({ 
    name, 
    phone, 
    email, 
    password: hashedPassword 
    
});

  // Generate and store refresh token
  const refreshToken = newUser.generateRefreshToken();
  await newUser.save(); // save token to DB

  res.status(201).json({
    success: true,
    message: "User registered successfully.",
    user: {
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone
    },
    refreshToken
  });
});

export { registerUser };

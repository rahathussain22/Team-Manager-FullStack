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

  res.status(201).json({
    success: true,
    message: "User registered successfully.",
    user: {
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone
    },
  });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validate input fields
  if (!email || !password) {
    throw new APIError(400, "Email and password are required.");
  }

  // Check if user with the provided email exists
  const user = await User.findOne({
    where: {
      email: email
    }
  });

  console.log("User found:", user); // Debugging log to check if the user is found

  if (!user) {
    throw new APIError(401, "Invalid email or password.");
  }

  // // Trim spaces from the password input (just in case)
  // const trimmedPassword = password.trim();

  // Compare the hashed password with the input password
  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  console.log("Password matches:", isPasswordCorrect); // Debugging line to check the comparison result

  if (!isPasswordCorrect) {
    throw new APIError(401, "Invalid email or password.");
  }

  // If successful, return the user information (exclude the password)
  res.status(200).json({
    success: true,
    message: "Login successful.",
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone
    },
  });
});


export { registerUser, loginUser };

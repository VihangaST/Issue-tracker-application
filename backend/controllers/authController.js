import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const loginUser = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    console.log("Received login request:", { email, password });

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "Invalid email or password" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(404).json({ message: "Invalid email or password" });
    }

    const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// registerUser function to handle user registration
export const registerUser = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;
    console.log("Received registration request:", {
      email,
      password,
      confirmPassword,
    });

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Already registered with this email" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await User.create({
      email,
      password: hashedPassword,
      confirmPassword,
    });
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser.id,
        email: newUser.email,
        confirmPassword: newUser.confirmPassword,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

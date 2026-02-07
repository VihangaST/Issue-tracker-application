import User from "../models/User.js";

export const loginUser = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    console.log("Received login request:", { email, password });

    const user = await User.findOne({ where: { email } });

    if (!user || user.password !== password) {
      return res.status(404).json({ message: "Invalid email or password" });
    }

    res.json({
      message: "Login successful",
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
    const newUser = await User.create({ email, password, confirmPassword });
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

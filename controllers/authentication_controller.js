const User = require("../schemes/user_scheme");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { JWT_SECRET } = process.env;

const SALT_ROUNDS = 10;

async function register(req, res) {
  try {
    const { password, ...restOfUser } = req.body;

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const user = new User({
      password: hashedPassword,
      ...restOfUser,
    });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log("register", error);
    if (error.code === 11000) {
      console.log("username already exists");
      return res.status(400).json({ error: "User already exists" });
    }
    res.status(500).json({ error: "Registration failed" });
  }
}

async function logIn(req, res) {
  console.log("login");

  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Authentication failed" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ error: "Authentication failed" });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({ token });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Login failed" });
  }
}

module.exports = { register, logIn };

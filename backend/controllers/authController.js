const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Sample user data (replace with your own user model)
const users = [
  { id: 1, username: "john", email: "j.john@gmail.com", password: "password1" },
  { id: 2, username: "jane", email: "jane2063@aws.com", password: "password2" },
];

// Register a new user
async function register(req, res) {
  try {
    const { name: username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    // Save the user to your database or any storage mechanism
    // createUser({ name, email, password})

    res.status(201).json({ message: "User registered successfully" });
  } catch (e) {
    console.error("register Error", e.message);
    res.status(500).json({ error: "Registration failed" });
  }
}

////////////////////////////////////////////////////////////////
// Log In --> Generate & Send JWT Token
////////////////////////////////////////////////////////////////
async function login(req, res) {
  try {
    const { username, password } = req.body;
    const user = users.find((user) => user.username === username);
    const passwordMatch = await bcrypt.compare(password, user.password);

    // Check Authentication
    if (!user) return res.status(401).json({ error: "Authentication failed" });
    if (!passwordMatch)
      return res.status(401).json({ error: "Authentication failed" });

    // Get new Access & Refresh Tokens
    const accessToken = generateToken(user, process.env.TOKEN_SECRET, 60 * 15);
    const refreshToken = generateToken(user, process.env.REFRESH_SECRET, "2h");
    console.log("accessToken", accessToken);
    console.log("refreshToken", typeof refreshToken, refreshToken);

    // Add Refresh Token to Token List in DB
    addRefreshTokenToDB();
    // Return Tokens to Client
    res.json({ accessToken, refreshToken });
  } catch (e) {
    console.error("Login Error", e.message);
    res.status(500).json({ error: "Login failed" });
  }
}

// Helper Function: Generate New Access/Refresh JWT Token
const generateToken = (user, secret, expiresInValue) =>
  jwt.sign(user, secret, { expiresIn: expiresInValue });

async function addRefreshTokenToDB() {
  try {
    const tokenList = await dal.getAllRefreshTokens();
    const result = await dal.addRefreshToken(refreshToken, tokenList);
    console.log("addRefreshToken result", result);
  } catch (err) {
    console.error("addRefreshToken Error:", err.message);
  }
}

module.exports = {
  register,
  login,
};

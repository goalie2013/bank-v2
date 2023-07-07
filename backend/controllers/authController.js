const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register a new user
async function register(req, res) {
  const saltRounds = 10;
  try {
    console.log("req.body", req.body);
    const { username, email, password } = req.body;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Save the user to your database or any storage mechanism
    // createUser({ name, email, password})
    console.log("username", username, "hashedPassword", hashedPassword);

    res.status(201).json({ message: "User registered successfully" });
  } catch (e) {
    console.error("register Error:", e.message);
    res.status(500).json({ error: "Registration failed" });
  }
}

////////////////////////////////////////////////////////////////
// Log In --> Generate & Send JWT Token
////////////////////////////////////////////////////////////////
async function login(req, res) {
  console.log("authController login()");
  try {
    const user = req.user;

    // Get new Access & Refresh Tokens
    const accessToken = generateToken(user, process.env.TOKEN_SECRET, 60 * 15);
    const refreshToken = generateToken(user, process.env.REFRESH_SECRET, "2h");
    console.log("accessToken", accessToken);
    console.log("refreshToken", typeof refreshToken, refreshToken);

    // Add Refresh Token to Token List in DB
    addRefreshTokenToDB();
    // Return tokens to Client
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

////////////////////////////////////////////////////////////////
// Log In via OAuth2 Token --> Generate & Send JWT Token
////////////////////////////////////////////////////////////////
async function loginGoogle(req, res) {
  const { idToken } = req.body;

  /*
  // Verify the ID token with the OAuth2 provider
  // verifyOAuth2Token(idToken) # placeholder function
  //   .then((userData) => {
  //     const { userId, email } = userData;

  // Check if user exists in DB
  const user = getUserByEmail(email);
  if (!user) return res.status(401).json({ error: "User not found" });

  // Generate JWT token
  const token = jwt.sign({ userId, email }, "secretKey", { expiresIn: "1h" });

  // Return token to Client
  res.json({ token });
  // END OF .then()
  /* .catch((error) => {
      // Handle error when verifying the OAuth2 token
      res.status(401).json({ error: 'Invalid OAuth2 token' });
    }); 
  */
}

module.exports = {
  register,
  login,
  loginGoogle,
};

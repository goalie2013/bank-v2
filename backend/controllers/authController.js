const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dal = require("../dal");
const colors = require("colors");

////////////////////////////////////////////////////////////////
// Register a new user
////////////////////////////////////////////////////////////////
async function register(req, res) {
  console.log("register()");
  const saltRounds = 10;
  try {
    console.log("req.body", req.body);
    const { username, email, password } = req.body;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Save the user to your database or any storage mechanism
    // createUser({ name, email, password, authLevel})
    console.log("username", username, "hashedPassword", hashedPassword);

    res.status(201).json({ message: "User registered successfully" });
  } catch (e) {
    console.error("register Error:", colors.red(e.message));
    res.status(500).json({ error: "Registration failed" });
  }
}

////////////////////////////////////////////////////////////////
// Log In --> Generate & Send JWT Token
////////////////////////////////////////////////////////////////
// Sample user data (replace with your own user model)
const users = [
  { id: 1, username: "john", email: "j.john@gmail.com", password: "password1" },
  { id: 2, username: "jane", email: "jane2063@aws.com", password: "password2" },
];

async function checkUserAuthentication(req, res, next) {
  console.log("checkUserAuthentication()");

  const { username, password } = req.body;
  let user, passwordMatch;

  try {
    // const users = await dal.getAllUsers();
    user = users.find((user) => user.username === username);
    // passwordMatch = await bcrypt.compare(password, user.password);
    passwordMatchTemp = password === user.password;
  } catch (e) {
    console.error("Login Error:", colors.red(e.message));
    return res.sendStatus(400);
  }

  console.log(user, typeof password, passwordMatchTemp);
  // Check Authentication
  if (!user) return res.status(401).json({ error: "Authentication failed" });
  if (!passwordMatchTemp)
    return res.status(401).json({ error: "Authentication failed" });

  req.user = user;
  next();
}

function getNewTokens(req, res, next) {
  console.log("getNewTokens()");

  try {
    const user = req.user;

    // Get new Access & Refresh Tokens
    const accessToken = generateToken(user, process.env.TOKEN_SECRET, 60 * 15);
    const refreshToken = generateToken(user, process.env.REFRESH_SECRET, "2h");
    console.log("accessToken", accessToken, "\n");
    console.log("refreshToken", typeof refreshToken, refreshToken, "\n");

    req.tokens = { accessToken, refreshToken };
    next();
    // Return tokens to Client
    // res.json({ accessToken, refreshToken });
  } catch (e) {
    console.error("Login Error", colors.red(e.message));
    res.status(500).json({ error: "Login failed" });
  }
}

////////////////////////////////////////////////////////////////
// Add Refresh Token to Token List in DB
////////////////////////////////////////////////////////////////
function addRefreshTokenToDB(req, res, next) {
  console.log("addRefreshTokenToDB()");

  // try {
  //   const tokenList = await dal.getAllRefreshTokens();
  //   const result = await dal.addRefreshToken(refreshToken, tokenList);
  //   console.log("addRefreshToken result", result);
  //   next();
  // } catch (err) {
  //   console.error("addRefreshToken Error:", colors.red(e.message));
  //   res.status(500).json({ error: "Login failed" });
  // }

  next();
}

// Send Tokens to Client
function loginSuccess(req, res) {
  return (req, res) => {
    console.log("End of /login/google post -> SUCCESS!!");
    const { accessToken, refreshToken } = req.tokens;
    res.json({ accessToken, refreshToken, messsage: "Login Successful" });
  };
}

// Helper Function: Generate New Access/Refresh JWT Token
const generateToken = (user, secret, expiresInValue) =>
  jwt.sign(user, secret, { expiresIn: expiresInValue });

module.exports = {
  register,
  checkUserAuthentication,
  getNewTokens,
  addRefreshTokenToDB,
  loginSuccess,
};

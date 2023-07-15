const express = require("express");
const authController = require("../controllers/authController");
const oauth = require("../middleware/oauth");

const router = express.Router();

// Register a new user
router.post(
  "/register",
  authController.register,
  authController.getNewTokens,
  authController.addRefreshTokenToDB,
  authController.loginSuccess
);

// Log in and generate a JWT
router.post(
  "/login",
  authController.checkUserAuthentication,
  authController.getNewTokens
);
// router.post("/login", authController.getNewTokens);
router.post("/login", authController.addRefreshTokenToDB, (req, res, next) => {
  console.log("End of /login post -> SUCCESS!!");
  const { accessToken, refreshToken } = req.tokens;
  res.json({ accessToken, refreshToken, messsage: "Login Successful" });
});

// router.use("/login/google", verifyOAuth2Token, saveUserToDatabase);
router.post("/login/google", oauth.saveUserToDatabase);
router.post("/login/google", authController.getNewTokens);
router.post("/login/google", authController.addRefreshTokenToDB);
router.post("/login/google", authController.loginSuccess);

module.exports = router;

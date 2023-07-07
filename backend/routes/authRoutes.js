const express = require("express");
const authController = require("../controllers/authController");
const { checkUserAuthentication } = require("../middleware/auth");

const router = express.Router();

// Register a new user
router.post("/register", authController.register);

// Log in and generate a JWT
router.use("/login", checkUserAuthentication);
router.post("/login", authController.login);
router.post("/login/google", authController.loginGoogle);

module.exports = router;

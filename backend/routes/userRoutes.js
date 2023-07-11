const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

// TODO: ? Need middleware to authenticate/authorize router.use(...) before manipulating user??
router.get("/users", userController.getAllUsers);

// router.get("/user", userController.getUserById, userController.getUserByEmail);
router.put("/user", userController.updateBalance);

module.exports = router;

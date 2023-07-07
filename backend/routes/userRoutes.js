const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.use(
  "/user/:id",
  (req, res, next) => {
    console.log("Request URL:", req.originalUrl);
    next();
  },
  (req, res, next) => {
    console.log("Request Type:", req.method);
    next();
  }
);

// a middleware sub-stack that handles GET requests to the /user/:id path
router.get(
  "/user/:id",
  (req, res, next) => {
    // if the user ID is 0, skip to the next router
    if (req.params.id === "0") next("route");
    // otherwise pass control to the next middleware function in this stack
    else next();
  },
  (req, res, next) => {
    // render a regular page
    //res.render("regular");
    next();
  }
);

// handler for the /user/:id path, which renders a special page
router.get("/user/:id", (req, res, next) => {
  console.log(req.params.id);
  res.send({ "message": "Done" });
});

module.exports = router;

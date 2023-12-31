// DEVELOPMENT ONLY
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { authenticateToken } = require("./middleware/auth");
// const dal = require("./dal");
const port = process.env.PORT || 5000;

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const MongoDB = require("./database");
const app = express();
// CORS FOR DEVELOPMENT ONLY
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// serve images, CSS files, and JS files in a directory named 'public'
app.use(express.static("public"));

// Connect to Database
// try {
//   MongoDB.connect();
// } catch (err) {
//   if (err.message === "Error connecting to Database") {
//     MongoDB.disconnect();
//     res.status(500).send("500 Internal Server Error");
//   }
// }

app.use("/auth", authRoutes);
app.use("/", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello there World!!");
});

// Protected Route requires Authorization
// by checking for valid JWT Access Token
app.get("/api/protected", authenticateToken, (req, res) => {
  console.log("/protected req.user", req.user);

  res.status(200).json({
    ...req.user,
    message: "User Authorized",
  });
});

// Run the Server
app.listen(port, "0.0.0.0", () =>
  console.log(`My server is running on port ${port}`)
);

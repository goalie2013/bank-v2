const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { authenticateToken } = require("./middleware/auth");
// const dal = require("./dal");
// const port = process.env.PORT;

const authRoutes = require("./routes/authRoutes");
const app = express();
// CORS FOR DEVELOPMENT ONLY
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// serve images, CSS files, and JS files in a directory named 'public'
app.use(express.static("public"));

app.use("/auth", authRoutes);

// Example protected route, requires a valid JWT
app.get("/protected", authenticateToken, (req, res) => {
  console.log("/authorize req.user", req.user);
  const user = req.user;

  res.json({
    message: "User Authorized",
    user,
  });
});

// Run the Server
app.listen(process.env.PORT || 5000, "0.0.0.0", () =>
  console.log(`My server is running on port ${process.env.PORT}`)
);

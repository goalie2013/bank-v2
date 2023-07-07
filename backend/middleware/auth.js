///////////////////////////////////////////////////////////////////////////////
// Middleware: Get JWT from Bearer Token Header, Verify it, and return user
///////////////////////////////////////////////////////////////////////////////
function authenticateToken(req, res, next) {
  // const authHeader = req.headers["authorization"];
  // const jwtToken = authHeader && authHeader.split(" ")[1];
  console.log("authHeader", req.headers["authorization"]);
  const jwtToken = req.headers?.split(" ")[1];
  console.log("jwtToken", jwtToken, typeof jwtToken);

  if (jwtToken == "null") {
    console.log("jwtToken is null, returning 401");
    return res.sendStatus(401).json({ error: "Authentication Failed" });
  }

  jwt.verify(jwtToken, process.env.TOKEN_SECRET, (err, user) => {
    if (err) {
      console.error("ERROR /authorize", err.message);
      // Invalid/Expired JWT --> Log User Out
      if (err.message === "jwt malformed")
        return res.sendStatus(403).json({ error: "Invalid Token" });
      return res.sendStatus(401).json({ error: "Authentication Failed" });
    } else {
      console.log("authenticateToken data", user);
      res.user = user;
      next();
    }
  });

  // Token Valid!!
  // req.token = jwtToken;
  next();
}

// Sample user data (replace with your own user model)
const users = [
  { id: 1, username: "john", email: "j.john@gmail.com", password: "password1" },
  { id: 2, username: "jane", email: "jane2063@aws.com", password: "password2" },
];

async function checkUserAuthentication(req, res, next) {
  const { username, password } = req.body;
  const user = users.find((user) => user.username === username);
  const passwordMatch = await bcrypt.compare(password, user.password);

  // Check Authentication
  if (!user) return res.status(401).json({ error: "Authentication failed" });
  if (!passwordMatch)
    return res.status(401).json({ error: "Authentication failed" });

  req.user = user;
  next();
}

module.exports = { authenticateToken, checkUserAuthentication };

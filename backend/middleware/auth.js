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

module.exports = { authenticateToken };

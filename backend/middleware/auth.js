const colors = require("colors");
const jwt = require("jsonwebtoken");

///////////////////////////////////////////////////////////////////////////////
// Middleware: Get JWT from Bearer Token Header, Verify it, and return user
///////////////////////////////////////////////////////////////////////////////
function authenticateToken(req, res, next) {
  // const authHeader = req.headers["authorization"];
  // const jwtToken = authHeader && authHeader.split(" ")[1];
  console.log("authHeader:", req.headers["authorization"]);
  const jwtToken = req.headers?.authorization.split(" ")[1];

  console.log("jwtToken:", jwtToken, typeof jwtToken);

  if (!jwtToken || jwtToken == "null") {
    console.log(colors.red("jwtToken is null, returning 401"));
    // return res.sendStatus(401).json({ error: "Authentication Failed" });
    return res.sendStatus(401);
  }

  jwt.verify(jwtToken, process.env.TOKEN_SECRET, (error, tokenData) => {
    if (error) {
      console.error("ERROR authorize: ", colors.red(error.message));
      // Invalid/Expired JWT --> Log User Out
      if (error.message === "jwt malformed")
        // return res.sendStatus(403).json({ error: "Invalid Token" });
        return res.sendStatus(403);

      // return res.sendStatus(401).json({ error: "Authentication Failed" });
      return res.sendStatus(401);
    } else {
      console.log("authenticateToken data", tokenData);
      const { name, email } = tokenData;
      req.user = { name, email };
      next();
    }
  });

  // Token Valid!!
  // req.token = jwtToken;
  // next();
}

module.exports = { authenticateToken };

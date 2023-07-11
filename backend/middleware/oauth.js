const dal = require("../dal");

function verifyOAuth2Token(req, res, next) {
  console.log("verifyOAuth2Token()");

  /*

  const { idToken } = req.body;

  const { OAuth2Client } = require("google-auth-library");
  const client = new OAuth2Client("your-google-client-id");

  async function verify() {
    try {
      const ticket = await client.verifyIdToken({
        idToken,
        audience: "your-google-client-id",
      });

      const payload = ticket.getPayload();
      const userId = payload.sub;
      const email = payload.email;
      const name = payload.name;

      console.log('payload', payload)
      console.log('userId', userId, 'email', email)
      

      // Attach the user information to the request object
      req.user = { userId, email, name };

      next();
    } catch (error) {
      console.error("Error in verify:", error.message)
      res.sendStatus(401).json({ error: "Invalid OAuth2 token" });
    }
  }

  verify();
  */
  return (req, res, next) => {
    next();
  };
}

// Middleware to save user information to the database
function saveUserToDatabase(req, res, next) {
  console.log("saveUserToDatabase()");

  return async (req, res, next) => {
    const { userId, email, name } = req.user; // Assuming the user information is attached to the request object

    // Implement your logic to save or update the user record in the database
    // This example demonstrates saving to a MongoDB database using the 'mongoose' library

    // Check if the user already exists in the database
    const { getUserByEmail, createUser, updateOAuthUser } = dal;

    try {
      const user = await getUserByEmail(email);
      console.log("user", user);

      if (user) {
        // User already exists, update the record if necessary
        user.email = email;
        user.name = name;
        const result = updateOAuthUser(user);
        console.log("result: ", result);
        req.user = user;
      } else {
        // User does not exist, create new record
        //user = new User({ userId, email, name });
        const newUser = createUser({ name, email });
        console.log(`User: ${newUser} saved to the database`);
        req.user = newUser;
      }
      next();
      // Save user record
      // return user.save();
    } catch (e) {
      console.error("Error saving user to the database:", e.message);
      res.sendStatus(500).json({ error: "Error saving user to the database" });
    }
  };
}

module.exports = { saveUserToDatabase };

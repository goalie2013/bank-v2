// DAL = Data Abstraction Layer
// ** Keeps index.js independent of what DB is used **
// This DAL is specific to MongoDB
const { User } = require("./schema/userSchema");
const { RefreshToken } = require("./schema/refreshtokenSchema");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const AuthLvl = {
  Customer: 2,
};

///////////////////////////////////////////////////////
// Get Refresh Token
///////////////////////////////////////////////////////
function getAllRefreshTokens() {
  return new Promise((resolve, reject) => {
    RefreshToken.find((err, tokens) => {
      err ? reject(err) : resolve(tokens);
    });
  });
}

///////////////////////////////////////////////////////
// Add Refresh Token to DB
///////////////////////////////////////////////////////
function addRefreshToken(token, tokenList) {
  console.log("addRefreshToken FUNCTION");
  console.log(tokenList[0]["id"]);

  return new Promise((resolve, reject) => {
    RefreshToken.findByIdAndUpdate(
      tokenList[0]["id"],
      { tokens: [...tokenList[0]["tokens"], token] },
      (err, result) => {
        console.log("addRefreshToken result:", result);
        err ? reject(err) : resolve(result);
      }
    );
  });

  // return new Promise((resolve, reject) => {
  //   newToken
  //     .save()
  //     .then((result) => resolve(result))
  //     .catch((err) => reject(err));
  // });
}

///////////////////////////////////////////////////////
// Create a User Account
// Note: Google Sign In users will NOT have a password
///////////////////////////////////////////////////////
function createUser({ name, email, password = "" }) {
  console.log("createUser()");
  console.log(typeof User);
  let newUser;

  if (password) {
    // Generate Salt
    const salt = bcrypt.genSaltSync(saltRounds);
    // Hash Password
    const hash = bcrypt.hashSync(password, salt);
    // Create User
    newUser = new User({
      name,
      email,
      password: hash,
      balance: 0,
      transactions: [],
      authLvl: AuthLvl.Customer,
    });
  } else {
    // Create User w/o Password field
    newUser = new User({
      name,
      email,
      balance: 0,
      transactions: [],
      authLvl: AuthLvl.Customer,
    });
  }
  newUser.id = newUser._id;

  console.log("newUser", newUser);
  console.log(typeof newUser);

  return new Promise((resolve, reject) => {
    // newUser.save((err) => {
    //   err ? reject(err) : resolve(newUser);
    // });
    newUser
      .save()
      .then((user) => resolve(user))
      .catch((err) => reject(err));
  });
}

///////////////////////////////////////////////////////
// Get User By ID
///////////////////////////////////////////////////////
function getUser(id) {
  return new Promise((resolve, reject) => {
    User.findById(id, (err, user) => {
      err ? reject(err) : resolve(user);
    });
  });
}

///////////////////////////////////////////////////////
// Get User By Email
///////////////////////////////////////////////////////
function getUserByEmail(email) {
  return new Promise((resolve, reject) => {
    User.findOne({ email: email }, (err, user) => {
      err ? reject(err) : resolve(user);
    });
  });
}

///////////////////////////////////////////////////////
// Get All Users
///////////////////////////////////////////////////////
function getAllUsers() {
  return new Promise((resolve, reject) => {
    User.find((err, users) => {
      err ? reject(err) : resolve(users);
    });
  });
}

///////////////////////////////////////////////////////
// Update User Info
///////////////////////////////////////////////////////
function updateOAuthUser({ id, name, email }) {
  return new Promise((resolve, reject) => {
    User.findByIdAndUpdate(id, { name, email }, (err, result) => {
      console.log("updateOAuthUser result:", result);
      err ? reject(err) : resolve(result);
    });
  });
}
///////////////////////////////////////////////////////
// Update User Balance & Transactions
///////////////////////////////////////////////////////
function updateUser(id, balance, transactions) {
  //TODO: Generate ID for each new Transaction
  return new Promise((resolve, reject) => {
    User.findByIdAndUpdate(id, { balance, transactions }, (err, result) => {
      console.log("updateUser result:", result);
      err ? reject(err) : resolve(result);
    });
  });
}

///////////////////////////////////////////////////////
// Delete User
///////////////////////////////////////////////////////
function deleteUser(id) {
  return new Promise((resolve, reject) => {
    User.findByIdAndRemove(id, (err, userDoc) => {
      err ? reject(err) : resolve(userDoc);
    });
  });
}

module.exports = {
  getAllRefreshTokens,
  addRefreshToken,
  createUser,
  getUser,
  getUserByEmail,
  getAllUsers,
  updateUser,
  deleteUser,
};

const dal = require("../dal");
const colors = require("colors");

async function getUserById(req, res, next) {
  console.log("getUserById()");

  try {
    const { id } = req.body;
    if (!id) next();
    const user = await dal.getUserById(id);
    res.status(200).json({ user });
  } catch (e) {
    console.error("ERROR getUserById", colors.red(e.message));
    res.sendStatus(500);
  }
}
async function getUserByEmail(req, res, next) {
  console.log("getUserByEmail()");

  try {
    const { email } = req.body;
    const user = await dal.getUserByEmail(email);
    res.status(200).json({ user });
  } catch (e) {
    console.error("ERROR getUserByEmail", colors.red(e.message));
    res.sendStatus(500);
  }
}

async function getAllUsers(req, res) {
  console.log("getAllUsers()");

  try {
    const users = await dal.getAllUsers();
    res.status(200).json({ users });
  } catch (e) {
    console.error("ERROR getAllUsers:", colors.red(e.message));
    res.sendStatus(500);
  }
}

async function updateBalance(req, res) {
  console.log("updateBalance()");

  try {
    const { id, balance, transactions } = req.body;
    const updatedUser = await dal.updateUser(id, balance, transactions);
    res.status(200).json({ user: updatedUser });
  } catch (e) {
    console.error("ERROR updateBalance:", colors.red(e.message));
    res.sendStatus(500);
  }
}

module.exports = { getUserById, getUserByEmail, getAllUsers, updateBalance };

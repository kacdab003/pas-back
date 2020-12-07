const express = require("express");

const {
  postAddUser,
  getAllUsers,
  getUserById,
  updateUserById,
  removeUserById,
} = require("../controllers/userController");
const router = new express.Router();

router.post("/users", postAddUser);

router.get("/users", getAllUsers);

router.get("/users/:id", getUserById);

router.patch("/users/:id", updateUserById);

router.delete("/users/:id", removeUserById);

module.exports = router;

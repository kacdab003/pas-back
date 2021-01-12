const express = require("express");
const { body } = require("express-validator");
const {
  postAddObject,
  getAllObjects,
  getObjectById,
  updateObjectById,
  removeObjectById,
} = require("../controllers/objectController");
const auth = require("../middleware/auth");
const router = new express.Router();

const validators = [
  body("name").isString(),
  body("T1").notEmpty(),
  body("T2").notEmpty(),
  body("T3").notEmpty(),
  body("C1").notEmpty(),
  body("U").isArray(),
];

router.post("/objects", validators, postAddObject);

router.get("/objects", getAllObjects);

router.get("/objects/:id", getObjectById);

router.patch("/objects/:id", validators, updateObjectById);

router.delete("/objects/:id", removeObjectById);

module.exports = router;

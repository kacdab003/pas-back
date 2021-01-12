const express = require("express");
const { body } = require("express-validator");
const {
  postAddModuleStateB,
  getAllModuleStateBs,
  getModuleStateBById,
  updateModuleStateBById,
  removeModuleStateBById,
} = require("../controllers/moduleStateBController");
const auth = require("../middleware/auth");
const router = new express.Router();

const validators = [
  body("module").isMongoId(),
  body("objectNumber").isLength({ min: 1, max: 999999 }),
  body("socket").isLength({ min: 1, max: 999999 }),
  body("period.*.from").isDate(),
  body("period.*.to").isDate(),
  body("damageDate").isDate(),
];

router.post("/moduleStateBs", auth, postAddModuleStateB);

router.get("/moduleStateBs", auth, getAllModuleStateBs);

router.get("/moduleStateBs/:id", auth, getModuleStateBById);

router.patch("/moduleStateBs/:id", auth, updateModuleStateBById);

router.delete("/moduleStateBs/:id", auth, removeModuleStateBById);

module.exports = router;

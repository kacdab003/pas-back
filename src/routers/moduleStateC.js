const express = require("express");
const { body } = require("express-validator");
const {
  postAddModuleStateC,
  getAllModuleStateCs,
  getModuleStateCById,
  updateModuleStateCById,
  removeModuleStateCById,
} = require("../controllers/moduleStateCController");
const auth = require("../middleware/auth");
const router = new express.Router();

const validators = [
  body("module").isMongoId(),
  body("repairDate").isDate(),
  body("repairWorker").isMongoId(),
  body("description").isLength({ min: 1, max: 300 }),
];

router.post("/moduleStateCs", validators, auth, postAddModuleStateC);

router.get("/moduleStateCs", auth, getAllModuleStateCs);

router.get("/moduleStateCs/:id", auth, getModuleStateCById);

router.patch("/moduleStateCs/:id", validators, auth, updateModuleStateCById);

router.delete("/moduleStateCs/:id", auth, removeModuleStateCById);

module.exports = router;

const express = require("express");
const { body } = require("express-validator");
const {
  postAddModuleStateA,
  getAllModuleStateAs,
  getModuleStateAById,
  updateModuleStateAById,
  removeModuleStateAById,
} = require("../controllers/moduleStateAController");
const auth = require("../middleware/auth");
const router = new express.Router();

const validators = [body("module").isMongoId(), body("accessDate").isDate()];

router.post("/moduleStateAs", validators, auth, postAddModuleStateA);

router.get("/moduleStateAs", auth, getAllModuleStateAs);

router.get("/moduleStateAs/:id", auth, getModuleStateAById);

router.patch("/moduleStateAs/:id", validators, auth, updateModuleStateAById);

router.delete("/moduleStateAs/:id", auth, removeModuleStateAById);

module.exports = router;

const express = require("express");
const {
  postAddModuleStateC,
  getAllModuleStateCs,
  getModuleStateCById,
  updateModuleStateCById,
  removeModuleStateCById,
} = require("../controllers/moduleStateCController");
const auth = require("../middleware/auth");
const router = new express.Router();

router.post("/moduleStateCs", auth, postAddModuleStateC);

router.get("/moduleStateCs", auth, getAllModuleStateCs);

router.get("/moduleStateCs/:id", auth, getModuleStateCById);

router.patch("/moduleStateCs/:id", auth, updateModuleStateCById);

router.delete("/moduleStateCs/:id", auth, removeModuleStateCById);

module.exports = router;

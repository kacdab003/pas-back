const express = require("express");
const {
  postAddModuleStateC,
  getAllModuleStateCs,
  getModuleStateCById,
  updateModuleStateCById,
  removeModuleStateCById,
} = require("../controllers/moduleStateCController");

const router = new express.Router();

router.post("/moduleStateCs", postAddModuleStateC);

router.get("/moduleStateCs", getAllModuleStateCs);

router.get("/moduleStateCs/:id", getModuleStateCById);

router.patch("/moduleStateCs/:id", updateModuleStateCById);

router.delete("/moduleStateCs/:id", removeModuleStateCById);

module.exports = router;

const express = require("express");
const {
  postAddModuleStateA,
  getAllModuleStateAs,
  getModuleStateAById,
  updateModuleStateAById,
  removeModuleStateAById,
} = require("../controllers/moduleStateAController");
const router = new express.Router();

router.post("/moduleStateAs", postAddModuleStateA);

router.get("/moduleStateAs", getAllModuleStateAs);

router.get("/moduleStateAs/:id", getModuleStateAById);

router.patch("/moduleStateAs/:id", updateModuleStateAById);

router.delete("/moduleStateAs/:id", removeModuleStateAById);

module.exports = router;

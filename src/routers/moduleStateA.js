const express = require("express");
const {
  postAddModuleStateA,
  getAllModuleStateAs,
  getModuleStateAById,
  updateModuleStateAById,
  removeModuleStateAById,
} = require("../controllers/moduleStateAController");
const auth = require("../middleware/auth");
const router = new express.Router();

router.post("/moduleStateAs", auth, postAddModuleStateA);

router.get("/moduleStateAs", auth, getAllModuleStateAs);

router.get("/moduleStateAs/:id", auth, getModuleStateAById);

router.patch("/moduleStateAs/:id", auth, updateModuleStateAById);

router.delete("/moduleStateAs/:id", auth, removeModuleStateAById);

module.exports = router;

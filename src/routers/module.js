const express = require("express");
const {
  postAddModules,
  getAllModules,
  getModuleById,
  updateModuleById,
  removeModuleById,
} = require("../controllers/moduleController");

const router = new express.Router();

router.post("/modules", postAddModules);

router.get("/modules", getAllModules);

router.get("/modules/:id", getModuleById);

router.patch("/modules/:id", updateModuleById);

router.delete("/modules/:id", removeModuleById);

module.exports = router;

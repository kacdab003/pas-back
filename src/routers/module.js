const express = require("express");
const {
  postAddModule,
  getAllModules,
  getModuleById,
  updateModuleById,
  removeModuleById,
} = require("../controllers/moduleController");
const auth = require("../middleware/auth");
const router = new express.Router();

router.post("/modules", postAddModule);

router.get("/modules", getAllModules);

router.get("/modules/:id", getModuleById);

router.patch("/modules/:id", updateModuleById);

router.delete("/modules/:id", removeModuleById);

module.exports = router;

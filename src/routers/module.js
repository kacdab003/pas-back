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

router.post("/modules", auth, postAddModule);

router.get("/modules", auth, getAllModules);

router.get("/modules/:id", auth, getModuleById);

router.patch("/modules/:id", auth, updateModuleById);

router.delete("/modules/:id", auth, removeModuleById);

module.exports = router;

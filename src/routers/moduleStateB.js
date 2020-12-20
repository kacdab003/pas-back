const express = require("express");
const {
  postAddModuleStateB,
  getAllModuleStateBs,
  getModuleStateBById,
  updateModuleStateBById,
  removeModuleStateBById,
} = require("../controllers/moduleStateBController");
const auth = require("../middleware/auth");
const router = new express.Router();

router.post("/moduleStateBs", auth, postAddModuleStateB);

router.get("/moduleStateBs", auth, getAllModuleStateBs);

router.get("/moduleStateBs/:id", auth, getModuleStateBById);

router.patch("/moduleStateBs/:id", auth, updateModuleStateBById);

router.delete("/moduleStateBs/:id", auth, removeModuleStateBById);

module.exports = router;

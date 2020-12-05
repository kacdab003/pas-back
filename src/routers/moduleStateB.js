const express = require("express");
const {
  getAllModuleStateBsById,
  postAddModuleStateB,
  getModuleStateBById,
  updateModuleStateBById,
  removeModuleStateBById,
} = require("../controllers/moduleStateBController");

const router = new express.Router();

router.post("/moduleStateBs", postAddModuleStateB);

router.get("/moduleStateBs", getAllModuleStateBsById);

router.get("/moduleStateBs/:id", getModuleStateBById);

router.patch("/moduleStateBs/:id", updateModuleStateBById);

router.delete("/moduleStateBs/:id", removeModuleStateBById);

module.exports = router;

const express = require("express");
const {
  postAddModuleStateB,
  getAllModuleStateBs,
  getModuleStateBById,
  updateModuleStateBById,
  removeModuleStateBById,
} = require("../controllers/moduleStateBController");

const router = new express.Router();

router.post("/moduleStateBs", postAddModuleStateB);

router.get("/moduleStateBs", getAllModuleStateBs);

router.get("/moduleStateBs/:id", getModuleStateBById);

router.patch("/moduleStateBs/:id", updateModuleStateBById);

router.delete("/moduleStateBs/:id", removeModuleStateBById);

module.exports = router;

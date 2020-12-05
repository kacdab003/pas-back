const express = require("express");
const {
  postAddObject,
  getAllObjects,
  updateObjectById,
  removeObjectById,
} = require("../controllers/objectController");
const router = new express.Router();

router.post("/objects", postAddObject);

router.get("/objects", getAllObjects);

router.get("/objects/:id", getAllObjects);

router.patch("/objects/:id", updateObjectById);

router.delete("/objects/:id", removeObjectById);

module.exports = router;

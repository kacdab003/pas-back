const express = require("express");
const {
  postAddObject,
  getAllObjects,
  getObjectById,
  updateObjectById,
  removeObjectById,
} = require("../controllers/objectController");
const auth = require("../middleware/auth");
const router = new express.Router();

router.post("/objects", auth, postAddObject);

router.get("/objects", auth, getAllObjects);

router.get("/objects/:id", auth, getObjectById);

router.patch("/objects/:id", auth, updateObjectById);

router.delete("/objects/:id", auth, removeObjectById);

module.exports = router;

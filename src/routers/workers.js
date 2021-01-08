const express = require("express");

const workersController = require("../controllers/workersController");

const router = express.Router();

router.get("/workers", workersController.getWorkers);

module.exports = router;

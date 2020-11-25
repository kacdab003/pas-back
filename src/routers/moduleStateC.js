const express = require("express");
const ModuleStateC = require("../models/ModuleStateC");
const router = new express.Router();

router.post("/moduleStateCs", async (req, res) => {
  const moduleStateC = new ModuleStateC(req.body);

  try {
    await moduleStateC.save();
    res.status(201).send(moduleStateC);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/moduleStateCs", async (req, res) => {
  try {
    const moduleStateCs = await ModuleStateC.find({});
    res.send(moduleStateCs);
  } catch (error) {
    res.status(500).send();
  }
});

router.get("/moduleStateCs/:id", async (req, res) => {
  try {
    const moduleStateC = await ModuleStateC.findById(req.params.id);

    if (!moduleStateC) {
      return res.status(404).send();
    }

    res.send(moduleStateC);
  } catch (error) {
    res.status(500).send();
  }
});

router.patch("/moduleStateCs/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "moduleNumber",
    "repairDate",
    "repairWorker",
    "description",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const moduleStateC = await ModuleStateC.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!moduleStateC) {
      return res.status(404).send();
    }

    res.send(moduleStateC);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/moduleStateCs/:id", async (req, res) => {
  try {
    const moduleStateC = await ModuleStateC.findByIdAndDelete(req.params.id);

    if (!moduleStateC) {
      return res.status(404).send();
    }

    res.send(moduleStateC);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;

const express = require("express");
const ModuleStateB = require("../models/ModuleStateB");
const router = new express.Router();

router.post("/moduleStateBs", async (req, res) => {
  const moduleStateB = new ModuleStateB(req.body);

  try {
    await moduleStateB.save();
    res.status(201).send(moduleStateB);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/moduleStateBs", async (req, res) => {
  try {
    const moduleStateBs = await ModuleStateB.find({});
    res.send(moduleStateBs);
  } catch (error) {
    res.status(500).send();
  }
});

router.get("/moduleStateBs/:id", async (req, res) => {
  try {
    const moduleStateB = await ModuleStateB.findById(req.params.id);

    if (!moduleStateB) {
      return res.status(404).send();
    }

    res.send(moduleStateB);
  } catch (error) {
    res.status(500).send();
  }
});

router.patch("/moduleStateBs/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "moduleNumber",
    "objectNumber",
    "socket",
    "period",
    "damageDate",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const moduleStateB = await ModuleStateB.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!moduleStateB) {
      return res.status(404).send();
    }

    res.send(moduleStateB);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/moduleStateBs/:id", async (req, res) => {
  try {
    const moduleStateB = await ModuleStateB.findByIdAndDelete(req.params.id);

    if (!moduleStateB) {
      return res.status(404).send();
    }

    res.send(moduleStateB);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;

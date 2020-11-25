const express = require("express");
const Module = require("../models/Module");
const router = new express.Router();

router.post("/modules", async (req, res) => {
  const module = new Module(req.body);

  try {
    await module.save();
    res.status(201).send(module);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/modules", async (req, res) => {
  try {
    const modules = await Module.find({});
    res.send(modules);
  } catch (error) {
    res.status(500).send();
  }
});

router.get("/modules/:id", async (req, res) => {
  try {
    const module = await Module.findById(req.params.id);

    if (!module) {
      return res.status(404).send();
    }

    res.send(module);
  } catch (error) {
    res.status(500).send();
  }
});

router.patch("/modules/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["moduleNumber", "type", "state"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const module = await Module.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!module) {
      return res.status(404).send();
    }

    res.send(module);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/modules/:id", async (req, res) => {
  try {
    const module = await Module.findByIdAndDelete(req.params.id);

    if (!module) {
      return res.status(404).send();
    }

    res.send(module);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;

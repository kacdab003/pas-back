const express = require("express");
const Module = require("../models/Module");
const router = new express.Router();

router.post("/modules", async (req, res) => {
  const module = new Module(req.body);

  try {
    await module.save();
    res.status(201).send(module);
  } catch (error) {
    res.status(400).send({ error: "Could not add requsted resource" });
  }
});

router.get("/modules", async (req, res) => {
  try {
    const modules = await Module.find({});
    res.send(modules);
  } catch (error) {
    res.status(500).send({ error: "Could not find requsted resource" });
  }
});

router.get("/modules/:id", async (req, res) => {
  try {
    const module = await Module.findById(req.params.id);

    if (!module) {
      return res
        .status(404)
        .send({ error: "Could not find requsted resource" });
    }

    res.send(module);
  } catch (error) {
    res.status(500).send({ error: "Could not find requsted resource" });
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
      return res
        .status(404)
        .send({ error: "Could not find requsted resource" });
    }

    res.send(module);
  } catch (error) {
    res.status(400).send({ error: "Could not update requsted resource" });
  }
});

router.delete("/modules/:id", async (req, res) => {
  try {
    const module = await Module.findByIdAndDelete(req.params.id);

    if (!module) {
      return res
        .status(404)
        .send({ error: "Could not find requsted resource" });
    }

    res.send({
      message: "Resource was deleted successfully",
      deletedModule: module,
    });
  } catch (error) {
    res.status(500).send({ error: "Could not delete requsted resource" });
  }
});

module.exports = router;

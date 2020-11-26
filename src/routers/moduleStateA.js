const express = require("express");
const ModuleStateA = require("../models/ModuleStateA");
const router = new express.Router();

router.post("/moduleStateAs", async (req, res) => {
  const moduleStateA = new ModuleStateA(req.body);

  try {
    await moduleStateA.save();
    res.status(201).send(moduleStateA);
  } catch (error) {
    res.status(400).send({ error: "Could not add requsted resource" });
  }
});

router.get("/moduleStateAs", async (req, res) => {
  try {
    const moduleStateAs = await ModuleStateA.find({});
    res.send(moduleStateAs);
  } catch (error) {
    res.status(500).send({ error: "Could not find requsted resource" });
  }
});

router.get("/moduleStateAs/:id", async (req, res) => {
  try {
    const moduleStateA = await ModuleStateA.findById(req.params.id);

    if (!moduleStateA) {
      return res
        .status(404)
        .send({ error: "Could not find requsted resource" });
    }

    res.send(moduleStateA);
  } catch (error) {
    res.status(500).send({ error: "Could not find requsted resource" });
  }
});

router.patch("/moduleStateAs/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["moduleNumber", "accessDate"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const moduleStateA = await ModuleStateA.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!moduleStateA) {
      return res
        .status(404)
        .send({ error: "Could not find requsted resource" });
    }

    res.send(moduleStateA);
  } catch (error) {
    res.status(400).send({ error: "Could not update requsted resource" });
  }
});

router.delete("/moduleStateAs/:id", async (req, res) => {
  try {
    const moduleStateA = await ModuleStateA.findByIdAndDelete(req.params.id);

    if (!moduleStateA) {
      return res
        .status(404)
        .send({ error: "Could not find requsted resource" });
    }

    res.send({
      message: "Resource was deleted successfully",
      deletedModuleStateA: moduleStateA,
    });
  } catch (error) {
    res.status(500).send({ error: "Could not delete requsted resource" });
  }
});

module.exports = router;

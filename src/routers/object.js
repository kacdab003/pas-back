const express = require("express");
const Object = require("../models/Object");
const router = new express.Router();

router.post("/objects", async (req, res) => {
  const object = new Object(req.body);

  try {
    await object.save();
    res.status(201).send(object);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/objects", async (req, res) => {
  try {
    const objects = await Object.find({});
    res.send(objects);
  } catch (error) {
    res.status(500).send();
  }
});

router.get("/objects/:id", async (req, res) => {
  try {
    const object = await Object.findById(req.params.id);

    if (!object) {
      return res.status(404).send();
    }

    res.send(object);
  } catch (error) {
    res.status(500).send();
  }
});

router.patch("/objects/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "T1", "T2", "T3", "C1", "U"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const object = await Object.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!object) {
      return res.status(404).send();
    }

    res.send(object);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/objects/:id", async (req, res) => {
  try {
    const object = await Object.findByIdAndDelete(req.params.id);

    if (!object) {
      return res.status(404).send();
    }

    res.send(object);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;

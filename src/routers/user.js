const express = require("express");
const User = require("../models/User");
const validateUpdates = require("../scripts/validateUpdates");
const router = new express.Router();

router.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send({ error: "Could not add requsted resource" });
  }
});

router.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(500).send({
      error: "Could not find requsted resource",
      details: error.toString(),
    });
  }
});

router.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res
        .status(404)
        .send({ error: "Could not find requsted resource" });
    }

    res.send(user);
  } catch (error) {
    res.status(500).send({
      error: "Could not find requsted resource",
      details: error.toString(),
    });
  }
});

router.patch("/users/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "surname", "position", "password"];
  const validUpdates = validateUpdates(updates, allowedUpdates);

  if (validUpdates) {
    return res.status(400).send(validUpdates);
  }

  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res
        .status(404)
        .send({ error: "Could not find requsted resource" });
    }

    res.send(user);
  } catch (error) {
    res.status(400).send({ error: "Could not update requsted resource" });
  }
});

router.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res
        .status(404)
        .send({ error: "Could not find requsted resource" });
    }

    res.send({
      message: "Resource was deleted successfully",
      deletedUser: user,
    });
  } catch (error) {
    res.status(500).send({
      error: "Could not delete requsted resource",
      details: error.toString(),
    });
  }
});

module.exports = router;

const express = require("express");

const validateUpdate = (updates, allowedUpdates) => {
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  const invalidUpdates = updates
    .filter((update) => !allowedUpdates.includes(update))
    .join(", ");

  if (!isValidOperation) {
    return {
      error:
        "Invalid updates! Fields " + invalidUpdates + " should not be updated!",
    };
  }
};

module.exports = validateUpdate;

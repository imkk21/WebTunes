const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/", async (req, res) => {
  try {
    const { uid, displayName, email, profilePicture } = req.body;

    let user = await User.findOne({ firebaseUID: uid });

    if (!user) {
      user = await User.create({ firebaseUID: uid, displayName, email, profilePicture });
    }

    res.json(user);
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;

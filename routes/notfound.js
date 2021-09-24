const express = require("express");
const router = express.Router();

router.get("*", (req, res) => {
  res.status(404).render("404", {
    layout: "index",
  });
});

module.exports = router;

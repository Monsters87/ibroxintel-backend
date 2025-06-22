const express = require("express");
const router = express.Router();

// Health check route
router.get("/", (req, res) => {
  res.send("IbroxIntel backend is live!");
});

// Example route: scrape trigger (if needed later)
router.get("/scrape", (req, res) => {
  // Placeholder logic
  res.send("Scraping not yet implemented.");
});

// Example route: player stats (stubbed)
router.get("/players", (req, res) => {
  // Placeholder response
  res.json([
    { name: "Player One", position: "Midfielder", value: "£2M" },
    { name: "Player Two", position: "Defender", value: "£1.5M" }
  ]);
});

module.exports = router;

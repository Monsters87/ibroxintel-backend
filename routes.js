const express = require("express");
const router = express.Router();
const db = require("./db");
const runScraper = require("./scraper");

// 🔥 Add this line at the top:
const rumoursRouter = require("./rumours");

// Existing routes:
router.get("/", (req, res) => {
  res.send("IbroxIntel backend is live!");
});

router.get("/scrape", async (req, res) => {
  try {
    await runScraper();
    res.send("✅ Scraping complete.");
  } catch (error) {
    res.status(500).send("❌ Scraping failed.");
  }
});

router.get("/players", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM players");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch players" });
  }
});

// 🔥 Mount the rumours router:
router.use("/rumours", rumoursRouter);

module.exports = router;

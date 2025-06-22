const express = require("express");
const router = express.Router();
const db = require("./db");
const runScraper = require("./scraper");

// Health check
router.get("/", (req, res) => {
  res.send("IbroxIntel backend is live!");
});

// Create players table
router.get("/init-db", async (req, res) => {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS players (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        position TEXT NOT NULL,
        value TEXT
      );
    `);
    await db.query(`
      CREATE TABLE IF NOT EXISTS rumours (
        id SERIAL PRIMARY KEY,
        player TEXT NOT NULL,
        source TEXT NOT NULL,
        credibility TEXT
      );
    `);
    res.send("✅ Players and rumours tables created (or already exist).");
  } catch (error) {
    console.error(error);
    res.status(500).send("❌ Failed to create tables.");
  }
});

// View players
router.get("/players", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM players");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching players:", error);
    res.status(500).json({ error: "Failed to fetch players" });
  }
});

// View rumours
router.get("/rumours", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM rumours");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching rumours:", error);
    res.status(500).json({ error: "Failed to fetch rumours" });
  }
});

// Clear all rumours
router.get("/rumours/clear", async (req, res) => {
  try {
    await db.query("DELETE FROM rumours");
    res.send("✅ All rumours deleted.");
  } catch (error) {
    console.error("❌ Failed to delete rumours:", error);
    res.status(500).send("❌ Failed to delete rumours.");
  }
});

// Manual scraper
router.get("/scrape", async (req, res) => {
  try {
    await runScraper();
    res.send("✅ Scraping and database update complete.");
  } catch (error) {
    console.error(error);
    res.status(500).send("❌ Scraping failed.");
  }
});

module.exports = router;

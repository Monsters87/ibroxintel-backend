const express = require("express");
const router = express.Router();
const db = require("./db");
const runScraper = require("./scraper");
const runRumourScraper = require("./rumours");

// Health check
router.get("/", (req, res) => {
  res.send("✅ IbroxIntel backend is live!");
});

// Init players table
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
    res.send("✅ Players table created (or already exists).");
  } catch (error) {
    console.error(error);
    res.status(500).send("❌ Failed to create players table.");
  }
});

// Init rumours table
router.get("/init-rumours", async (req, res) => {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS rumours (
        id SERIAL PRIMARY KEY,
        player TEXT NOT NULL,
        source TEXT NOT NULL,
        credibility TEXT
      );
    `);
    res.send("✅ Rumours table created (or already exists).");
  } catch (error) {
    console.error(error);
    res.status(500).send("❌ Failed to create rumours table.");
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

// Manual scrape players
router.get("/scrape", async (req, res) => {
  try {
    await runScraper();
    res.send("✅ Players scraping complete.");
  } catch (error) {
    console.error(error);
    res.status(500).send("❌ Scraping players failed.");
  }
});

// Manual scrape rumours
router.get("/scrape-rumours", async (req, res) => {
  try {
    await runRumourScraper();
    res.send("✅ Rumours scraping complete.");
  } catch (error) {
    console.error(error);
    res.status(500).send("❌ Scraping rumours failed.");
  }
});

// Clear and re-scrape rumours
router.get("/reset", async (req, res) => {
  try {
    await db.query("DELETE FROM rumours");
    await runRumourScraper();
    res.send("♻️ Rumours reset and reloaded.");
  } catch (error) {
    console.error(error);
    res.status(500).send("❌ Reset failed.");
  }
});

module.exports = router;

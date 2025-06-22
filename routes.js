const express = require("express");
const router = express.Router();
const db = require("./db"); // ✅ REQUIRED
const runScraper = require("./scraper"); // ✅ for /scrape route

// Health check
router.get("/", (req, res) => {
  res.send("✅ IbroxIntel backend is live!");
});

// Init DB
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

// Scrape dummy data
router.get("/scrape", async (req, res) => {
  try {
    await runScraper();
    res.send("✅ Scraping complete.");
  } catch (error) {
    console.error(error);
    res.status(500).send("❌ Scraping failed.");
  }
});

// View players
router.get("/players", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM players");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("❌ Failed to fetch players.");
  }
});

// View rumours
router.get("/rumours", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM rumours");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("❌ Failed to fetch rumours.");
  }
});

module.exports = router; // ✅ MANDATORY

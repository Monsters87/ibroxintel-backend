const express = require("express");
const router = express.Router();
const db = require("./db");
const runScraper = require("./scraper");

// Health check
router.get("/", (req, res) => {
  res.send("IbroxIntel backend is live!");
});

// Initialize database
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
        player_name TEXT NOT NULL,
        source TEXT NOT NULL,
        link TEXT,
        credibility TEXT
      );
    `);

    res.send("✅ Tables created (or already exist).");
  } catch (error) {
    console.error("❌ DB init error:", error);
    res.status(500).send("❌ Failed to initialize database.");
  }
});

// View players
router.get("/players", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM players");
    res.json(result.rows);
  } catch (error) {
    console.error("❌ Error fetching players:", error);
    res.status(500).json({ error: "Failed to fetch players" });
  }
});

// View rumours
router.get("/rumours", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM rumours");
    res.json(result.rows);
  } catch (error) {
    console.error("❌ Error fetching rumours:", error);
    res.status(500).json({ error: "Failed to fetch rumours" });
  }
});

// Scrape and insert demo

const express = require("express");
const router = express.Router();
const db = require("./db");
const runScraper = require("./scraper");
const runRumoursScraper = require("./rumours"); // Make sure rumours.js exists

// Health-check
router.get("/", (req, res) => res.send("IbroxIntel backend is live!"));

// --- PLAYERS ---
router.get("/init-db", async (req, res) => {
  await db.query(`
    CREATE TABLE IF NOT EXISTS players (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      position TEXT NOT NULL,
      value TEXT
    );
  `);
  res.send("✅ Players table created (or already exists).");
});

router.get("/players", async (req, res) => {
  const result = await db.query("SELECT * FROM players");
  res.json(result.rows);
});

router.get("/scrape", async (req, res) => {
  await runScraper();
  res.send("✅ Scraping and database update complete.");
});

// --- RUMOURS ---
router.get("/init-rumours", async (req, res) => {
  await db.query(`
    CREATE TABLE IF NOT EXISTS rumours (
      id SERIAL PRIMARY KEY,
      player TEXT NOT NULL,
      source TEXT NOT NULL,
      credibility TEXT
    );
  `);
  res.send("📰 Rumours table created (or already exists).");
});

router.get("/rumours", async (req, res) => {
  const result = await db.query("SELECT * FROM rumours");
  res.json(result.rows);
});

router.get("/scrape-rumours", async (req, res) => {
  await runRumoursScraper();
  res.send("✅ Rumours scraping done.");
});

router.get("/reset", async (req, res) => {
  await db.query("DELETE FROM rumours;");
  await runRumoursScraper();
  res.send("♻️ Rumours reset and refreshed.");
});

module.exports = router;

const express = require("express");
const router = express.Router();
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

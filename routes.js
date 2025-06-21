const express = require("express");
const router = express.Router();
const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

router.get("/players", async (req, res) => {
  const { rows } = await pool.query("SELECT * FROM players");
  res.json(rows);
});

router.get("/rumours", async (req, res) => {
  const { rows } = await pool.query("SELECT * FROM rumours");
  res.json(rows);
});

module.exports = router;
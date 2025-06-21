const axios = require("axios");
const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function scrapeAndStore() {
  const dummyRumours = [
    { player_name: "Todd Cantwell", position: "Midfielder", age: 26, rumour: "Linked with Leeds United" },
    { player_name: "Connor Goldson", position: "Defender", age: 31, rumour: "Offered new contract" }
  ];

  for (const r of dummyRumours) {
    await pool.query(
      "INSERT INTO players (name, position, age) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING",
      [r.player_name, r.position, r.age]
    );
    await pool.query(
      "INSERT INTO rumours (player_name, rumour) VALUES ($1, $2)",
      [r.player_name, r.rumour]
    );
  }

  console.log("Rumours inserted.");
}

scrapeAndStore();
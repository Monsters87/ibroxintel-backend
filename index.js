
const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = process.env.PORT || 3000;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

const schemaSetup = `
CREATE TABLE IF NOT EXISTS players (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    age INTEGER,
    position TEXT,
    nationality TEXT
);

CREATE TABLE IF NOT EXISTS sources (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    credibility INTEGER CHECK (credibility >= 0 AND credibility <= 100)
);

CREATE TABLE IF NOT EXISTS rumours (
    id SERIAL PRIMARY KEY,
    player_id INTEGER REFERENCES players(id),
    source_id INTEGER REFERENCES sources(id),
    rumour_text TEXT,
    link TEXT,
    date_posted TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    rating INTEGER CHECK (rating >= 0 AND rating <= 100)
);`;

pool.query(schemaSetup)
  .then(() => console.log("✅ Tables are ready"))
  .catch(err => console.error("❌ Error setting up schema:", err));

app.get('/', (req, res) => {
  res.send('IbroxIntel Backend with Auto Schema Setup');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

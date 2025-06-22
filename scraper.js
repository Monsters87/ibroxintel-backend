const db = require("./db");

async function runScraper() {
  try {
    const players = [
      { name: "Todd Cantwell", position: "Midfielder", value: "£3.5M" },
      { name: "James Tavernier", position: "Defender", value: "£4M" },
      { name: "Jack Butland", position: "Goalkeeper", value: "£2M" }
    ];

    for (const player of players) {
      const exists = await db.query(
        "SELECT * FROM players WHERE name = $1",
        [player.name]
      );

      if (exists.rows.length === 0) {
        await db.query(
          "INSERT INTO players (name, position, value) VALUES ($1, $2, $3)",
          [player.name, player.position, player.value]
        );
      }
    }

    const rumours = [
      {
        player_name: "Todd Cantwell",
        source: "Fabrizio Romano",
        link: "https://twitter.com/fabrizioromano",
        credibility: "High"
      },
      {
        player_name: "John Doe",
        source: "Random Blog",
        link: "https://example.com/rumour/john-doe",
        credibility: "Low"
      }
    ];

    for (const rumour of rumours) {
      const exists = await db.query(
        "SELECT * FROM rumours WHERE player_name = $1 AND source = $2",
        [rumour.player_name, rumour.source]
      );

      if (exists.rows.length === 0) {
        await db.query(
          "INSERT INTO rumours (player_name, source, link, credibility) VALUES ($1, $2, $3, $4)",
          [rumour.player_name, rumour.source, rumour.link, rumour.credibility]
        );
      }
    }

    console.log("✅ Dummy data inserted.");
  } catch (error) {
    console.error("❌ Scraper error:", error);
    throw error;
  }
}

module.exports = runScraper;

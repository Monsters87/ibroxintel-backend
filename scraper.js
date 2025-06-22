const db = require("./db");

async function runScraper() {
  try {
    // Dummy rumours to simulate a real scrape
    const rumours = [
      {
        player_name: "John Lundstram",
        source: "Sky Sports",
        rumour: "Linked with a move to Sheffield United",
        credibility: 75
      },
      {
        player_name: "Rabbi Matondo",
        source: "Daily Record",
        rumour: "Potential loan to Ligue 1",
        credibility: 60
      },
      {
        player_name: "Ridvan Yilmaz",
        source: "BBC Sport",
        rumour: "Subject of interest from Turkish clubs",
        credibility: 85
      }
    ];

    for (const rumour of rumours) {
      await db.query(
        "INSERT INTO rumours (player_name, source, rumour, credibility) VALUES ($1, $2, $3, $4)",
        [rumour.player_name, rumour.source, rumour.rumour, rumour.credibility]
      );
    }

    console.log("✅ Dummy rumours inserted.");
  } catch (error) {
    console.error("❌ Scraper error:", error);
    throw error;
  }
}

module.exports = runScraper;

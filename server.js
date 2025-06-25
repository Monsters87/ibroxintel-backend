const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

const rumours = [
  { id: 7, player: 'Todd Cantwell', source: 'BBC Sport', credibility: 'High' },
  { id: 8, player: 'James Tavernier', source: 'Sky Sports', credibility: 'Medium' },
  { id: 9, player: 'Jack Butland', source: 'Daily Record', credibility: 'Low' }
];

const squad = [
  { name: 'Todd Cantwell', position: 'Midfielder', value: '£3.5M' },
  { name: 'James Tavernier', position: 'Defender', value: '£4M' },
  { name: 'Jack Butland', position: 'Goalkeeper', value: '£2M' }
];

// ✅ Allow requests from the Netlify frontend
app.use(cors({
  origin: ['https://ibroxintel.netlify.app'],
  methods: ['GET']
}));

// Routes
app.get('/api/rumours', (req, res) => {
  res.json(rumours);
});

app.get('/api/squad', (req, res) => {
  res.json(squad);
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Backend running on port ${PORT}`);
});

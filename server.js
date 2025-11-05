const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

function generateMockWeatherData() {
  const now = new Date();
  return {
    temperature: Number((Math.random() * 15 + 20).toFixed(1)),
    humidity: Math.floor(Math.random() * 40 + 30),
    solarRadiation: Math.floor(Math.random() * 500 + 200),
    windSpeed: Number((Math.random() * 15 + 2).toFixed(1)),
    windDirection: Math.floor(Math.random() * 360),
    pressure: Math.floor(Math.random() * 50 + 980),
    timestamp: now.toISOString()
  };
}

app.get('/api/current', (req, res) => {
  res.json(generateMockWeatherData());
});

app.get('/api/historical', (req, res) => {
  const daysParam = parseInt(req.query.days || '7', 10);
  const days = Number.isFinite(daysParam) && daysParam > 0 ? daysParam : 7;
  const now = new Date();
  const data = [];
  for (let i = days; i >= 0; i--) {
    const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    const point = generateMockWeatherData();
    point.timestamp = d.toISOString();
    data.push(point);
  }
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`API server listening on http://localhost:${PORT}`);
});



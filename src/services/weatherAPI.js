// Mock weather API service - uses real API if REACT_APP_WEATHER_API_KEY is set
const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:4000';

// Mock data generator for demonstration
const generateMockWeatherData = () => {
  const now = new Date();
  return {
    temperature: (Math.random() * 40 + 10).toFixed(1), // 10-50°C
    humidity: Math.floor(Math.random() * 40 + 30), // 30-70%
    solarRadiation: Math.floor(Math.random() * 500 + 200), // 200-700 W/m²
    windSpeed: (Math.random() * 20 + 5).toFixed(1), // 5-25 km/h
    windDirection: Math.floor(Math.random() * 360), // 0-360°
    pressure: Math.floor(Math.random() * 50 + 980), // 980-1030 hPa
    timestamp: now.toISOString()
  };
};

// Real API integration (uncomment when you have API key)
// eslint-disable-next-line no-unused-vars
const fetchRealWeatherData = async (lat = 40.7128, lon = -74.0060) => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      throw new Error('Weather API request failed');
    }
    
    const data = await response.json();
    
    return {
      temperature: data.main.temp,
      humidity: data.main.humidity,
      solarRadiation: data.sys.sunrise ? Math.floor(Math.random() * 500 + 200) : 0, // Not in API
      windSpeed: data.wind?.speed ? (data.wind.speed * 3.6).toFixed(1) : 0, // Convert m/s to km/h
      windDirection: data.wind?.deg || 0,
      pressure: data.main.pressure,
      timestamp: new Date().toISOString(),
      locationName: [data.name, data.sys?.country].filter(Boolean).join(', ')
    };
  } catch (error) {
    console.error('Weather API Error:', error);
    throw error;
  }
};

export const weatherAPI = {
  getCurrentWeather: async () => {
    // If API key exists, use real data first
    if (API_KEY) {
      const lat = parseFloat(process.env.REACT_APP_DEFAULT_LAT || '40.7128');
      const lon = parseFloat(process.env.REACT_APP_DEFAULT_LON || '-74.0060');
      try {
        return await fetchRealWeatherData(lat, lon);
      } catch (e) {
        // Continue to backend fallback below
      }
    }

    // Otherwise prefer local backend if available
    try {
      const res = await fetch(`${BACKEND_URL}/api/current`, { cache: 'no-store' });
      if (res.ok) {
        const json = await res.json();
        return json;
      }
    } catch (_) {
      // ignore and fallback
    }
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(generateMockWeatherData());
      }, 300);
    });
  },

  getHistoricalData: async (days = 7) => {
    // Prefer local backend if available
    try {
      const res = await fetch(`${BACKEND_URL}/api/historical?days=${encodeURIComponent(days)}`, { cache: 'no-store' });
      if (res.ok) {
        const json = await res.json();
        return json;
      }
    } catch (_) {
      // ignore and fallback
    }

    // Generate mock historical data
    const historicalData = [];
    const now = new Date();
    for (let i = days; i >= 0; i--) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      historicalData.push({
        ...generateMockWeatherData(),
        timestamp: date.toISOString()
      });
    }
    return historicalData;
  },

  getForecast: async (days = 3) => {
    // Generate mock forecast data
    const forecastData = [];
    const now = new Date();
    
    for (let i = 1; i <= days; i++) {
      const date = new Date(now.getTime() + i * 24 * 60 * 60 * 1000);
      forecastData.push({
        ...generateMockWeatherData(),
        timestamp: date.toISOString(),
        confidence: Math.random() * 0.3 + 0.7 // 70-100% confidence
      });
    }
    
    return forecastData;
  }
};

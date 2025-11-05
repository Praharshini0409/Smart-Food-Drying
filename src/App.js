import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WeatherDashboard from './components/WeatherDashboard';
import ForecastingPage from './components/ForecastingPage';
import { WeatherProvider } from './context/WeatherContext';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <WeatherProvider>
        <Router>
          <div className="min-h-screen gradient-bg">
            <Routes>
              <Route path="/" element={<WeatherDashboard />} />
              <Route path="/forecasting" element={<ForecastingPage />} />
            </Routes>
          </div>
        </Router>
      </WeatherProvider>
    </ThemeProvider>
  );
}

export default App;

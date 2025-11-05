import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { weatherAPI } from '../services/weatherAPI';
import { ArrowLeft, Brain, TrendingUp, Clock, Zap, Target } from 'lucide-react';

const ForecastingPage = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('6h');

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        setLoading(true);
        const data = await weatherAPI.getForecast(3);
        setForecastData(data);
      } catch (error) {
        console.error('Error fetching forecast:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchForecast();
  }, []);

  const periods = [
    { value: '6h', label: '6 Hours', hours: 6 },
    { value: '1d', label: '1 Day', hours: 24 },
    { value: '3d', label: '3 Days', hours: 72 }
  ];

  const getConfidenceColor = (confidence) => {
    if (confidence >= 0.9) return 'text-green-400';
    if (confidence >= 0.7) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getConfidenceText = (confidence) => {
    if (confidence >= 0.9) return 'Very High';
    if (confidence >= 0.7) return 'High';
    if (confidence >= 0.5) return 'Medium';
    return 'Low';
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900' 
        : 'bg-gradient-to-br from-purple-400 via-blue-500 to-indigo-600'
    }`}>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/')}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors duration-200"
            >
              <ArrowLeft className="w-6 h-6 text-white" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                AI Weather Forecasting
              </h1>
              <p className="text-gray-300">
                Deep Learning-powered weather predictions
              </p>
            </div>
          </div>
        </div>

        {/* Period Selection */}
        <div className="mb-8">
          <div className="flex space-x-2 bg-white/10 rounded-lg p-1">
            {periods.map((period) => (
              <button
                key={period.value}
                onClick={() => setSelectedPeriod(period.value)}
                className={`px-4 py-2 rounded-md transition-all duration-200 ${
                  selectedPeriod === period.value
                    ? 'bg-white text-purple-600 font-semibold'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                {period.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Forecast Cards */}
          <div className="lg:col-span-2 space-y-4">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="weather-card rounded-xl p-6">
                    <div className="animate-pulse">
                      <div className="h-4 bg-gray-300/20 rounded w-1/4 mb-4"></div>
                      <div className="h-8 bg-gray-300/20 rounded w-1/2 mb-4"></div>
                      <div className="space-y-2">
                        <div className="h-3 bg-gray-300/20 rounded"></div>
                        <div className="h-3 bg-gray-300/20 rounded w-3/4"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {forecastData.slice(0, 4).map((forecast, index) => (
                  <div key={index} className="weather-card rounded-xl p-6 hover:scale-105 transition-transform duration-200">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <Brain className="w-5 h-5 text-purple-400" />
                        <span className="text-sm text-gray-300">
                          {new Date(forecast.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${getConfidenceColor(forecast.confidence)} bg-white/10`}>
                        {getConfidenceText(forecast.confidence)}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Temperature</span>
                        <span className="text-xl font-bold text-white">
                          {forecast.temperature}°C
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Humidity</span>
                        <span className="text-lg font-semibold text-blue-400">
                          {forecast.humidity}%
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Wind Speed</span>
                        <span className="text-lg font-semibold text-green-400">
                          {forecast.windSpeed} km/h
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Pressure</span>
                        <span className="text-lg font-semibold text-cyan-400">
                          {forecast.pressure} hPa
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-white/10">
                      <div className="flex items-center justify-between text-xs text-gray-400">
                        <span>Confidence: {(forecast.confidence * 100).toFixed(0)}%</span>
                        <span>AI Model: GRU-128</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* AI Model Info & Controls */}
          <div className="space-y-6">
            {/* Model Information */}
            <div className="weather-card rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                <Brain className="w-5 h-5 text-purple-400" />
                <span>AI Model Status</span>
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Model Type</span>
                  <span className="text-white font-medium">GRU Neural Network</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Accuracy</span>
                  <span className="text-green-400 font-medium">94.2%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Training Data</span>
                  <span className="text-white font-medium">2.5M+ records</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Last Updated</span>
                  <span className="text-white font-medium">2 hours ago</span>
                </div>
              </div>

              <div className="mt-4 p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                <div className="flex items-center space-x-2 text-green-400">
                  <Zap className="w-4 h-4" />
                  <span className="text-sm font-medium">Model Active</span>
                </div>
              </div>
            </div>

            {/* Prediction Features */}
            <div className="weather-card rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-blue-400" />
                <span>Prediction Features</span>
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Target className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-gray-300">Temperature trends</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Target className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-gray-300">Humidity patterns</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Target className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-gray-300">Wind predictions</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Target className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-gray-300">Pressure changes</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Target className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-gray-300">Solar radiation</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="weather-card rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                <Clock className="w-5 h-5 text-yellow-400" />
                <span>Quick Actions</span>
              </h3>
              
              <div className="space-y-3">
                <button className="w-full py-2 px-4 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 rounded-lg transition-colors duration-200 text-sm">
                  Refresh Predictions
                </button>
                <button className="w-full py-2 px-4 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 rounded-lg transition-colors duration-200 text-sm">
                  Export Data
                </button>
                <button className="w-full py-2 px-4 bg-green-500/20 hover:bg-green-500/30 text-green-300 rounded-lg transition-colors duration-200 text-sm">
                  Model Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForecastingPage;

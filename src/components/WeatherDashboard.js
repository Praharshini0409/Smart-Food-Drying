import React from 'react';
import { useWeather } from '../context/WeatherContext';
import { useTheme } from '../context/ThemeContext';
import WeatherGraph from './WeatherGraph';
import WeatherDataDisplay from './WeatherDataDisplay';
import TimeIntervalControl from './TimeIntervalControl';
import NavigationButton from './NavigationButton';
import ThemeToggle from './ThemeToggle';

const WeatherDashboard = () => {
  const { loading, error, isConnected } = useWeather();
  const { isDarkMode } = useTheme();

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900' 
        : 'bg-gradient-to-br from-blue-400 via-blue-500 to-purple-600'
    }`}>
      {/* Header */}
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Smart Food Drying Dashboard
            </h1>
            <div className="flex items-center space-x-4">
              <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${
                isConnected 
                  ? 'bg-green-500/20 text-green-300' 
                  : 'bg-red-500/20 text-red-300'
              }`}>
                <div className={`w-2 h-2 rounded-full ${
                  isConnected ? 'bg-green-400 animate-pulse' : 'bg-red-400'
                }`}></div>
                <span className="text-sm font-medium">
                  {isConnected ? 'Connected' : 'Disconnected'}
                </span>
              </div>
              {loading && (
                <div className="flex items-center space-x-2 text-blue-300">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-300"></div>
                  <span className="text-sm">Updating...</span>
                </div>
              )}
            </div>
          </div>
          <ThemeToggle />
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
            <p className="text-red-300">Error: {error}</p>
          </div>
        )}

        {/* Main Dashboard Grid - Fixed layout matching the reference */}
        <div className="grid grid-cols-3 gap-4 h-[calc(100vh-160px)] grid-rows-[56px_1fr]">
          {/* Row 1 (Top small boxes) */}
          {/* Box 3 - Time Interval Control (Top Left, spans wider column) */}
          <div className="col-span-2 row-start-1 row-end-2">
            <div className="weather-card rounded-xl h-full p-2 flex items-center justify-center overflow-hidden">
              <TimeIntervalControl compact />
            </div>
          </div>

          {/* Box 4 - Navigation Button (Top Right, narrower column) */}
          <div className="col-span-1 row-start-1 row-end-2">
            <div className="weather-card rounded-xl h-full p-2 flex items-center justify-center overflow-hidden">
              <NavigationButton compact />
            </div>
          </div>

          {/* Row 2 (Bottom large boxes) */}
          {/* Box 1 - Graph Visualization (Bottom Left, spans wider column) */}
          <div className="col-span-2 row-start-2 row-end-3">
            <div className="weather-card rounded-xl h-full p-6">
              <WeatherGraph />
            </div>
          </div>

          {/* Box 2 - Current Numerical Data Display (Bottom Right, narrower column) */}
          <div className="col-span-1 row-start-2 row-end-3">
            <div className="weather-card rounded-xl h-full p-6">
              <WeatherDataDisplay />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDashboard;

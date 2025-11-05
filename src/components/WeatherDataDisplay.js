import React from 'react';
import { useWeather } from '../context/WeatherContext';
import { 
  Thermometer, 
  Droplets, 
  Sun, 
  Wind, 
  Compass, 
  Gauge 
} from 'lucide-react';

const WeatherDataDisplay = () => {
  const { weatherData, loading } = useWeather();

  const weatherParameters = [
    {
      name: 'Temperature',
      value: weatherData.temperature,
      unit: '°C',
      icon: Thermometer,
      color: 'from-red-500 to-orange-500',
      bgColor: 'bg-red-500/10',
      textColor: 'text-red-400'
    },
    {
      name: 'Humidity',
      value: weatherData.humidity,
      unit: '%',
      icon: Droplets,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-500/10',
      textColor: 'text-blue-400'
    },
    {
      name: 'Solar Radiation',
      value: weatherData.solarRadiation,
      unit: 'W/m²',
      icon: Sun,
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-yellow-500/10',
      textColor: 'text-yellow-400'
    },
    {
      name: 'Wind Speed',
      value: weatherData.windSpeed,
      unit: 'km/h',
      icon: Wind,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-500/10',
      textColor: 'text-green-400'
    },
    {
      name: 'Wind Direction',
      value: weatherData.windDirection,
      unit: '°',
      icon: Compass,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-500/10',
      textColor: 'text-purple-400'
    },
    {
      name: 'Pressure',
      value: weatherData.pressure,
      unit: 'hPa',
      icon: Gauge,
      color: 'from-cyan-500 to-blue-500',
      bgColor: 'bg-cyan-500/10',
      textColor: 'text-cyan-400'
    }
  ];

  if (loading && !weatherData.timestamp) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-500">Loading weather data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full">
      <h2 className="text-xl font-bold text-white mb-2 text-center">
        Current Weather Data
      </h2>
      {weatherData.locationName && (
        <p className="text-center text-sm text-gray-300 mb-4">
          {weatherData.locationName}
        </p>
      )}
      
      <div className="grid grid-cols-2 gap-4 h-[calc(100%-60px)]">
        {weatherParameters.map((param, index) => {
          const IconComponent = param.icon;
          return (
            <div
              key={param.name}
              className={`${param.bgColor} rounded-lg p-4 border border-white/10 hover:scale-105 transition-transform duration-200`}
            >
              <div className="flex items-center justify-between mb-3">
                <IconComponent className={`w-6 h-6 ${param.textColor}`} />
                <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${param.color} flex items-center justify-center`}>
                  <span className="text-white text-xs font-bold">
                    {index + 1}
                  </span>
                </div>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm text-gray-300 font-medium">
                  {param.name}
                </p>
                <div className="flex items-baseline space-x-1">
                  <span className={`text-2xl font-bold ${param.textColor}`}>
                    {loading ? (
                      <div className="w-16 h-8 bg-gray-300/20 rounded animate-pulse"></div>
                    ) : (
                      param.value
                    )}
                  </span>
                  <span className="text-sm text-gray-400">
                    {param.unit}
                  </span>
                </div>
              </div>
              
              {/* Status indicator */}
              <div className="mt-3 flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${
                  loading ? 'bg-gray-400 animate-pulse' : 'bg-green-400 animate-pulse'
                }`}></div>
                <span className="text-xs text-gray-400">
                  {loading ? 'Updating...' : 'Live'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Last updated timestamp */}
      {weatherData.timestamp && (
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-400">
            Last updated: {new Date(weatherData.timestamp).toLocaleTimeString()}
          </p>
        </div>
      )}
    </div>
  );
};

export default WeatherDataDisplay;

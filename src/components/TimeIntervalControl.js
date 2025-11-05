import React from 'react';
import { useWeather } from '../context/WeatherContext';
import { useTheme } from '../context/ThemeContext';
import { Clock, ChevronDown } from 'lucide-react';

const TimeIntervalControl = ({ compact = false }) => {
  const { intervalMs, setIntervalMs } = useWeather();
  const { isDarkMode } = useTheme();

  // Exact list requested by user
  const intervals = [
    { value: 1000, label: '1 sec', description: 'Ultra real-time' },
    { value: 15000, label: '15 sec', description: 'Very high frequency' },
    { value: 30000, label: '30 sec', description: 'High frequency' },
    { value: 60000, label: '1 min', description: 'Standard' },
    { value: 300000, label: '5 min', description: 'Balanced' },
    { value: 900000, label: '15 min', description: 'Low frequency' },
    { value: 1800000, label: '30 min', description: 'Lower frequency' },
    { value: 3600000, label: '60 min', description: 'Hourly updates' },
    { value: 86400000, label: '1 day', description: 'Daily summary' },
    { value: 86400000 * 10, label: '10 days', description: 'Decadal summary' },
    { value: 86400000 * 30, label: '1 month', description: 'Monthly summary' }
  ];

  const currentInterval = intervals.find(interval => interval.value === intervalMs) || intervals[0];

  const handleIntervalChange = (event) => {
    const newInterval = parseInt(event.target.value);
    setIntervalMs(newInterval);
  };

  return (
    <div className="w-full">
      <div className={compact ? 'text-center mb-1' : 'text-center mb-3'}>
        <h3 className={`${compact ? 'text-xs' : 'text-sm'} font-semibold text-white ${compact ? 'mb-0.5' : 'mb-1'} flex items-center justify-center ${compact ? 'space-x-1' : 'space-x-1'}`}>
          <Clock className={compact ? 'w-3.5 h-3.5' : 'w-4 h-4'} />
          <span>Update Interval</span>
        </h3>
        {!compact && (
          <p className="text-xs text-gray-300">
            Control data refresh rate
          </p>
        )}
      </div>

      <div className={compact ? 'space-y-2' : 'space-y-3'}>
        {/* Dropdown Selector */}
        <div className="relative">
          <select
            value={intervalMs}
            onChange={handleIntervalChange}
            className={`w-full appearance-none bg-orange-500/20 border border-orange-400/30 rounded-lg ${compact ? 'px-2 py-1.5 pr-6 text-xs' : 'px-3 py-2 pr-8'} text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 ${
              isDarkMode ? 'bg-orange-500/10' : 'bg-orange-500/20'
            }`}
          >
            {intervals.map((interval) => (
              <option 
                key={interval.value} 
                value={interval.value}
                className="bg-gray-800 text-white"
              >
                {interval.label} - {interval.description}
              </option>
            ))}
          </select>
          <ChevronDown className={`absolute right-2 top-1/2 transform -translate-y-1/2 ${compact ? 'w-3.5 h-3.5' : 'w-4 h-4'} text-orange-300 pointer-events-none`} />
        </div>

        {/* Current Selection Display */}
        {!compact && (
        <div className={`${compact ? 'p-1.5' : 'p-2'} rounded-lg border border-orange-400/20 ${
          isDarkMode ? 'bg-orange-500/10' : 'bg-orange-500/20'
        }`}>
          <div className="text-center">
            <p className={`${compact ? 'text-[10px]' : 'text-xs'} text-orange-300 mb-1`}>Current Setting</p>
            <p className={`${compact ? 'text-xs' : 'text-sm'} font-bold text-white`}>
              {currentInterval.label}
            </p>
            <p className={`${compact ? 'text-[10px]' : 'text-xs'} text-orange-200`}>
              {currentInterval.description}
            </p>
          </div>
        </div>
        )}

        {/* Visual Indicator */}
        {!compact && (
        <div className="flex justify-center">
          <div className="flex space-x-1">
            {intervals.map((interval, index) => (
              <div
                key={interval.value}
                className={`${compact ? 'w-1.5 h-1.5' : 'w-2 h-2'} rounded-full transition-all duration-300 ${
                  interval.value === intervalMs
                    ? 'bg-orange-400 scale-125'
                    : 'bg-gray-500'
                }`}
              />
            ))}
          </div>
        </div>
        )}

        {/* Auto-refresh indicator */}
        {!compact && (
        <div className="text-center">
          <div className={`inline-flex items-center space-x-1 ${compact ? 'px-2 py-0.5 text-[10px]' : 'px-2 py-1 text-xs'} bg-orange-500/20 text-orange-300 rounded-full`}>
            <div className={`${compact ? 'w-1.5 h-1.5' : 'w-2 h-2'} bg-orange-400 rounded-full animate-pulse`}></div>
            <span>Auto-refresh enabled</span>
          </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default TimeIntervalControl;

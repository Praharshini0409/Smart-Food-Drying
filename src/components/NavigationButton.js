import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { TrendingUp, ArrowRight, Brain, Zap } from 'lucide-react';

const NavigationButton = ({ compact = false }) => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  const handleNavigateToForecasting = () => {
    navigate('/forecasting');
  };

  return (
    <div className="w-full text-center">
      <div className={compact ? 'mb-2' : 'mb-4'}>
        <h3 className={`${compact ? 'text-xs' : 'text-sm'} font-semibold text-white ${compact ? 'mb-0.5' : 'mb-1'} flex items-center justify-center space-x-1`}>
          <Brain className={compact ? 'w-3.5 h-3.5' : 'w-4 h-4'} />
          <span>AI Forecasting</span>
        </h3>
        {!compact && (
          <p className="text-xs text-gray-300">
            Advanced weather predictions
          </p>
        )}
      </div>

      <div className={compact ? 'space-y-2' : 'space-y-3'}>
        {/* Main Navigation Button */}
        <button
          onClick={handleNavigateToForecasting}
          className={`group relative w-full ${compact ? 'py-2 px-3' : 'py-3 px-4'} rounded-lg font-semibold text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
            isDarkMode
              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500'
              : 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400'
          }`}
        >
          <div className="flex items-center justify-center space-x-2">
            <TrendingUp className={`${compact ? 'w-3.5 h-3.5' : 'w-4 h-4'} group-hover:animate-bounce`} />
            <span className={`${compact ? 'text-xs' : 'text-sm'}`}>Go to Forecasting</span>
            <ArrowRight className={`${compact ? 'w-3.5 h-3.5' : 'w-4 h-4'} group-hover:translate-x-1 transition-transform duration-200`} />
          </div>
          
          {/* Hover effect overlay */}
          <div className="absolute inset-0 rounded-lg bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>

        {/* Feature highlights */}
        {!compact && (
        <div className={compact ? 'space-y-0.5' : 'space-y-1'}>
          <div className={`flex items-center space-x-1 ${compact ? 'text-[10px]' : 'text-xs'} text-gray-300`}>
            <Zap className={`${compact ? 'w-3 h-3' : 'w-3.5 h-3.5'} text-emerald-400`} />
            <span>Deep Learning Models (GRU/RNN)</span>
          </div>
          <div className={`flex items-center space-x-1 ${compact ? 'text-[10px]' : 'text-xs'} text-gray-300`}>
            <TrendingUp className={`${compact ? 'w-3 h-3' : 'w-3.5 h-3.5'} text-emerald-400`} />
            <span>6-hour & 3-day predictions</span>
          </div>
          <div className={`flex items-center space-x-1 ${compact ? 'text-[10px]' : 'text-xs'} text-gray-300`}>
            <Brain className={`${compact ? 'w-3 h-3' : 'w-3.5 h-3.5'} text-emerald-400`} />
            <span>Confidence scoring</span>
          </div>
        </div>
        )}

        {/* Progress indicator */}
        {!compact && (
        <div className={compact ? 'mt-2' : 'mt-3'}>
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>Current Page</span>
            <span>Forecasting</span>
          </div>
          <div className={`w-full bg-gray-700 rounded-full ${compact ? 'h-1' : 'h-1.5'}`}>
            <div className={`bg-gradient-to-r from-emerald-500 to-teal-500 ${compact ? 'h-1' : 'h-1.5'} rounded-full w-1/2 transition-all duration-500`}></div>
          </div>
        </div>
        )}

        {/* Quick stats preview */}
        {!compact && (
        <div className={`${compact ? 'mt-2 p-1.5' : 'mt-3 p-2'} rounded-lg border border-emerald-400/20 ${
          isDarkMode ? 'bg-emerald-500/10' : 'bg-emerald-500/20'
        }`}>
          <p className={`${compact ? 'text-[10px]' : 'text-xs'} text-emerald-300 mb-1`}>Next: Weather Forecast</p>
          <p className={`${compact ? 'text-[11px]' : 'text-xs'} text-white font-medium`}>
            AI-powered predictions
          </p>
        </div>
        )}
      </div>
    </div>
  );
};

export default NavigationButton;

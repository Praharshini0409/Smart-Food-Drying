import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`relative inline-flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300 ${
        isDarkMode
          ? 'bg-gray-800 hover:bg-gray-700 text-yellow-400'
          : 'bg-yellow-100 hover:bg-yellow-200 text-yellow-600'
      }`}
      aria-label="Toggle theme"
    >
      <div className="relative">
        <Sun
          className={`absolute inset-0 h-5 w-5 transition-all duration-300 ${
            isDarkMode ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'
          }`}
        />
        <Moon
          className={`absolute inset-0 h-5 w-5 transition-all duration-300 ${
            isDarkMode ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'
          }`}
        />
      </div>
    </button>
  );
};

export default ThemeToggle;

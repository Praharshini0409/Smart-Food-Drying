import React, { useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useWeather } from '../context/WeatherContext';
import { useTheme } from '../context/ThemeContext';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const WeatherGraph = () => {
  const { historicalData, loading, intervalMs } = useWeather();
  const { isDarkMode } = useTheme();
  const chartRef = useRef();

  const DAY_MS = 86400000;
  const isDailyRange = intervalMs >= DAY_MS;

  // Prepare data for the chart
  const chartData = {
    labels: historicalData.map((point) => {
      const time = new Date(point?.timestamp);
      if (isDailyRange) {
        return time.toLocaleDateString('en-US', { month: 'short', day: '2-digit' });
      }
      return time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    }),
    datasets: [
      {
        label: 'Temperature (°C)',
        data: historicalData.map(data => Number(data.temperature)),
        borderColor: '#ef4444',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.4,
        fill: false,
        yAxisID: 'y'
      },
      {
        label: 'Humidity (%)',
        data: historicalData.map(data => Number(data.humidity)),
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: false,
        yAxisID: 'y1'
      },
      {
        label: 'Solar Radiation (W/m²)',
        data: historicalData.map(data => Number(data.solarRadiation)),
        borderColor: '#f59e0b',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        tension: 0.4,
        fill: false,
        yAxisID: 'y2'
      },
      {
        label: 'Wind Speed (km/h)',
        data: historicalData.map(data => Number(data.windSpeed)),
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
        fill: false,
        yAxisID: 'y3'
      },
      {
        label: 'Wind Direction (°)',
        data: historicalData.map(data => Number(data.windDirection)),
        borderColor: '#8b5cf6',
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        tension: 0.4,
        fill: false,
        yAxisID: 'y4'
      },
      {
        label: 'Pressure (hPa)',
        data: historicalData.map(data => Number(data.pressure)),
        borderColor: '#06b6d4',
        backgroundColor: 'rgba(6, 182, 212, 0.1)',
        tension: 0.4,
        fill: false,
        yAxisID: 'y5'
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      title: {
        display: true,
        text: isDailyRange ? 'Daily Average Weather Parameters' : 'Real-Time Weather Parameters',
        color: isDarkMode ? '#f3f4f6' : '#1f2937',
        font: {
          size: 16,
          weight: 'bold'
        }
      },
      legend: {
        position: 'top',
        labels: {
          color: isDarkMode ? '#d1d5db' : '#374151',
          usePointStyle: true,
          padding: 20
        }
      },
      tooltip: {
        backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.9)',
        titleColor: isDarkMode ? '#f3f4f6' : '#1f2937',
        bodyColor: isDarkMode ? '#d1d5db' : '#374151',
        borderColor: isDarkMode ? '#374151' : '#e5e7eb',
        borderWidth: 1
      }
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Time',
          color: isDarkMode ? '#d1d5db' : '#374151'
        },
        ticks: {
          color: isDarkMode ? '#9ca3af' : '#6b7280'
        },
        grid: {
          color: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
        }
      },
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        title: {
          display: true,
          text: 'Temperature (°C)',
          color: '#ef4444'
        },
        ticks: {
          color: '#ef4444'
        },
        grid: {
          drawOnChartArea: false,
        },
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        title: {
          display: true,
          text: 'Humidity (%)',
          color: '#3b82f6'
        },
        ticks: {
          color: '#3b82f6'
        },
        grid: {
          drawOnChartArea: false,
        },
      },
      y2: {
        type: 'linear',
        display: false,
        position: 'left',
        title: {
          display: true,
          text: 'Solar Radiation (W/m²)',
          color: '#f59e0b'
        },
        ticks: {
          color: '#f59e0b'
        },
        grid: {
          drawOnChartArea: false,
        },
      },
      y3: {
        type: 'linear',
        display: false,
        position: 'right',
        title: {
          display: true,
          text: 'Wind Speed (km/h)',
          color: '#10b981'
        },
        ticks: {
          color: '#10b981'
        },
        grid: {
          drawOnChartArea: false,
        },
      },
      y4: {
        type: 'linear',
        display: false,
        position: 'left',
        title: {
          display: true,
          text: 'Wind Direction (°)',
          color: '#8b5cf6'
        },
        ticks: {
          color: '#8b5cf6'
        },
        grid: {
          drawOnChartArea: false,
        },
      },
      y5: {
        type: 'linear',
        display: false,
        position: 'right',
        title: {
          display: true,
          text: 'Pressure (hPa)',
          color: '#06b6d4'
        },
        ticks: {
          color: '#06b6d4'
        },
        grid: {
          drawOnChartArea: false,
        },
      }
    },
    animation: {
      duration: 1000,
      easing: 'easeInOutQuart'
    }
  };

  if (loading && historicalData.length === 0) {
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
      <div className="h-full">
        <Line ref={chartRef} data={chartData} options={options} />
      </div>
    </div>
  );
};

export default WeatherGraph;

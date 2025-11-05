import React, { createContext, useContext, useReducer, useEffect, useCallback, useRef } from 'react';
import { weatherAPI } from '../services/weatherAPI';

const WeatherContext = createContext();

const getInitialInterval = () => {
  const saved = typeof window !== 'undefined' ? window.localStorage.getItem('updateIntervalMs') : null;
  return saved ? parseInt(saved, 10) : 1000;
};

const initialState = {
  weatherData: {
    temperature: 0,
    humidity: 0,
    solarRadiation: 0,
    windSpeed: 0,
    windDirection: 0,
    pressure: 0,
    timestamp: null,
    locationName: ''
  },
  historicalData: [],
  loading: false,
  error: null,
  intervalMs: getInitialInterval(),
  isConnected: false
};

const weatherReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_HISTORICAL_DATA': {
      return {
        ...state,
        historicalData: action.payload || [],
        loading: false,
        error: null
      };
    }
    case 'UPDATE_CURRENT_ONLY': {
      return {
        ...state,
        weatherData: action.payload,
        loading: false,
        error: null,
        isConnected: true
      };
    }
    case 'APPEND_HISTORICAL': {
      const appended = [...state.historicalData, action.payload];
      if (appended.length > 300) appended.shift();
      return {
        ...state,
        historicalData: appended
      };
    }
    case 'SET_WEATHER_DATA': {
      const appended = [...state.historicalData, action.payload];
      if (appended.length > 300) appended.shift();
      return {
        ...state,
        weatherData: action.payload,
        historicalData: appended,
        loading: false,
        error: null,
        isConnected: true
      };
    }
    case 'SET_UPDATE_INTERVAL':
      return { ...state, intervalMs: action.payload };
    case 'SET_CONNECTION_STATUS':
      return { ...state, isConnected: action.payload };
    default:
      return state;
  }
};

export const WeatherProvider = ({ children }) => {
  const [state, dispatch] = useReducer(weatherReducer, initialState);
  const aggBufferRef = useRef([]); // collects readings within window
  const aggStartRef = useRef(null); // window start timestamp (ms)

  const fetchWeatherData = useCallback(async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const data = await weatherAPI.getCurrentWeather();
      dispatch({ type: 'UPDATE_CURRENT_ONLY', payload: data });

      // If in aggregation mode, collect reading into buffer
      const DAY_MS = 86400000;
      const isDailyRange = state.intervalMs >= DAY_MS;
      const isAggregationWindow = !isDailyRange && state.intervalMs >= 300000; // >= 5 min
      if (isAggregationWindow) {
        const nowMs = Date.now();
        if (aggStartRef.current == null) aggStartRef.current = nowMs;
        aggBufferRef.current.push(data);

        const windowElapsed = nowMs - aggStartRef.current;
        if (windowElapsed >= state.intervalMs) {
          // Compute average over buffer
          const buffer = aggBufferRef.current;
          const avg = (arr, key) => arr.reduce((s, d) => s + Number(d[key] || 0), 0) / (arr.length || 1);
          const averagedPoint = {
            temperature: Number(avg(buffer, 'temperature').toFixed(2)),
            humidity: Number(avg(buffer, 'humidity').toFixed(2)),
            solarRadiation: Number(avg(buffer, 'solarRadiation').toFixed(2)),
            windSpeed: Number(avg(buffer, 'windSpeed').toFixed(2)),
            windDirection: Number(avg(buffer, 'windDirection').toFixed(2)),
            pressure: Number(avg(buffer, 'pressure').toFixed(2)),
            timestamp: new Date(nowMs).toISOString()
          };
          dispatch({ type: 'APPEND_HISTORICAL', payload: averagedPoint });
          // Reset window (start new window with current reading included)
          aggStartRef.current = nowMs;
          aggBufferRef.current = [];
        }
      } else if (!isDailyRange) {
        // In real-time sub-minute mode, append each tick
        dispatch({ type: 'APPEND_HISTORICAL', payload: data });
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  }, [state.intervalMs]);

  const setIntervalMs = (interval) => {
    dispatch({ type: 'SET_UPDATE_INTERVAL', payload: interval });
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('updateIntervalMs', String(interval));
      }
    } catch {}
  };

  useEffect(() => {
    const DAY_MS = 86400000;
    const isDailyRange = state.intervalMs >= DAY_MS;

    let interval;

    const bootstrap = async () => {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        if (isDailyRange) {
          const days = Math.max(1, Math.floor(state.intervalMs / DAY_MS));
          const hist = await weatherAPI.getHistoricalData(days);
          // hist is expected as one point per day; ensure numeric values
          const normalized = hist.map(d => ({
            temperature: Number(d.temperature),
            humidity: Number(d.humidity),
            solarRadiation: Number(d.solarRadiation),
            windSpeed: Number(d.windSpeed),
            windDirection: Number(d.windDirection),
            pressure: Number(d.pressure),
            timestamp: d.timestamp
          }));
          dispatch({ type: 'SET_HISTORICAL_DATA', payload: normalized });
          aggBufferRef.current = [];
          aggStartRef.current = null;
        } else {
          // For aggregation windows (>=5 min), poll more frequently to collect samples
          const isAggregationWindow = state.intervalMs >= 300000; // 5 min
          const pollMs = isAggregationWindow ? Math.min(30000, Math.floor(state.intervalMs / 6)) : Math.max(1000, Math.min(15000, state.intervalMs));
          await fetchWeatherData();
          interval = setInterval(fetchWeatherData, pollMs);
        }
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: error.message });
      }
    };

    bootstrap();

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [state.intervalMs, fetchWeatherData]);

  const value = {
    ...state,
    fetchWeatherData,
    intervalMs: state.intervalMs,
    setIntervalMs
  };

  return (
    <WeatherContext.Provider value={value}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
};

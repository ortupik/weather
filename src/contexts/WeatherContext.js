import React, { createContext } from 'react';
import useWeatherData from '../hooks/useWeatherData';

const WeatherContext = createContext();

const WeatherProvider = ({ children }) => {
  const {
    weatherData, loading, error, fetchWeather, refetchWeather,
  } = useWeatherData();

  return (
    <WeatherContext.Provider value={{
      weatherData, loading, error, fetchWeather, refetchWeather,
    }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export { WeatherProvider, WeatherContext };

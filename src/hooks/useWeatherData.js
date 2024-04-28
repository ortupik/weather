import { useState } from 'react';
import axios from 'axios';

const useWeatherData = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeather = async (city = 'Nairobi') => {
    setLoading(true);
    setError(null);

    try {
      const apiKey = process.env.REACT_APP_API_KEY;
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`,
      );
      setWeatherData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const refetchWeather = async () => {
    if (weatherData) {
      console.log('ass');
      const { name } = weatherData;
      await fetchWeather(name);
    }
  };

  return {
    weatherData, loading, error, fetchWeather, refetchWeather,
  };
};

export default useWeatherData;

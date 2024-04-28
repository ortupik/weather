import React, { useContext } from 'react';
import {
  Typography, Grid, Box, Stack, IconButton,
} from '@mui/material';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import CloudyIcon from '@mui/icons-material/Cloud';
import OpacityIcon from '@mui/icons-material/Opacity';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import AirIcon from '@mui/icons-material/Air';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useLanguage } from '../contexts/LanguageContext';
import { WeatherContext } from '../contexts/WeatherContext';
import ErrorDisplay from './ErrorDisplay';
import '../styles/WeatherCard.css';

const WeatherCard = () => {
  const {
    weatherData, loading, error, fetchWeather, refetchWeather,
  } = useContext(WeatherContext);

  const { getText } = useLanguage();

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case 'Clouds':
        return <CloudyIcon className="weather-icon Clouds" />;
      case 'Rain':
        return <OpacityIcon className="weather-icon Rain" />;
      case 'Clear':
        return <WbSunnyIcon className="weather-icon Clear" />;
      default:
        return <CloudyIcon className="weather-icon Clouds" />;
    }
  };

  const refreshWeather = async () => {
    try {
      await refetchWeather();
    } catch (err) {
      console.error('Error refreshing weather:', err);
    }
  };
  
  return (
    <Box className="weather-card">
      <ErrorDisplay error={error} loading={loading} />
      {!loading && weatherData && !error && (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Box className="weather-info">
                <Typography variant="h4" className="city-name">
                  {weatherData.name}
                  ,
                  {weatherData.sys.country}
                </Typography>
                <Typography variant="h6" className="weather-description">
                  {getText(weatherData.weather[0].description)}
                </Typography>
              </Box>
              <Box className="weather-temp">
                <ThermostatIcon className="temp-icon" />
                <Typography variant="h3">
                  {weatherData.main.temp}
                  {' '}
                  °C
                </Typography>
              </Box>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Box className="weather-icon-container">
              {getWeatherIcon(weatherData.weather[0].main)}
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1" className="weather-details">
              <OpacityIcon className="weather-icon Rain" />
              {getText('precipitation')}
              :
              {weatherData.clouds.all}
              %
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1" className="weather-details">
              <WaterDropIcon className="details-icon humidity" />
              {getText('humidity')}
              :
              {weatherData.main.humidity}
              %
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1" className="weather-details">
              <AirIcon className="details-icon wind" />
              {getText('wind')}
              :
              {weatherData.wind.speed}
              {' '}
              m/s
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1" className="weather-details">
              <ThermostatIcon className="details-icon pressure" style={{ color: 'brown' }} />
              {getText('Pressure')}
              :
              {weatherData.main.pressure}
              {' '}
              hPa
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <IconButton onClick={refreshWeather} data-testid="refresh-button" className="refresh-button">
              <RefreshIcon />
              <Typography variant="body1">
                {getText('Refresh')}
                {' '}
              </Typography>
            </IconButton>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default WeatherCard;

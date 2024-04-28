import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WeatherCard from './components/WeatherCard';
import Header from './components/Header';
import ErrorDisplay from './components/ErrorDisplay';
import { WeatherProvider } from './contexts/WeatherContext';
import { LanguageProvider } from './contexts/LanguageContext';

const App = () => (
  <LanguageProvider>
    <Header />
    <WeatherProvider>
      <Router>
        <Routes>
          <Route path="/" element={<WeatherCard />} />
        </Routes>
        <ErrorDisplay />
      </Router>
    </WeatherProvider>
  </LanguageProvider>
);

export default App;

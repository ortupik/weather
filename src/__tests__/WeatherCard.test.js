import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import WeatherCard from '../components/WeatherCard';
import { WeatherProvider, WeatherContext } from '../contexts/WeatherContext';
import fetchMock from 'jest-fetch-mock';
import { useWeatherData } from '../contexts/WeatherContext'; 
import '@testing-library/jest-dom/extend-expect';

beforeAll(() => {
  fetchMock.enableMocks();
});

afterEach(() => {
  fetchMock.resetMocks();
});

jest.mock('../contexts/LanguageContext', () => ({
  useLanguage: jest.fn(() => ({
    getText: key => key,
    language: 'en',
  })),
}));

jest.mock('../contexts/WeatherContext', () => ({
  ...jest.requireActual('../contexts/WeatherContext'),
  useWeatherData: jest.fn(() => ({
    weatherData: null,
    loading: true,
    error: null,
    fetchWeather: jest.fn(),
    refetchWeather: jest.fn(),
  })),
}));

describe('WeatherCard', () => {
  it('renders weather data correctly', () => {
    const mockWeatherData = {
      name: 'Nairobi',
      sys: { country: 'Kenya' },
      weather: [{ description: 'Clear' }],
      main: {
        temp: 25,
        humidity: 60,
        pressure: 1013,
      },
      wind: {
        speed: 5,
        deg: 120,
      },
      clouds: {
        all: 20,
      },
    };

    const mockContextValue = {
      weatherData: mockWeatherData,
      loading: false,
      error: null,
      fetchWeather: jest.fn(),
      refetchWeather: jest.fn(),
    };

    render(
      <WeatherContext.Provider value={mockContextValue}>
        <WeatherCard />
      </WeatherContext.Provider>
    );

    expect(screen.getByText(/nairobi,\s*ke/i)).toBeInTheDocument();
    expect(screen.getByText(/25 °c/i)).toBeInTheDocument();
    expect(screen.getByText(/humidity:\s*60%/i)).toBeInTheDocument();
    expect(screen.getByText(/pressure:\s*1013 hpa/i)).toBeInTheDocument();
    expect(screen.getByText(/wind:\s*5 m\/s/i)).toBeInTheDocument();
    expect(screen.getByText(/precipitation:\s*20%/i)).toBeInTheDocument();
  });

  test('renders loading state correctly', async () => {
    render(
      <WeatherProvider>
        <WeatherCard />
      </WeatherProvider>
    );

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();

    setTimeout(() => {
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
    },1000);

  });

  test('renders error state correctly', async () => {
    render(
      <WeatherProvider>
        <WeatherCard />
      </WeatherProvider>
    );

    fetchMock.mockRejectOnce();

    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toBeInTheDocument();
    });

    await new Promise(resolve => setTimeout(resolve, 1000));
  });

  test('handles refresh button click', async () => {
    render(
      <WeatherProvider>
        <WeatherCard />
      </WeatherProvider>
    );

    setTimeout(() => {
      fireEvent.click(screen.getByTestId('refresh-button'));
      expect(fetchMock).toHaveBeenCalled();
    }, 1000);
  });

  test('handles failed weather data loading with 401 error', async () => {
    render(
      <WeatherProvider>
        <WeatherCard />
      </WeatherProvider>
    );

    fetchMock.mockRejectOnce({ status: 401 });

    setTimeout(() => {
      expect(screen.getByTestId('error-message')).toBeInTheDocument();
      expect(screen.getByText(/status code 401/i)).toBeInTheDocument();
    }, 500);
  });
});

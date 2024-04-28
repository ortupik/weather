import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import WeatherCard from '../components/WeatherCard';
import { WeatherProvider } from '../contexts/WeatherContext';
import '@testing-library/jest-dom/extend-expect';
import fetchMock from 'jest-fetch-mock';

beforeAll(() => {
  fetchMock.enableMocks();
});

afterEach(() => {
  fetchMock.resetMocks();
});

jest.mock('../contexts/LanguageContext', () => ({
  useLanguage: jest.fn(() => ({
    getText: jest.fn(),
    language: 'en',
  })),
}));

jest.mock('../contexts/WeatherContext', () => ({
  ...jest.requireActual('../contexts/WeatherContext'), // Use the actual WeatherContext implementation
  useWeatherData: jest.fn(() => ({
    weatherData: null, // Initially set weatherData to null
    loading: true, // Set loading to true to simulate loading state
    error: null,
    fetchWeather: jest.fn(),
    refetchWeather: jest.fn(),
  })),
}));



describe('WeatherCard', () => {
  test('renders loading state correctly', async () => {
    render(
      <WeatherProvider>
        <WeatherCard />
      </WeatherProvider>
    );

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
    });

    await new Promise(resolve => setTimeout(resolve, 1000));
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


  test('handles loading state after refresh button click when already loading', async () => {
    render(
      <WeatherProvider>
        <WeatherCard />
      </WeatherProvider>
    );

    await waitFor(() => {
	  fireEvent.click(screen.getByTestId('refresh-button'));
      fireEvent.click(screen.getByTestId('refresh-button'));
      expect(fetchMock).toHaveBeenCalledTimes(1);
    });

    await new Promise(resolve => setTimeout(resolve, 1000));
  });

  test('handles failed refresh button click', async () => {
    render(
      <WeatherProvider>
        <WeatherCard />
      </WeatherProvider>
    );

    fetchMock.mockRejectOnce();


    await waitFor(() => {
	  fireEvent.click(screen.getByTestId('refresh-button'));
      expect(screen.getByTestId('error-message')).toBeInTheDocument();
    });

    await new Promise(resolve => setTimeout(resolve, 1000));
  });

  test('handles successful weather data loading', async () => {
  const weatherData = {
    name: 'Nairobi',
    sys: { country: 'KE' },
    weather: [{ description: 'clear', main: 'Clear' }],
    main: { temp: 25, humidity: 60, pressure: 1013 },
    wind: { speed: 5 },
    clouds: { all: 0 },
  };

  fetchMock.mockResponseOnce(JSON.stringify(weatherData));

  render(<WeatherCard />);

  await waitFor(() => {
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
  });

  expect(screen.getByText(/nairobi, ke/i)).toBeInTheDocument();
  expect(screen.getByText(/clear/i)).toBeInTheDocument();
  expect(screen.getByText(/25 °c/i)).toBeInTheDocument();
  expect(screen.getByText(/humidity: 60%/i)).toBeInTheDocument();
  expect(screen.getByText(/pressure: 1013 hpa/i)).toBeInTheDocument();
  expect(screen.getByText(/wind: 5 m\/s/i)).toBeInTheDocument();
  expect(screen.getByText(/precipitation: 0%/i)).toBeInTheDocument();

  expect(fetchMock).toHaveBeenCalled();

  await new Promise(resolve => setTimeout(resolve, 1000));
});


test('handles failed weather data loading with 401 error', async () => {

    render(
      <WeatherProvider>
        <WeatherCard />
      </WeatherProvider>
    );
	
  fetchMock.mockRejectOnce({ status: 401 });

  await waitFor(() => {
    expect(screen.getByTestId('error-message')).toBeInTheDocument();
    expect(screen.getByText(/status code 401/i)).toBeInTheDocument();
  });

  await new Promise(resolve => setTimeout(resolve, 1000));
});
});


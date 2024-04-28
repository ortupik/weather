
---

# Weather Dashboard Application

The Weather Dashboard is a web application that allows users to view weather information for various locations. Users can see details such as temperature, humidity, wind speed, and weather conditions for a selected location.

## Features

- View current weather information for a selected location.
- Refresh weather data.
- Handle error states gracefully.
- Responsive design for seamless usage on desktop and mobile devices.

## Technologies Used

- **React**: Frontend framework for building user interfaces.
- **Material-UI**: React component library for styling and UI components.
- **Jest**: Testing framework for unit and integration testing.
- **fetch**: API for making HTTP requests to retrieve weather data.
- **Webpack**: Module bundler for bundling JavaScript files for usage in a browser.
- **Babel**: JavaScript compiler for converting ES6+ code into backward-compatible versions of JavaScript.

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/ortupik/weather.git
   ```

2. **Navigate to the project directory**:

   ```bash
   cd weather-dashboard
   ```

3. **Install dependencies**:

   ```bash
   npm install
   ```

## Usage

1. **Set up environment variables**:

   Before running the application, ensure you have an API key for accessing weather data. Set the API key as an environment variable named `REACT_APP_API_KEY`.

   ```bash
   export REACT_APP_API_KEY=your_api_key_here
   ```

2. **Run the application**:

   ```bash
   npm start
   ```

3. **Access the application**:

   Open your web browser and navigate to `http://localhost:3000` to view the Weather Dashboard application.

4. **Live Web App**:

   You can also access the live web app at https://nairobi-weather.netlify.app

## Testing

The application includes unit tests to ensure its functionality. To run the tests, use the following command:

```bash
npm test
```

## Contributing

Contributions are welcome! If you find any bugs or have suggestions for improvements, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---
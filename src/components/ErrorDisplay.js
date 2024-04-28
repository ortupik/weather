import React from 'react';
import {
  Typography, Alert, CircularProgress, Box,
} from '@mui/material';

const ErrorDisplay = ({ error, loading }) => {
  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          marginTop: 3,
        }}
      >
        <CircularProgress data-testid="loading-spinner" />
      </Box>
    );
  }

  if (error && error.response && error.response.status === 404) {
    return (
      <Alert severity="warning" sx={{ marginTop: 2 }}>
        <Typography>No weather data available for the specified location.</Typography>
      </Alert>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ marginTop: 2 }}>
        <Typography>Could not fetch data at this time, try again later!</Typography>
        <Typography data-testid="error-message">
          Error:
          {error.message}
        </Typography>
      </Alert>
    );
  }

  return null;
};

export default ErrorDisplay;

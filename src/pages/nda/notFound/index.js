import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button } from '@mui/material';

const NotFound = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <Typography variant="h3" gutterBottom>
        404 - Page Not Found
      </Typography>
      <Typography variant="subtitle1">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </Typography>
      <Link to="/" style={{ textDecoration: 'none', marginTop: '20px' }}>
        <Button variant="contained" color="primary">
          Go to Home Page
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;

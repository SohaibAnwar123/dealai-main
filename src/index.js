import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/main.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import 'bootstrap/dist/css/bootstrap.min.css';

const stripePromise = loadStripe('pk_live_51P6c1zLm5PVUcCyaREukFWgNcTqqh5kxXNCooCXpSwAPk2o50p7OQLi5kem3VhgpTIJTq73spsI6QbdCV4QkPyoJ00SbUpeW4v'); // Replace with your Stripe public key

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#0F46D2',
    },
  },
  typography: {
    fontFamily: "Poppins",
    h1: { fontSize: 32 },
    h2: { fontSize: 28 },
    h3: { fontSize: 24 },
    h4: { fontSize: 20 },
    h5: { fontSize: 14 },
    subtitle1: {
      fontSize: 18,
      color: '#ffffff',
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Elements stripe={stripePromise}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ThemeProvider>
      </Elements>
    </Provider>
  </React.StrictMode> 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

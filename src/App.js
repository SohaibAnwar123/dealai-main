import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import Footer from './layout/footer';
import Navbar from './layout/navbar';
import { Routers, NdaRouters } from './router/routers';
import AppBar from './components/AppBar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AuthHandler from './AuthHandler'; // Import the AuthHandler component
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { StyledEngineProvider } from '@mui/material/styles';

function App() {
  const location = useLocation();
  const login=localStorage.getItem("isLoggedIn")
  const isLoggedIn =login; // Replace with your authentication logic to check if the user is logged in

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      easing: 'ease-in-out', // Easing options: 'linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out'
      once: true
    });
  }, []);
  const chakraTheme = extendTheme({
    colors: {
      primary: '#000000',
      secondary: '#0F46D2',
    },
    fonts: {
      heading: "Poppins",
      body: "Poppins",
    },
  });
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

  const isHomePage = location.pathname === "/";

  return (
    <ThemeProvider theme={theme}>
            <ChakraProvider theme={chakraTheme}>
            <StyledEngineProvider injectFirst>
      <div className="App">
        <AuthHandler /> {/* Include AuthHandler component */}
        {isHomePage ? (
          <>
            <Navbar />
            <Routers />
            <Footer />
          </>
        ) : (
          <>
            <NdaRouters isLoggedIn={isLoggedIn} />
            </>
        )}
      </div>
      </StyledEngineProvider>
      </ChakraProvider>

    </ThemeProvider>
  );
}

export default App;

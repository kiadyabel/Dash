import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ThemeProvider, createTheme } from "@mui/material/styles"; // Importez createTheme également si nécessaire

// Créez un thème MUI personnalisé si nécessaire ,( ex : pour le breakpoints pour useMediaQuery)
const theme = createTheme();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ThemeProvider>
);


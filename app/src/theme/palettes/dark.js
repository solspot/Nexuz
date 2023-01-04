import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    useNextVariants: true
  },
  font: {
    main: 'Space Grotesk, Sans-Serif',
    display: 'Alfa Slab One, Serif',
    alt: 'Poppins, Sans-Serif'
  },
  palette: {
    primary: {
      main: '#0b090a',
      second: '#252422'
    },
    accent: {
      main: '#C5BACB'
    },
    text: {
      main: '#E9E9E9',
      alt: '#C7C7C7'
    },
    button: {
      main: '#46434A',
      hover: '#555059',
      text: '#fff'
    },
    action: {
      success: '#27D017',
      error: '#d00000'
    },
    neutral: {
      white: '#fff',
      black: '#000'
    }
  }
});

export default theme;

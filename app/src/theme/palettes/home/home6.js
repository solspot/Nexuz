import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    useNextVariants: true
  },
  mode: 'home6',
  font: {
    main: 'Space Grotesk, Sans-Serif',
    display: 'Alfa Slab One, Serif',
    alt: 'Poppins, Sans-Serif'
  },
  palette: {
    primary: {
      main: '#1E2149',
      second: '#181B38',
      third: '#1B1E43'
    },
    accent: {
      main: '#E6E3C7', // display text
      second: '#B92C34' //alt accent
    },
    text: {
      main: '#fff',
      alt: '#C7C7C7'
    },
    button: {
      main: '#E6E3C7',
      hover: '#C7C7C7',
      text: '#000',
      outline: '#B92C34'
    },
    neutral: {
      white: '#fff',
      black: '#000'
    }
  }
});

export default theme;

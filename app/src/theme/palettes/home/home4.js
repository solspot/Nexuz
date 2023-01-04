import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    useNextVariants: true
  },
  mode: 'home4',
  font: {
    main: 'Space Grotesk, Sans-Serif',
    display: 'Alfa Slab One, Serif',
    alt: 'Poppins, Sans-Serif'
  },
  palette: {
    primary: {
      main: '#BED3E0',
      second: '#DAE5EC',
      third: '#D2E1EA'
    },
    accent: {
      main: '#F05D5E', // display text
      second: '#0F7173' //alt accent
    },
    text: {
      main: '#000',
      alt: '#F05D5E'
    },
    button: {
      main: '#fff',
      hover: '#C7C7C7',
      text: '#000',
      outline: '#000'
    },
    neutral: {
      white: '#fff',
      black: '#000'
    }
  }
});

export default theme;

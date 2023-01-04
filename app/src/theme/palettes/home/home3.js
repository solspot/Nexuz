import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    useNextVariants: true
  },
  mode: 'home3',
  font: {
    main: 'Space Grotesk, Sans-Serif',
    display: 'Alfa Slab One, Serif',
    alt: 'Poppins, Sans-Serif'
  },
  palette: {
    primary: {
      main: '#E84F70',
      second: '#E84F70',
      third: '#E84F70'
    },
    accent: {
      main: '#FFD167', // display text
      second: '#2A4C75' //alt accent
    },
    text: {
      main: '#fff',
      alt: '#C7C7C7'
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

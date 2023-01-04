import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    useNextVariants: true
  },
  mode: 'home1',
  font: {
    main: 'Space Grotesk, Sans-Serif',
    display: 'Alfa Slab One, Serif',
    alt: 'Poppins, Sans-Serif'
  },
  palette: {
    primary: {
      main: '#FFF2D0',
      second: '#FFF2D0',
      third: '#FFF2D0'
    },
    accent: {
      main: '#AF101F', // display text
      second: '#FFCD03' //alt accent
    },
    text: {
      main: '#616161',
      alt: '#C7C7C7'
    },
    button: {
      main: '#fff',
      hover: '#C7C7C7',
      text: '#fff',
      outline: '#000'
    },
    neutral: {
      white: '#fff',
      black: '#000'
    }
  }
});

export default theme;

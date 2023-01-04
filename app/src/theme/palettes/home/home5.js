import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    useNextVariants: true
  },
  mode: 'home5',
  font: {
    main: 'Space Grotesk, Sans-Serif',
    display: 'Alfa Slab One, Serif',
    alt: 'Poppins, Sans-Serif'
  },
  palette: {
    primary: {
      main: '#E8B7B8',
      second: '#EDC5C6',
      third: '#EBC0C1'
    },
    accent: {
      main: '#B5838D', // display text
      second: '#595461' //alt accent
    },
    text: {
      main: '#000',
      alt: '#000'
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

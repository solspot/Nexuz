import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    useNextVariants: true
  },
  mode: 'home2',
  font: {
    main: 'Space Grotesk, Sans-Serif',
    display: 'Alfa Slab One, Serif',
    alt: 'Poppins, Sans-Serif'
  },
  palette: {
    primary: {
      main: '#34504D',
      second: '#283D3B',
      third: '#2D4543'
    },
    accent: {
      main: '#EDDDD4', // display text
      second: '#197278' //alt accent
    },
    text: {
      main: '#fff',
      alt: '#000'
    },
    button: {
      main: '#fff',
      hover: '#C7C7C7',
      text: '#000',
      outline: '#197278'
    },
    neutral: {
      white: '#fff',
      black: '#000'
    }
  }
});

export default theme;

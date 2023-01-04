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
      main: '#7A6E82',
      second: '#84778C'
    },
    accent: {
      main: '#C5BACB'
    },
    text: {
      main: '#E9E9E9',
      alt: '#C7C7C7'
    },
    button: {
      main: '#BDA5CC',
      hover: '#B093C2',
      text: '#000'
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

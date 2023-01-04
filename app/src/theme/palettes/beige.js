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
      main: '#e3d5ca',
      second: '#d6ccc2'
    },
    accent: {
      main: '#C5BACB'
    },
    text: {
      main: '#403C35',
      alt: '#625C51'
    },
    button: {
      main: '#D1BAA8',
      hover: '#C8AC96',
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

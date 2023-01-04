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
      main: '#fffbf8',
      second: '#F7F4F1'
    },
    accent: {
      main: '#CF9AF5'
    },
    text: {
      main: '#000',
      alt: '#515151'
    },
    button: {
      main: '#DDCBEB',
      hover: '#CFB5E2',
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

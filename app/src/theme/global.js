// 1. GlobalStyles.js

export const globalStyles = {
  MuiButton: {
    styleOverrides: {
      root: {
        fontSize: '1rem',
        fontFamily: 'Oxygen, sans-serif'
      }
    }
  },
  MuiInput: {
    styleOverrides: {
      root: {
        fontFamily: 'Oxygen, sans-serif'
      }
    }
  },
  MuiTypography: {
    styleOverrides: {
      root: {
        fontFamily: 'Oxygen, sans-serif'
      },
      '& h1, & h2, & h3, & h4, & h5, & h6': {
        fontFamily: 'Oxygen, sans-serif'
      },
      body1: {
        fontFamily: 'Oxygen, sans-serif',
        fontWeight: 300
      },
      body2: {
        fontFamily: 'Oxygen, sans-serif',
        fontWeight: 300
      }
    }
  }
};

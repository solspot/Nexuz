import React, { useState } from "react";
import PropTypes from "prop-types";
import { CssBaseline } from "@mui/material";
import { ThemeProvider as MUIThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import getTheme from "./base";

// eslint-disable-next-line no-unused-vars
export const CustomThemeContext = React.createContext({
  currentTheme: "light",
  setTheme: null,
});

ThemeProvider.propTypes = {
  children: PropTypes.node,
};

export default function ThemeProvider({ children }) {
  // Read current theme from localStorage or maybe from an api
  const currentTheme = "light";

  // State to hold the selected theme name
  const [themeName, _setThemeName] = useState(currentTheme);

  // Retrieve the theme object by theme name
  const theme = getTheme(themeName);

  // Wrap _setThemeName to store new theme names in localStorage
  const setThemeName = (name) => {
    _setThemeName(name);
  };

  const contextValue = {
    currentTheme: themeName,
    setTheme: setThemeName,
  };

  return (
    <CustomThemeContext.Provider value={contextValue}>
      <StyledEngineProvider injectFirst>
        <CssBaseline />
        <MUIThemeProvider theme={theme}>{children}</MUIThemeProvider>
      </StyledEngineProvider>
    </CustomThemeContext.Provider>
  );
}

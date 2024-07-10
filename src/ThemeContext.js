
import React, { createContext, useContext, useState, useEffect } from 'react';
import { themes } from './themes';
import { useTranslation } from 'react-i18next';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const { i18n } = useTranslation();
  const [theme, setTheme] = useState(themes[i18n.language]);

  useEffect(() => {
    setTheme(themes[i18n.language]);
  }, [i18n.language]);

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

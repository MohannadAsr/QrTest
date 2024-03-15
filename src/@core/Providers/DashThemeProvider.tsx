import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { switchMode } from '@src/actions/App/AppSlice';
import useLang from '@src/hooks/useLang';
import { AppDispatch, RootState } from '@src/store/store';
import React, { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { themeConfig } from '@src/themeConfig';

export const lightTheme = createTheme({
  direction: 'ltr',
  components: {
    MuiButton: {
      defaultProps: {
        variant: 'contained',
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          backgroundColor: '#fff',
        },
      },
    },
  },

  shape: {
    borderRadius: themeConfig.themeborderRadius, // Set the desired global border radius
  },
  palette: {
    ...themeConfig.PaletteOptions,
    mode: 'light',
    background: {
      default: '#f8f8f8', // Set your custom background color for dark mode
      paper: '#fff',
    },
  },
});

export const darkTheme = createTheme({
  direction: 'ltr',
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          backgroundColor: '#fff',
          color: '#1f1f1e',
        },
      },
    },
  },

  shape: {
    borderRadius: themeConfig.themeborderRadius, // Set the desired global border radius
  },
  palette: {
    ...themeConfig.PaletteOptions,
    mode: 'dark',
    background: {
      default: '#161d31',
      paper: '#283046', // Set your custom background color for dark mode
    },
  },
});

const DashThemeProvider = ({ children }: { children: ReactNode }) => {
  const { t, i18n } = useTranslation();
  const { mode } = useSelector((state: RootState) => state.App);
  const { changeHtml } = useLang();
  const dispatch = useDispatch<AppDispatch>();

  React.useEffect(() => {
    // Check for any existed theme mode and update it
    // const siteMode = localStorage.getItem('site-mode');
    dispatch(switchMode('light'));

    // Chnage HTML dir onLaod
    changeHtml(i18n.language);
  }, []);

  return (
    <ThemeProvider theme={mode == 'dark' ? darkTheme : lightTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default DashThemeProvider;

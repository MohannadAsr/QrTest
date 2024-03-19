import { PaletteOptions } from '@mui/material';

type themeConfigType = {
  name: string;
  API_URL: string;
  localStorageName: string;
  PaletteOptions: PaletteOptions;
  themeborderRadius: number;
  singleLanguage: { value: boolean; lang: string | null };
};

export const themeConfig: themeConfigType = {
  name: 'L1',
  API_URL: 'https://app-d89731df-3847-4a27-a904-ae31a58bb467.cleverapps.io',
  localStorageName: 'it-trendco',
  PaletteOptions: {
    primary: {
      main: '#58005d',
      light: '#FFEDE4',
    },
    error: {
      main: '#ef4444',
    },
    success: {
      main: '#BFDD00',
    },
    secondary: {
      main: '#824485',
    },
  }, // Always check for matching these colors with tailwindcss config to avoid difference colors
  themeborderRadius: 4,
  singleLanguage: { value: true, lang: 'de' },
};

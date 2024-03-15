import { Button, styled } from '@mui/material';
import { lightTheme } from '@src/@core/Providers/DashThemeProvider';
import { themeConfig } from '@src/themeConfig';

export const SuccessBtn = styled(Button)({
  minWidth: 100,
  fontWeight: 700,
  backgroundColor: lightTheme.palette.success.main,
  color: themeConfig.PaletteOptions.primary.main,
  ':hover': {
    backgroundColor: lightTheme.palette.success.main,
    color: themeConfig.PaletteOptions.primary.main,
  },
});

export const ErrorBtn = styled(Button)({
  minWidth: 100,
  fontWeight: 700,
  backgroundColor: lightTheme.palette.error.main,
  ':hover': {
    backgroundColor: lightTheme.palette.error.main,
  },
});

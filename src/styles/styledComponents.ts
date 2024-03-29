import { styled } from '@mui/material';
import { lightTheme } from '@src/@core/Providers/DashThemeProvider';
import { themeConfig } from '@src/themeConfig';
import LoadingButton from '@mui/lab/LoadingButton';

export const SuccessBtn = styled(LoadingButton)({
  minWidth: 100,
  fontWeight: 700,
  backgroundColor: lightTheme.palette.success.main,
  color: lightTheme.palette.primary.main,
  ':hover': {
    backgroundColor: lightTheme.palette.success.main,
    color: lightTheme.palette.primary.main,
  },
});

export const ErrorBtn = styled(LoadingButton)({
  minWidth: 100,
  fontWeight: 700,
  backgroundColor: lightTheme.palette.error.main,
  color: '#fff',

  ':hover': {
    backgroundColor: lightTheme.palette.error.main,
  },
});

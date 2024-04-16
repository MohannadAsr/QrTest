import { Button, SwitchProps, styled } from '@mui/material';
import { lightTheme } from '@src/@core/Providers/DashThemeProvider';
import LoadingButton from '@mui/lab/LoadingButton';

export const AddButton = styled(LoadingButton)({
  color: '#fff',
  minWidth: '150px',
  backgroundImage: 'linear-gradient(45deg ,#e4a62d,#e6b13c)',
  ':hover': {
    color: '#fff',
    backgroundImage: 'linear-gradient(45deg ,#e4a62d,#e6b13c)',
  },
});

export const errorGradientColor = 'linear-gradient(45deg, #EB3349, #F45C43)';

export const ErrorButton = styled(LoadingButton)(({ theme }) => ({
  color: '#fff',
  minWidth: '150px',
  backgroundImage: errorGradientColor,
}));

import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { IconButton } from '@mui/material';
import { switchMode } from '@src/actions/App/AppSlice';
import { AppDispatch, RootState } from '@src/store/store';
import { useDispatch, useSelector } from 'react-redux';
import CustomIcon from './MuiIcon';

function ThemeSwitcher() {
  const dispatch = useDispatch<AppDispatch>();
  const { mode } = useSelector((state: RootState) => state.App);
  return (
    <IconButton
      onClick={() => dispatch(switchMode(mode == 'dark' ? 'light' : 'dark'))}
    >
      {mode == 'dark' ? (
        <CustomIcon name="DarkMode" />
      ) : (
        <CustomIcon name="LightMode" />
      )}
    </IconButton>
  );
}

export default ThemeSwitcher;

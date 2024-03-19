import { Paper } from '@mui/material';

import { NavigationRoutes } from '../Navigation/DashNavigation';
import logo from '/logo.webp';
import NavList from './NavList';

function DashSideMenu() {
  return (
    <Paper
      elevation={0}
      sx={{ borderRadius: 0 }}
      className=" flex flex-col p-4 md:p-0 max-h-[100vh] h-full "
    >
      <div className=" bg-primary w-fit mx-auto p-4 brand-rounded">
        <img
          src={logo}
          alt=""
          loading="eager"
          className=" object-contain w-full max-h-[70px] pt-2"
        />
      </div>

      <div className=" my-3 flex flex-col overflow-auto flex-1 gap-4 px-2 bg-primary pt-4 brand-rounded">
        <NavList />
      </div>
    </Paper>
  );
}

export default DashSideMenu;

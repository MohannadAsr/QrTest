import { Paper } from '@mui/material';

import { NavigationRoutes } from '../Navigation/DashNavigation';
import logo from '/logo.webp';
import NavList from './NavList';

function DashSideMenu() {
  return (
    <div className=" flex flex-col p-4 md:p-0 max-h-[100vh] h-full bg-primary ">
      <div className=" bg-primary w-fit mx-auto p-4 brand-rounded mt-3 border-[2px] border-white">
        <img
          src={logo}
          alt=""
          loading="eager"
          className=" object-contain w-full max-h-[70px] pt-2"
        />
      </div>

      <div className=" my-3 flex flex-col overflow-auto flex-1 gap-4 px-5  pt-4 brand-rounded ">
        <NavList />
      </div>
    </div>
  );
}

export default DashSideMenu;

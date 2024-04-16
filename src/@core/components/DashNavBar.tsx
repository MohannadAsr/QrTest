import { Paper } from '@mui/material';
import ThemeSwitcher from './ThemeSwitcher';
import LangSwitcher from './LangSwitcher';
import DashLogout from './DashControl';
import MobileSideMenu from './MobileSideMenu';

function DashNavBar() {
  return (
    <div className=" w-full sticky top-3 flex items-center justify-between p-3 lg:p-2 bg-primary brand-rounded shadow-lg">
      <div className=" flex items-center gap-3">
        <MobileSideMenu />
        {/* <ThemeSwitcher /> */}
        {/* <LangSwitcher /> */}
      </div>
      <div>
        <DashLogout />
      </div>
    </div>
  );
}

export default DashNavBar;

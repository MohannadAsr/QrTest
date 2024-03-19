import { IconButton, Paper } from '@mui/material';
import ThemeSwitcher from './ThemeSwitcher';
import LangSwitcher from './LangSwitcher';
import DashLogout from './DashControl';
import MobileSideMenu from './MobileSideMenu';
import logo from '/logo.webp';
import MuiIcon from './MuiIcon';
import NavList from './NavList';

function DashNavBar() {
  return (
    <div className=" w-full gap-1 md:gap-3 sticky top-3 flex  justify-between p-2  h-full   ">
      <div className="  bg-primary py-4 px-5 brand-rounded shadow-xl flex justify-center items-center ">
        <img
          src={logo}
          alt=""
          className=" h-[30px] md:h-[90px] object-contain "
        />
      </div>
      <div className=" h-fit max-h-full shadow-xl  w-full bg-primary flex items-center justify-between brand-rounded px-2 lg:px-10  py-3">
        <div>
          <span className=" md:flex hidden  items-center  gap-2 lg:gap-5  justify-evenly">
            <NavList />
          </span>
          <span className="md:hidden flex">
            <MobileSideMenu />
            {/* <IconButton>
              <MuiIcon name="Menu" className=" text-white" color="inherit" />
            </IconButton> */}
          </span>
        </div>

        <DashLogout />
      </div>
    </div>
  );
}

export default DashNavBar;

{
  // Sharing with whatsapp
  /* <a
            href="https://wa.me/1234567890?text=Check%20out%20this%20cool%20website:%20https://example.com"
            target="_blank"
          >
            Share on WhatsApp
          </a> */
}

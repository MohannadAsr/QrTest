import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { ReactNode } from 'react';
import DashSideMenu from '../components/DashSideMenu';
import DashNavBar from '../components/DashNavBar';
import background from '/background.jpg';

function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className=" grid grid-cols-12 ">
        <div className="hidden lg:block  lg:col-span-3 2xl:col-span-2  ">
          <Paper
            elevation={0}
            className=" w-full sticky top-0 left-0   shadow-md h-[100vh]  "
          >
            <DashSideMenu />
          </Paper>
        </div>
        <div
          className="col-span-12   lg:col-span-9 2xl:col-span-10  min-h-[100vh]  flex flex-col gap-2 w-full md:bg-cover bg-contain bg-repeat  relative"
          style={{ backgroundImage: `url(${background})` }}
        >
          <span className=" absolute left-0 top-0 h-full w-full bg-primary opacity-60 z-[1] "></span>
          <div className=" md:p-5 p-2 sticky   top-0   z-[999]">
            <DashNavBar />
          </div>
          <div className=" flex flex-col gap-3  flex-1  px-2 lg:px-10 justify-between ">
            <div className=" flex-1 mb-10 z-[2]">{children}</div>

            <div className="  capitalize text-xs md:text-sm z-[2] text-white">
              COPYRIGHT © 2024{' '}
              <a
                href="https://ddm-agentur.de/"
                className=" text-success font-semibold"
              >
                DDM-Agentur
              </a>{' '}
              , All rights Reserved
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MainLayout;

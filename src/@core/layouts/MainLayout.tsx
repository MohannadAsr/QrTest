import { ReactNode } from 'react';
import DashNavBar from '../components/DashNavBar';
import background from '/background.jpg';

function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <div
        className="  relative  md:bg-cover bg-contain bg-repeat  "
        style={{ backgroundImage: `url(${background})` }}
      >
        <span className=" absolute left-0 top-0 h-full w-full bg-primary opacity-60 z-[1] "></span>

        <div className="    relative  min-h-[100vh] flex flex-col z-[2]">
          <div className="  sticky top-0  z-[999]">
            <DashNavBar />
          </div>
          <div className=" px-3 md:px-7 py-3 flex flex-col justify-between items-start flex-1   ">
            <div className=" container my-2 mb-14 ">{children}</div>
            <div className=" text-white drop-shadow-lg uppercase text-center text-xs md:text-sm">
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
    </div>
  );
}

export default MainLayout;

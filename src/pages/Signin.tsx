import React from 'react';
import logo from '/logo.webp';
import { Paper } from '@mui/material';
import { themeConfig } from '@src/themeConfig';
import SignInForm from '@src/Auth/SignInForm';
import background from '/background.jpg';
function Signin() {
  return (
    <div className=" grid grid-cols-12">
      <div
        className=" col-span-0 md:col-span-7 md:flex hidden p-5  items-center justify-center h-[100vh] bg-primary relative"
        style={{ backgroundImage: `url(${background})` }}
      >
        <span className=" absolute left-0 top-0 h-full w-full bg-primary opacity-70 z-[1] "></span>
        <img
          src={logo}
          alt="dash-logo"
          className=" w-full max-h-[550px] object-contain z-[2]"
        />
      </div>
      <div className=" col-span-12 md:col-span-5 min-h-[100vh]  relative bg-cover bg-white">
        <div className=" h-full p-6 flex items-center justify-center  ">
          <div className=" flex flex-col gap-4 z-[2]">
            <div>
              <h1 className=" text-3  drop-shadow-lg">
                Willkommen beim{' '}
                <span className=" text-primary font-bold">
                  {themeConfig?.name}
                </span>{' '}
                -Dashboard
              </h1>
              <h2 className=" drop-shadow-lg">
                Bitte melden Sie sich bei Ihrem Konto an{' '}
              </h2>
            </div>
            <div className=" my-4">
              <SignInForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;

import React from 'react';
import logo from '/logo.webp';
import { Paper } from '@mui/material';

export const AppLoading = () => {
  return (
    <Paper className=" h-[100vh] flex items-center justify-center app-loading">
      <div className=" flex flex-col gap-5 items-center justify-center">
        <div className=" bg-primary p-5 rounded-md">
          <img src={logo} alt="ladoing" className=" w-20 md:w-44" />
        </div>
      </div>
    </Paper>
  );
};

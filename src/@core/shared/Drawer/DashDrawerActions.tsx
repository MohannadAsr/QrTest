import { Paper } from '@mui/material';
import React from 'react';

function DashDrawerActions({ children }) {
  return (
    <Paper className="  flex items-center justify-center mt-3 fixed bottom-0 right-0 w-full py-2 px-4  bg-black shadow-lg z-[999999]">
      {children}
    </Paper>
  );
}

export default DashDrawerActions;

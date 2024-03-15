import { IconButton } from '@mui/material';
import React from 'react';
import MuiIcon from './MuiIcon';
import { useAuth } from '@src/Auth/useAuth';

function DashControl() {
  const { LogOut } = useAuth();
  return (
    <div className=" flex items-center gap-2 ">
      <IconButton>
        <MuiIcon name="Person" className="text-white" />
      </IconButton>
      <IconButton onClick={() => LogOut()}>
        <MuiIcon name="ExitToApp" className="text-white" />
      </IconButton>
    </div>
  );
}

export default DashControl;

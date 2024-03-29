import { IconButton } from '@mui/material';
import MuiIcon from '@src/@core/components/MuiIcon';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function GoBack({ customAction }: { customAction?: () => void }) {
  const navigate = useNavigate();

  const handelNavigate = () => {
    customAction ? customAction() : navigate(-1);
  };
  return (
    <IconButton onClick={handelNavigate}>
      <MuiIcon name="ArrowBack" color="inherit" className=" text-white" />
    </IconButton>
  );
}

export default GoBack;

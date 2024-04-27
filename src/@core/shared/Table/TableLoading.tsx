import React from 'react';
import TextTranslation from '../Translation/TextTranslation';
import { CircularProgress } from '@mui/material';

function TableLoading() {
  return (
    <div className=" my-10 flex justify-center items-center flex-col text-white font-bold gap-2">
      <p>
        <TextTranslation>Loading ,Please Wait</TextTranslation>
      </p>
      <CircularProgress color="inherit" className=" text-white" />
    </div>
  );
}

export default TableLoading;

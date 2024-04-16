import { CircularProgress } from '@mui/material';
import React from 'react';

function SectionLoading() {
  return (
    <div className=" flex items-center justify-center py-10">
      <CircularProgress />
    </div>
  );
}

export default SectionLoading;

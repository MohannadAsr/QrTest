import React, { ReactNode } from 'react';
import TableError from '../Table/TableError';
import NoTableData from '../Table/NoTableData';
import { CircularProgress } from '@mui/material';
import TextTranslation from '../Translation/TextTranslation';

function SectionData({
  children,
  dataLength,
  isError,
  name,
  isLoading,
}: {
  children: ReactNode;
  dataLength: number;
  isError: boolean;
  name: string;
  isLoading: boolean;
}) {
  if (isLoading)
    return (
      <div className=" my-10 flex justify-center items-center flex-col text-primary font-bold gap-2">
        <p>
          <TextTranslation>Loading ,Please Wait</TextTranslation>
        </p>
        <CircularProgress />
      </div>
    );

  if (isError) return <TableError />;
  if (dataLength == 0) return <NoTableData name={name} />;
  return <div>{children}</div>;
}

export default SectionData;

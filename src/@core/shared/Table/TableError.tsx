import React from 'react';

function TableError() {
  return (
    <div className=" my-10 text-center flex justify-center items-center flex-col text-gray-400 font-bold gap-2 text-2xl md:text-3xl">
      <p>Error Fetching Data (please check your connection)</p>
      <p className=" text-sm">
        {' '}
        Maybe the Data you are looking for was deleted if you still get this
        message
      </p>
    </div>
  );
}

export default TableError;

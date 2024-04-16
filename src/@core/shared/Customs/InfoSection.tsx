import React from 'react';

function InfoSection({ children }) {
  return (
    <div className=" flex items-center flex-col gap-5 justify-center text-4 text-gray-400 py-10">
      {children}
    </div>
  );
}

export default InfoSection;

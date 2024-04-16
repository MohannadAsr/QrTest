import React from 'react';
import GoBack from './GoBack';

function SectionNotFound({ itemName }: { itemName: string }) {
  return (
    <div className=" flex items-center flex-col gap-5 justify-center text-4 text-gray-400 py-10">
      {itemName} Not Found
      <GoBack />
    </div>
  );
}

export default SectionNotFound;

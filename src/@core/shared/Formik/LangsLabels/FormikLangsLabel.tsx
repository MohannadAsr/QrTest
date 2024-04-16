import React, { ReactNode } from 'react';

function FormikLangsLabel({
  flag,
  title,
}: {
  flag: 'ar' | 'de' | 'en' | 'tr';
  title: string | ReactNode;
}) {
  return (
    <div className=" flex items-center gap-2">
      <img
        loading="eager"
        src={`/langs/${flag}.svg`}
        className=" w-[25px] object-contain"
      />
      <p>{title}</p>
    </div>
  );
}

export default FormikLangsLabel;

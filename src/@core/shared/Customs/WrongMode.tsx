import React from 'react';
import TextTranslation from '../Translation/TextTranslation';
import { DashboardMode } from '@src/@core/components/DashSideMenu';

function WrongMode() {
  return (
    <div className=" my-10 text-center flex justify-center items-center flex-col text-gray-400 font-bold gap-2 text-2xl md:text-3xl">
      <p>
        <TextTranslation>
          This Item Type Not Similar to the Dashboard Mode Please Switch to Mode
          That Match the item Mode
        </TextTranslation>{' '}
        (<TextTranslation>Großhandel</TextTranslation> |{' '}
        <TextTranslation>Einzelhandel</TextTranslation>)
      </p>
      <p className=" text-sm">
        <TextTranslation>
          This Message to prevent inserting any wrong data , and keep your data
          safe , please change the mode by clicking the button below
        </TextTranslation>
      </p>
      <DashboardMode lg />
    </div>
  );
}

export default WrongMode;

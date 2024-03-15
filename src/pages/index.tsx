import { themeConfig } from '@src/themeConfig';
import React from 'react';

function Home() {
  return (
    <div className=" text-white">
      <h1 className=" text-2 font-bold">
        Willkommen beim{' '}
        <span className=" text-success">{themeConfig.name}</span> Dashboard
      </h1>
      <p className=" text-7 ">
        Take a Quick{' '}
        <span className=" text-success font-medium"> Overview </span> about your
        Dashboard
      </p>
    </div>
  );
}

export default Home;

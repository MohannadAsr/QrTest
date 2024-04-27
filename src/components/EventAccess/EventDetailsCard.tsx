import React from 'react';
import { format } from 'date-fns';
import logo from '/logo.webp';

const EventDetailsCard = ({ data, isEnded, CountDown }) => {
  return (
    <div className=" grid grid-cols-1 lg:grid-cols-2 bg-primary/70 rounded-md ">
      <div className=" bg-primary/70  p-3 flex justify-center items-center rounded-md">
        <img
          src={data?.image || logo}
          alt=""
          className={` ${
            data?.image ? 'object-contain' : 'object-contain'
          }  max-h-[250px] md:max-h-[350px] h-full  w-full`}
        />
      </div>
      <div>
        <div className=" z-[2] flex  justify-between text-white p-5 flex-wrap">
          <p className=" text-6">{data?.name}</p>
          {data?.date && (
            <p className="   ">
              {format(new Date(data?.date), ' dd-MM-yyyy , HH:mm')}
            </p>
          )}
        </div>
        {isEnded ? (
          <div className=" text-center text-7 bg-white  text-red-500 font-semibold">
            Dieses Ereignis hat sogar begonnen oder endete
          </div>
        ) : (
          <div className="bg-white py-3 px-2">
            <p className=" text-center text-7  text-primary uppercase">
              BEGINNT IN
            </p>
            {CountDown && (
              <div className=" flex justify-evenly items-center gap-3 text-6 text-center  text-white text-7">
                <p className=" bg-primary/80 p-3 rounded-lg flex-1 flex md:flex-row flex-col gap-0 md:gap-2">
                  <span className="text-success text-6">{CountDown.day}</span>{' '}
                  Tage
                </p>
                <p className=" bg-primary/80 p-3 rounded-lg flex-1 flex md:flex-row flex-col gap-0 md:gap-2">
                  <span className="text-success text-6"> {CountDown.hour}</span>{' '}
                  Std.
                </p>
                <p className=" bg-primary/80 p-3 rounded-lg flex-1 flex md:flex-row flex-col gap-0 md:gap-2">
                  <span className="text-success text-6">
                    {CountDown.minute}
                  </span>{' '}
                  Min
                </p>
                <p className=" bg-primary/80 p-3 rounded-lg flex-1 flex md:flex-row flex-col gap-0 md:gap-2">
                  <span className="text-success text-6">
                    {CountDown.second}
                  </span>{' '}
                  Sek
                </p>
              </div>
            )}
          </div>
        )}
        {data?.description && (
          <div className=" max-h-[190px] overflow-auto  p-3  bg-primary/50 my-2 text-white ">
            <p className="  text-7  ">{data?.description}</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default EventDetailsCard;

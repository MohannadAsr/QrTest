import { useHomeInfos } from '@src/actions/Events/useEventsQueries';
import { countDownDto, useCountDown } from '@src/hooks/useCountDown';
import { themeConfig } from '@src/themeConfig';
import { format } from 'date-fns';
import React from 'react';
import logo from '/logo.webp';
import MuiIcon from '@src/@core/components/MuiIcon';
import { Link } from 'react-router-dom';
import { SuccessBtn } from '@src/styles/styledComponents';

function Home() {
  const { data, isLoading } = useHomeInfos();
  const { counter } = useCountDown();
  const [CountDown, setCountDown] = React.useState<countDownDto | null>(null);
  const startedRef = React.useRef(false);
  React.useEffect(() => {
    if (data?.nextEvent && !startedRef.current) {
      startedRef.current = true;
      setInterval(() => {
        setCountDown(
          counter(new Date(data.nextEvent.date).toISOString(), false)
        );
      }, 1000);
    }
  }, [data]);

  if (isLoading) return <></>;

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
      <div className=" mt-7">
        <p className=" text-4 my-3 px-3">Kommende Veranstaltung</p>
        <div className=" grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className=" bg-primary/70 brand-rounded p-3 flex justify-center items-center">
            <Link to={`/events/${data?.nextEvent?.id}`}>
              <img
                src={data?.nextEvent?.image || logo}
                loading="lazy"
                alt=""
                className={` ${
                  data?.nextEvent?.image ? 'object-cover' : 'object-contain'
                } brand-rounded max-h-[250px] md:max-h-[350px] h-full  w-full`}
              />
            </Link>
          </div>
          <div className=" flex flex-col gap-3  justify-between  bg-primary/70 brand-rounded p-5 min-h-[340px]">
            <div className=" flex flex-col gap-4">
              <div className=" flex items-center justify-between  flex-wrap">
                <h1 className=" text-success font-bold  capitalize text-3">
                  {data?.nextEvent?.name}
                </h1>
                <p className=" text-5 text-white font-bold items-center flex gap-1">
                  {format(
                    new Date(data.nextEvent?.date),
                    ' dd-MM-yyyy , HH:MM'
                  )}
                </p>
              </div>
              <div className=" bg-black/30 p-4 rounded-lg px-2 flex-1   ">
                <p className=" text-white text-5 overflow-auto min-h-[130px] max-h-[130px] md:min-h-[200px] md:max-h-[200px] ">
                  {data.nextEvent?.description}
                </p>
              </div>
            </div>
            <div>
              {CountDown && (
                <div className=" flex justify-evenly items-center gap-3 text-6 text-center  text-white text-7">
                  <p className=" bg-primary/80 p-3 rounded-lg flex-1 flex md:flex-row flex-col gap-0 md:gap-2">
                    <span className="text-success text-6">{CountDown.day}</span>{' '}
                    Tag
                  </p>
                  <p className=" bg-primary/80 p-3 rounded-lg flex-1 flex md:flex-row flex-col gap-0 md:gap-2">
                    <span className="text-success text-6">
                      {' '}
                      {CountDown.hour}
                    </span>{' '}
                    Std
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
          </div>
        </div>
      </div>
      <p className="text-4 mt-10 px-3 ">Kurzer Rückblick</p>
      <div className=" grid grid-cols-1 md:grid-cols-4 px-6  gap-6 mt-4">
        <div className=" bg-primary text-center flex flex-col gap-2 items-center justify-center p-4 text-4 min-h-[250px] brand-rounded">
          <MuiIcon name="Event" sx={{ fontSize: 50 }} />
          <p className=" text-3 text-success bg-secondary p-3 w-[50px] h-[50px] flex items-center justify-center rounded-full">
            {data?.totalEvents}
          </p>
          <p>Total Events</p>
          <Link to={'/events'}>
            <SuccessBtn startIcon={<MuiIcon name="Preview" />}>View</SuccessBtn>
          </Link>
        </div>
        <div className=" bg-primary text-center flex flex-col gap-2 items-center justify-center p-4 text-4 min-h-[250px] brand-rounded">
          <MuiIcon name="People" sx={{ fontSize: 50 }} />
          <p className=" text-3 text-success bg-secondary p-3 w-[50px] h-[50px] flex items-center justify-center rounded-full">
            {data?.totalVips}
          </p>
          <p>Total Vips</p>
          <Link to={'/vips'}>
            <SuccessBtn startIcon={<MuiIcon name="Preview" />}>View</SuccessBtn>
          </Link>
        </div>
        {/* <div className=" bg-primary text-center flex flex-col gap-2 items-center justify-center p-4 text-4 min-h-[250px] brand-rounded">
          <MuiIcon name="InventoryOutlined" sx={{ fontSize: 50 }} />
          <p className=" text-3 text-success bg-secondary p-3 w-[50px] h-[50px] flex items-center justify-center rounded-full">
            {data?.totalInvitaions}
          </p>
          <p>Total Invitations</p>
          <Link to={'/vips'}>
            <SuccessBtn startIcon={<MuiIcon name="Preview" />}>View</SuccessBtn>
          </Link>
        </div> */}
      </div>
    </div>
  );
}

export default Home;

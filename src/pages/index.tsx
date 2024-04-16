import { useHomeInfos } from '@src/actions/Events/useEventsQueries';
import { countDownDto, useCountDown } from '@src/hooks/useCountDown';
import { themeConfig } from '@src/themeConfig';
import { format } from 'date-fns';
import React from 'react';
import logo from '/logo.webp';
import MuiIcon from '@src/@core/components/MuiIcon';
import { Link } from 'react-router-dom';
import { SuccessBtn } from '@src/styles/styledComponents';
import EventDetailsCard from '@components/EventAccess/EventDetailsCard';
import { IconButton } from '@mui/material';

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

  if (isLoading || !data) return <></>;

  return (
    <div className=" text-white">
      <h1 className=" text-3 font-bold">
        Willkommen beim{' '}
        <span className=" text-success">{themeConfig.name}</span> Dashboard
      </h1>
      <p className=" text-7 ">
        Verschaffen Sie sich einen kurzen{' '}
        <span className=" text-success font-medium">Überblick </span> über Ihr
        Dashboard
        {/* Take a Quick{' '}
        <span className=" text-success font-medium"> Overview </span> about your
        Dashboard */}
      </p>

      {data.nextEvent && (
        <div className=" mt-5">
          <div className=" text-6 bg-white p-3 text-primary font-semibold flex items-center justify-between ">
            <p>Kommende Veranstaltung</p>
            <Link to={`/events/${data?.nextEvent?.id}`}>
              <IconButton>
                <MuiIcon name="Link" />
              </IconButton>
            </Link>
          </div>
          <EventDetailsCard
            CountDown={CountDown}
            data={data.nextEvent}
            isEnded={[
              CountDown?.day,
              CountDown?.hour,
              CountDown?.minute,
              CountDown?.second,
            ].every((item) => item <= 0)}
          />
        </div>
      )}

      <div className=" text-6 bg-white p-3 text-primary font-semibold brand-rounded mt-4">
        <p>Kurzer Rückblick</p>
      </div>
      <div className=" grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 lg:px-6  gap-1 mt-4">
        <div className=" bg-primary text-center flex flex-col gap-2 items-center justify-center p-4 text-4 min-h-[150px] brand-rounded">
          <MuiIcon name="Event" sx={{ fontSize: 40 }} />
          <p className=" text-7">Gesamtzahl der Ereignisse</p>
          <p className=" text-4 text-success bg-secondary p-3 w-[50px] h-[50px] flex items-center justify-center rounded-full">
            {data?.totalEvents}
          </p>
          <Link to={'/events'}>
            <SuccessBtn startIcon={<MuiIcon name="Preview" />}>
              Sicht
            </SuccessBtn>
          </Link>
        </div>
        <div className=" bg-primary text-center flex flex-col gap-2 items-center justify-center p-4 text-4 min-h-[150px] brand-rounded">
          <MuiIcon name="People" sx={{ fontSize: 40 }} />
          <p className=" text-7">Insgesamt VIPs</p>
          <p className=" text-4 text-success bg-secondary p-3 w-[50px] h-[50px] flex items-center justify-center rounded-full">
            {data?.totalVips}
          </p>
          <Link to={'/vips'}>
            <SuccessBtn startIcon={<MuiIcon name="Preview" />}>
              Sicht
            </SuccessBtn>
          </Link>
        </div>
        <div className=" bg-primary text-center flex flex-col gap-2 items-center justify-center p-4 text-4 min-h-[150px] brand-rounded">
          <MuiIcon name="People" sx={{ fontSize: 40 }} />
          <p className=" text-7">Gesamtprodukte</p>
          <p className=" text-4 text-success bg-secondary p-3 w-[50px] h-[50px] flex items-center justify-center rounded-full">
            {data?.totalProducts}
          </p>
          <Link to={'/products'}>
            <SuccessBtn startIcon={<MuiIcon name="Preview" />}>
              Sicht
            </SuccessBtn>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;

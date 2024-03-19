import EventCard from '@components/Events/EventCard';
import { Button, Divider } from '@mui/material';
import MuiIcon from '@src/@core/components/MuiIcon';
import { useEventsQueries } from '@src/actions/Events/useEventsQueries';
import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';

function Events() {
  const { data } = useEventsQueries();

  return (
    <div className=" flex flex-col gap-10 text-white">
      <div>
        <h1 className=" text-3 font-bold text-white">
          Verwalten Sie Ihre{' '}
          <span className=" text-success">Veranstaltungsdaten</span>
        </h1>
        <p className=" text-7">
          Fügen Sie Ihre Veranstaltungsdetails hinzu, bearbeiten und überprüfen
          Sie sie und kontrollieren Sie deren Status.
        </p>
      </div>
      <div className=" grid grid-cols-1 md:grid-cols-4 gap-3">
        <Link to="/events/create" className="h-full">
          <div className=" brand-rounded hover:border-[1px] h-full hover:border-success flex flex-col items-center justify-center gap-3 bg-primary shadow p-4  min-h-[150px] rounded-md hover:shadow-xl  w-full cursor-pointer">
            <div className=" border-[1px] border-success rounded-full">
              <MuiIcon name="Add" color="success" sx={{ fontSize: 50 }} />
            </div>
            <p className=" text-5 text-center">
              <span className=" text-success"> Neues Ereignis</span> erstellen
            </p>
          </div>
        </Link>
        {data?.data
          ?.filter((item) => new Date(item.date) > new Date())
          .map((item, index) => {
            return (
              <EventCard
                event={item}
                key={index}
                pending={data?.pending[index]}
              />
            );
          })}
      </div>
    </div>
  );
}

export default Events;

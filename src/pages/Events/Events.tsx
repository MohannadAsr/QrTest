import EventCard from '@components/Events/EventCard';
import { Button, Divider } from '@mui/material';
import MuiIcon from '@src/@core/components/MuiIcon';
import TableLoading from '@src/@core/shared/Table/TableLoading';
import { useEventsQueries } from '@src/actions/Events/useEventsQueries';
import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';

function Events() {
  const { data, isLoading } = useEventsQueries();

  return (
    <div className=" flex flex-col gap-5 text-white">
      <div>
        <h1 className=" text-3 font-bold text-white">
          Verwalten Sie Ihre{' '}
          <span className=" text-success">Veranstaltungsdaten</span>
        </h1>
        <p className=" text-7">
          Fügen Sie Ihre Veranstaltungsdetails hinzu, bearbeiten und überprüfen
          Sie sie und kontrollieren Sie deren Status .
        </p>
      </div>
      {isLoading ? (
        <TableLoading />
      ) : (
        <>
          <p className=" text-6 bg-white p-3 text-primary font-semibold brand-rounded">
            Erstellen und steuern Sie Ihre bevorstehenden Veranstaltungen
          </p>
          <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <Link to="/events/create" className="h-full min-h-[200px]">
              <div className=" brand-rounded hover:border-[1px] h-full hover:border-success flex flex-col items-center justify-center gap-3 bg-primary shadow p-4  min-h-[150px] rounded-md hover:shadow-xl  w-full cursor-pointer">
                <div className=" border-[1px] border-success rounded-full">
                  <MuiIcon name="Add" color="success" sx={{ fontSize: 50 }} />
                </div>
                <p className=" text-5 text-center">
                  <span className=" text-success"> Neues Ereignis</span>{' '}
                  erstellen
                </p>
              </div>
            </Link>
            {data?.data
              ?.filter((item) => new Date(item.date) > new Date())
              .map((item, index) => {
                return <EventCard event={item} key={index} />;
              })}
          </div>
          {data?.data?.filter((item) => new Date(item?.date) < new Date())
            .length !== 0 && (
            <>
              <p className=" text-6 bg-white p-3 text-primary font-semibold brand-rounded">
                Überprüfen Sie beendete Ereignisse
              </p>
              <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {data?.data
                  ?.filter((item) => new Date(item?.date) < new Date())
                  .map((item, index) => {
                    return <EventCard event={item} key={index} />;
                  })}
              </div>{' '}
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Events;

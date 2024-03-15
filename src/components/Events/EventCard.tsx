import { EventDTO } from '@src/actions/Events/Dto';
import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import logo from '/logo.webp';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

function EventCard({ event }: { event: EventDTO }) {
  return (
    <Link
      to={`/events/${event.id}`}
      className=" brand-rounded hover:border-[2px] hover:border-success flex flex-col items-center justify-center gap-1 bg-primary shadow p-4  min-h-[150px] rounded-md hover:shadow-xl  w-full cursor-pointer"
    >
      <img
        loading="lazy"
        src={event?.image || logo}
        className={` h-[150px] brand-rounded ${
          event.image ? 'object-cover' : 'object-contain'
        }  w-full`}
      />

      <p className=" text-7 text-center">{event.name}</p>
      <p>{format(new Date(event.date), ' dd-MM-yyyy , HH:MM')}</p>
    </Link>
  );
}

export default EventCard;

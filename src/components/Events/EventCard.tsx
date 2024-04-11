import { EventDTO } from '@src/actions/Events/Dto';
import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import logo from '/logo.webp';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { countDownDto, useCountDown } from '@src/hooks/useCountDown';

function EventCard({ event }: { event: EventDTO }) {
  const { counter } = useCountDown();
  const [CountDown, setCountDown] = React.useState<countDownDto | null>(null);
  const startedRef = React.useRef(false);
  React.useEffect(() => {
    if (event?.date && !startedRef.current) {
      startedRef.current = true;
      setInterval(() => {
        setCountDown(counter(new Date(event?.date).toISOString(), false));
      }, 1000);
    }
  }, [event]);
  const iSEnded = React.useMemo(() => {
    return [
      CountDown?.day,
      CountDown?.hour,
      CountDown?.minute,
      CountDown?.second,
    ].every((item) => item <= 0);
  }, [CountDown]);
  return (
    <Link
      to={`/events/${event.id}`}
      className=" relative brand-rounded hover:border-[2px] hover:border-success flex flex-col items-start justify-center gap-3 bg-primary shadow p-4  min-h-[150px] rounded-md hover:shadow-xl  w-full cursor-pointer"
    >
      <img
        loading="lazy"
        src={event?.image || logo}
        className={` h-[150px] brand-rounded ${
          event.image ? 'object-cover' : 'object-contain'
        }  w-full`}
      />

      {!iSEnded && (
        <div className=" flex items-center gap-1">
          <span className="bg-secondary p-2 rounded-md min-w-[60px] text-center">
            {CountDown?.day}
          </span>
          <span className="bg-secondary p-2 rounded-md min-w-[60px] text-center">
            {CountDown?.hour}
          </span>
          <span className="bg-secondary p-2 rounded-md min-w-[60px] text-center">
            {CountDown?.minute}
          </span>
          <span className="bg-secondary p-2 rounded-md min-w-[60px] text-center">
            {CountDown?.second}
          </span>
        </div>
      )}

      {/* <p>{format(new Date(event.date), ' dd-MM-yyyy , HH:MM')}</p> */}
    </Link>
  );
}

export default EventCard;

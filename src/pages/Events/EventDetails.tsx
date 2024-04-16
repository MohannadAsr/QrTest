import EventDetailsCard from '@components/EventAccess/EventDetailsCard';
import EventInvitaions from '@components/Events/EventInvitaions';
import { TextField } from '@mui/material';
import MuiIcon from '@src/@core/components/MuiIcon';
import DashDialog from '@src/@core/shared/Dialog/DashDialog';
import {
  MutateDeleteEvent,
  useEventByIdQueries,
} from '@src/actions/Events/useEventsQueries';
import { countDownDto, useCountDown } from '@src/hooks/useCountDown';
import { ErrorBtn, SuccessBtn } from '@src/styles/styledComponents';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export function isMobileDevice() {
  return (
    typeof window.orientation !== 'undefined' ||
    navigator.userAgent.indexOf('IEMobile') !== -1
  );
}

function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useEventByIdQueries(id);
  const { counter } = useCountDown();
  const [CountDown, setCountDown] = React.useState<countDownDto | null>(null);
  const startedRef = React.useRef(false);
  const [open, setOpen] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<string>('');
  const { mutate: deleteEvent } = MutateDeleteEvent();

  React.useEffect(() => {
    if (data?.event.date && !startedRef.current) {
      startedRef.current = true;
      setInterval(() => {
        setCountDown(counter(new Date(data?.event.date).toISOString(), false));
      }, 1000);
    }
  }, [data]);

  function shareOnWhatsApp() {
    const url = `${
      window.location.protocol + '//' + window.location.host
    }/eventaccess/${data.event.id}`;

    const webUrl = ` ${'https://api.whatsapp.com/send?text='}${encodeURIComponent(
      message + ' ' + url
    )} `;
    const shareURL =
      'whatsapp://send?text=' + encodeURIComponent(message + ' ' + url);
    window.open(isMobileDevice() ? shareURL : webUrl, '_blank');
    setOpen(false);
    setMessage('');
  }

  const handleDelete = () => {
    deleteEvent(
      { id: id },
      {
        onSuccess: () => {
          navigate(-1);
        },
      }
    );
  };

  if (isLoading) return <></>;
  return (
    <>
      <div>
        <div className=" my-2 flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className=" text-3 font-bold text-white">
              <span className=" text-success"> Veranstaltungs</span> details
            </h1>
            <p className=" text-white">
              Überprüfen Sie die Details und Informationen Ihrer Veranstaltung.
            </p>
          </div>
        </div>
        <div className=" grid grid-cols-12">
          <div className=" w-full  col-span-12  gap-5 mt-5 mx-auto p-1">
            <div className=" p-2 bg-white rounded-md flex items-center gap-2">
              <SuccessBtn
                startIcon={<MuiIcon name="Share" />}
                onClick={() => setOpen(true)}
              >
                Aktie
              </SuccessBtn>
              <ErrorBtn
                onClick={handleDelete}
                startIcon={<MuiIcon name="Delete" />}
              >
                Löschen
              </ErrorBtn>
            </div>
            <EventDetailsCard
              CountDown={CountDown}
              data={data.event}
              isEnded={[
                CountDown?.day,
                CountDown?.hour,
                CountDown?.minute,
                CountDown?.second,
              ].every((item) => item <= 0)}
            />
          </div>
        </div>

        <EventInvitaions />
      </div>
      <DashDialog
        title={'Teilen Sie Ihre Veranstaltung'}
        body={
          <>
            <p className=" py-2 text-primary font-bold">
              Leider kann die gesuchte Veranstaltung nicht gefunden werden
            </p>
            <TextField
              multiline
              rows={3}
              fullWidth
              label="Nachricht"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
            <div className=" flex justify-center items-center gap-4 mt-3 ">
              <SuccessBtn
                startIcon={<MuiIcon name="Share" />}
                onClick={shareOnWhatsApp}
              >
                Aktie
              </SuccessBtn>
              <ErrorBtn
                startIcon={<MuiIcon name="Close" />}
                color="error"
                onClick={() => setOpen(false)}
              >
                Schließen
              </ErrorBtn>
            </div>
          </>
        }
        open={open}
        handleClose={() => setOpen(false)}
      />
    </>
  );
}

export default EventDetails;

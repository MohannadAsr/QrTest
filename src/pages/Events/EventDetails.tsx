import {
  MutateDeleteEvent,
  useEventByIdQueries,
} from '@src/actions/Events/useEventsQueries';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { format } from 'date-fns';
import MuiIcon from '@src/@core/components/MuiIcon';
import logo from '/logo.webp';
import { countDownDto, useCountDown } from '@src/hooks/useCountDown';
import React from 'react';
import { Button, Divider, TextField } from '@mui/material';
import EventInvitaions from '@components/Events/EventInvitaions';
import { ErrorBtn, SuccessBtn } from '@src/styles/styledComponents';
import DashDialog from '@src/@core/shared/Dialog/DashDialog';
import { themeConfig } from '@src/themeConfig';
import EventDetailsCard from '@components/EventAccess/EventDetailsCard';

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
    if (data?.date && !startedRef.current) {
      startedRef.current = true;
      setInterval(() => {
        setCountDown(counter(new Date(data?.date).toISOString(), false));
      }, 1000);
    }
  }, [data]);

  function shareOnWhatsApp() {
    const url = `${
      window.location.protocol + '//' + window.location.host
    }/eventaccess/${data.id}`;

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
            <div className=" flex justify-start items-center gap-3 py-2">
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
                Delete
              </ErrorBtn>
            </div>
            <EventDetailsCard
              CountDown={CountDown}
              data={data}
              isEnded={[
                CountDown?.day,
                CountDown?.hour,
                CountDown?.minute,
                CountDown?.second,
              ].every((item) => item <= 0)}
            />
          </div>
        </div>

        {/* <EventInvitaions /> */}
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
                Close
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

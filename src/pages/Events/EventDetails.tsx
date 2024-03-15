import { useEventByIdQueries } from '@src/actions/Events/useEventsQueries';
import { useLocation, useParams } from 'react-router-dom';
import { format } from 'date-fns';
import MuiIcon from '@src/@core/components/MuiIcon';
import logo from '/logo.webp';
import { countDownDto, useCountDown } from '@src/hooks/useCountDown';
import React from 'react';
import { Button, Divider, TextField } from '@mui/material';
import EventInvitaions from '@components/Events/EventInvitaions';
import { ErrorBtn, SuccessBtn } from '@src/styles/styledComponents';
import DashDialog from '@src/@core/shared/Dialog/DashDialog';
function EventDetails() {
  const { id } = useParams();
  const { data, isLoading } = useEventByIdQueries(id);
  const { counter } = useCountDown();
  const [CountDown, setCountDown] = React.useState<countDownDto | null>(null);
  const startedRef = React.useRef(false);
  const [open, setOpen] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<string>('');

  React.useEffect(() => {
    if (data?.date && !startedRef.current) {
      startedRef.current = true;
      setInterval(() => {
        setCountDown(counter(new Date(data?.date).toISOString(), false));
      }, 1000);
    }
  }, [data]);

  function isMobileDevice() {
    return (
      typeof window.orientation !== 'undefined' ||
      navigator.userAgent.indexOf('IEMobile') !== -1
    );
  }

  function shareOnWhatsApp() {
    const url = `https://localhost:3000/eventaccess/${data.id}`;

    const webUrl = ` ${'https://api.whatsapp.com/send?text='}${encodeURIComponent(
      message + ' ' + url
    )} `;
    const shareURL =
      'whatsapp://send?text=' + encodeURIComponent(message + ' ' + url);
    window.open(isMobileDevice() ? shareURL : webUrl, '_blank');
    setOpen(false);
    setMessage('');
  }

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
          <div className=" flex items-center gap-3">
            <SuccessBtn
              startIcon={<MuiIcon name="Share" />}
              onClick={() => setOpen(true)}
            >
              Aktie
            </SuccessBtn>
            <ErrorBtn startIcon={<MuiIcon name="Delete" />}>Delete</ErrorBtn>
          </div>
        </div>
        <div className=" grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className=" bg-primary/70 brand-rounded p-3 flex justify-center items-center">
            <img
              src={data?.image || logo}
              loading="lazy"
              alt=""
              className={` ${
                data.image ? 'object-cover' : 'object-contain'
              } brand-rounded max-h-[250px] md:max-h-[350px] h-full  w-full`}
            />
          </div>
          <div className=" flex flex-col gap-3  justify-between  bg-primary/70 brand-rounded p-5 min-h-[340px]">
            <div className=" flex flex-col gap-4">
              <div className=" flex items-center justify-between  flex-wrap">
                <h1 className=" text-success font-bold  capitalize text-3">
                  {data?.name}
                </h1>
                <p className=" text-5 text-white font-bold items-center flex gap-1">
                  {format(new Date(data?.date), ' dd-MM-yyyy , HH:MM')}
                </p>
              </div>
              <div className=" bg-black/30 p-4 rounded-lg px-2 flex-1   ">
                <p className=" text-white text-5 overflow-auto min-h-[130px] max-h-[130px] md:min-h-[200px] md:max-h-[200px] ">
                  {data?.description}
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
        <div className=" my-3">
          <Divider sx={{ border: '2px solid  rgba(255,255,255,0.1)' }} />
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

import EventDetailsCard from '@components/EventAccess/EventDetailsCard';
import EventInvitaions from '@components/Events/EventInvitaions';
import { TextField } from '@mui/material';
import MuiIcon from '@src/@core/components/MuiIcon';
import CustomChip from '@src/@core/shared/Customs/CustomChip';
import DashDialog from '@src/@core/shared/Dialog/DashDialog';
import TableLoading from '@src/@core/shared/Table/TableLoading';
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
  const { data, isLoading, isError } = useEventByIdQueries(id);
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
    const VipClientWebApp = 'https://l1-vip-client.vercel.app';

    const url = `${VipClientWebApp}/${data.event.id}`;

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
        {isLoading ? (
          <TableLoading />
        ) : (
          <>
            <div className=" grid grid-cols-12">
              <div className=" w-full  col-span-12  gap-5 mt-5 mx-auto p-1">
                <div className=" p-2 bg-white rounded-md flex items-center gap-2">
                  <SuccessBtn
                    startIcon={<MuiIcon name="Share" />}
                    onClick={() => setOpen(true)}
                  >
                    Teilen
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
                  data={data?.event}
                  isEnded={[
                    CountDown?.day,
                    CountDown?.hour,
                    CountDown?.minute,
                    CountDown?.second,
                  ].every((item) => item <= 0)}
                />
              </div>
              <div className=" "></div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mt-4">
              {data?.AllTablesDetails?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className=" bg-white/90 p-3 rounded-md shadow-lg border-primary border-[3px] relative"
                  >
                    <div className=" bg-secondary flex items-center justify-center rounded-md">
                      <MuiIcon
                        name="TableBar"
                        sx={{ fontSize: 60, color: '#fff' }}
                      />
                    </div>
                    <div className=" flex items-center justify-between mt-3 gap-3">
                      <div className="flex-1 flex flex-col items-center justify-center gap-2 text-white bg-secondary p-2 rounded-md">
                        <MuiIcon name="Numbers" />
                        <p>{item.number}</p>
                      </div>
                      <div className=" flex-1 flex flex-col items-center justify-center gap-2 text-white bg-secondary p-2 rounded-md">
                        <MuiIcon name="Chair" />
                        <p>{item.seats}</p>
                      </div>
                    </div>
                    <div className=" flex items-center justify-center mt-3">
                      {!data?.AvailableTables.includes(item.id) ? (
                        <CustomChip
                          label={'Ausgebucht'}
                          Customcolor={'#ef4444'}
                        />
                      ) : (
                        <CustomChip
                          label=" Verfügbar"
                          Customcolor={'#3EA666'}
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            <EventInvitaions event={data} />
          </>
        )}
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
                Teilen
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

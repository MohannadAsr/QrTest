import { CircularProgress, Paper } from '@mui/material';
import MuiIcon from '@src/@core/components/MuiIcon';
import { useVipAuth } from '@src/Auth/Vips/useVipAuth';
import { useEventByIdQueries } from '@src/actions/Events/useEventsQueries';
import {
  MutateCreateInvitation,
  useVipInvitaion,
} from '@src/actions/Invitaions/useInvitationsQueries';
import { countDownDto, useCountDown } from '@src/hooks/useCountDown';
import { ErrorBtn, SuccessBtn } from '@src/styles/styledComponents';
import { format } from 'date-fns';
import React from 'react';
import { useParams } from 'react-router-dom';
import logo from '/logo.webp';

function EventByUser() {
  const { GetUserData, LogOut } = useVipAuth();
  const { id } = useParams();
  const { data } = useEventByIdQueries(id);
  const {
    data: invitaion,
    refetch,
    isLoading,
  } = useVipInvitaion({
    eventId: id,
    vipId: GetUserData()?.id,
  });
  const { mutate: create, isPending: isCreating } = MutateCreateInvitation();

  const { counter } = useCountDown();
  const [CountDown, setCountDown] = React.useState<countDownDto | null>(null);
  const startedRef = React.useRef(false);
  const isEnded = React.useMemo(() => {
    if (CountDown) {
      return [
        CountDown.day,
        CountDown.hour,
        CountDown.minute,
        CountDown.second,
      ].every((item) => item == 0);
    }
    return false;
  }, [CountDown]);

  React.useEffect(() => {
    if (data?.date && !startedRef.current) {
      startedRef.current = true;
      setInterval(() => {
        setCountDown(counter(data?.date));
      }, 1000);
    }
  }, [data]);

  const createInvitaion = () => {
    create(
      {
        eventId: id,
        vipId: GetUserData().id,
      },
      {
        onSuccess: () => {
          refetch();
        },
      }
    );
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = invitaion?.qrCodeUrl;
    link.download = 'downloaded-photo.jpg';
    link.click();
  };

  if (isLoading)
    return (
      <div className=" my-10 flex items-center justify-center">
        <CircularProgress color="inherit" className=" text-white z-[2]" />
      </div>
    );

  if (!data)
    return (
      <div className=" my-10 flex flex-col items-center justify-center text-white text-5  text-center px-5">
        <p className="z-[2]">
          Leider kann die gesuchte Veranstaltung nicht gefunden werden
        </p>
        <div className=" z-[2] my-4">
          <ErrorBtn startIcon={<MuiIcon name="Logout" />} onClick={LogOut}>
            Ausloggen
          </ErrorBtn>
        </div>
      </div>
    );

  return (
    <div className=" z-[2] relative px-3 container my-10 text-center">
      <p className=" text-5 text-white">
        {' '}
        Hi ,
        <span className=" text-success font-semibold">
          {' '}
          {GetUserData()?.name}
        </span>{' '}
        Sie sind zu einer Veranstaltung eingeladen. Bitte lesen Sie die
        Veranstaltungsdetails und teilen Sie uns mit, ob Sie zu diesem Zeitpunkt
        dabei sein möchten. Damit wir Ihnen einen QR-Code zur Verfügung stellen
        können, damit Sie auf die Veranstaltung zugreifen können.
      </p>
      <div className=" grid  grid-cols-1 md:grid-cols-2 gap-5  my-10">
        <div className=" bg-primary/70 brand-rounded p-3 flex justify-center items-center">
          <img
            src={data?.image || logo}
            alt=""
            className={` ${
              data?.image ? 'object-cover' : 'object-contain'
            } brand-rounded max-h-[250px] md:max-h-[350px] h-full  w-full`}
          />
        </div>
        <Paper className=" flex flex-col gap-4 text-3 justify-between p-4 ">
          <div className=" flex items-center justify-between flex-wrap">
            <p className=" text-primary ">{data?.name}</p>
            {data?.date && (
              <p className=" text-primary text-7 ">
                {format(new Date(data?.date), ' dd-MM-yyyy , HH:mm')}
              </p>
            )}
          </div>
          <div className=" h-[180px] overflow-auto  p-3 bg-black/80 text-white rounded-md">
            <p className="  text-7  ">{data?.description}</p>
          </div>
          {isEnded ? (
            <div className=" text-center text-7  text-red-500 font-semibold">
              This Event even started or ended and you cannot join it anymore
            </div>
          ) : (
            <div>
              <p className=" text-center text-7 capitalize text-primary">
                starts in
              </p>
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
          )}
        </Paper>
      </div>
      {!invitaion && !isEnded && (
        <div className=" p-4 flex items-center justify-center">
          <SuccessBtn disabled={isCreating} onClick={createInvitaion}>
            Beitrittsanfrage
          </SuccessBtn>
        </div>
      )}

      {!isEnded && invitaion && (
        <div className=" p-4 flex items-center justify-center">
          {invitaion?.status == 'pending' && (
            <div className=" flex flex-col gap-2 justify-center items-center bg-primary p-3 brand-rounded">
              <p className=" text-5  text-white text-center">
                Ihre Anfrage wird derzeit geprüft. Sie erhalten einen QR-Code,
                wenn Ihre Anfrage vom Eigentümer genehmigt wurde.
              </p>
            </div>
          )}
          {invitaion.status == 'approved' && (
            <div className=" flex flex-col gap-2 justify-center items-center bg-primary p-3 brand-rounded">
              <p className=" text-5  text-white text-center">
                Bitte speichern Sie Ihren QR-Code und verwenden Sie ihn, um
                Zugang zur Veranstaltung zu erhalten. Hinweis: Ohne diesen
                QrCode können Sie nicht auf diese Veranstaltung zugreifen.
              </p>
              <img src={invitaion.qrCodeUrl} alt="" className=" h-[150px]" />
              <SuccessBtn onClick={handleDownload}>
                Laden Sie den QR-Code herunter
              </SuccessBtn>
            </div>
          )}

          {invitaion.status == 'rejected' && (
            <div className=" flex flex-col gap-2 justify-center items-center bg-primary p-3 brand-rounded">
              <p className=" text-5  text-white text-center">
                Leider wurde Ihr Beitrittsantrag abgelehnt. Es ist uns eine
                Ehre, Sie bei späteren Veranstaltungen begrüßen zu dürfen
              </p>
            </div>
          )}
        </div>
      )}
      <div className=" flex items-center justify-center">
        <ErrorBtn startIcon={<MuiIcon name="Logout" />} onClick={LogOut}>
          Ausloggen
        </ErrorBtn>
      </div>
    </div>
  );
}

export default EventByUser;

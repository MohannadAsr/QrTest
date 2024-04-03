import React from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';
import {
  MutateGetInviteByID,
  MutateUpdateStatus,
} from '@src/actions/Invitaions/useInvitationsQueries';
import { InvitationDetails } from '@src/actions/Invitaions/Dto';
import CustomChip from '@src/@core/shared/Customs/CustomChip';
import { lightTheme } from '@src/@core/Providers/DashThemeProvider';
import { green, red } from '@mui/material/colors';
import { format } from 'date-fns';
import MuiIcon from '@src/@core/components/MuiIcon';
import { SuccessBtn } from '@src/styles/styledComponents';
import DashDrawer from '@src/@core/shared/Drawer/DashDrawer';
import DashDrawerActions from '@src/@core/shared/Drawer/DashDrawerActions';

function QrScanner() {
  const [result, setResult] = React.useState('');
  const [invite, setInvite] = React.useState<InvitationDetails | null>(null);
  const [open, setOpen] = React.useState<boolean>(false);
  const { mutate } = MutateGetInviteByID();
  const { mutate: Complete, isPending } = MutateUpdateStatus();

  const handleError = (err) => {
    console.error(err);
  };

  const requestCameraPermission = async () => {
    try {
      // Request permission to access the camera
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      // If permission is granted, stop the stream
      stream.getTracks().forEach((track) => track.stop());
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  React.useEffect(() => {
    requestCameraPermission();
    mutate('131eca1a-6b16-4e79-aa4d-95584c0ea11d', {
      onSuccess: (data) => {
        if (data) {
          setInvite(data);
          setOpen(true);
        }
      },
      onError: () => {
        setOpen(true);
      },
    });
  }, []);

  const handleInvite = (id: string) => {
    mutate(id, {
      onSuccess: (data) => {
        if (data) {
          setInvite(data);
          setOpen(true);
        }
      },
      onError: () => {
        setOpen(true);
      },
    });
  };

  const handleClose = () => {
    setOpen(false);
    setInvite(null);
  };

  const completeInvite = () => {
    Complete(
      { id: invite.invitation.id, status: 'completed' },
      {
        onSuccess: (data) => {
          if (data) {
            handleClose();
          }
        },
      }
    );
  };

  return (
    <>
      {open && (
        <DashDrawer
          body={
            <>
              {!invite && (
                <div className=" flex flex-col items-center justify-center h-full gap-2 text-[15px] p-4 font-semibold ">
                  <MuiIcon
                    name="DoNotDisturb"
                    className="text-red-700"
                    sx={{ fontSize: 70 }}
                    color="inherit"
                  />
                  <p className=" text-red-500">
                    Die Einladung kann nicht gefunden werden
                  </p>
                </div>
              )}
              {invite && (
                <div className=" flex flex-col gap-2 text-[15px] p-4 font-semibold ">
                  <div className=" flex items-center justify-center">
                    {invite.invitation.status == 'approved' ? (
                      <MuiIcon
                        name="Verified"
                        color="inherit"
                        sx={{ fontSize: 70 }}
                        className="text-green-700"
                      />
                    ) : (
                      <MuiIcon
                        name="DoNotDisturb"
                        className="text-red-700"
                        sx={{ fontSize: 70 }}
                        color="inherit"
                      />
                    )}
                    {invite.invitation.status == 'completed' && (
                      <p className=" text-red-500">
                        Diese Einladung ist bereits abgeschlossen
                        {format(
                          new Date(invite?.invitation?.completedDate),
                          'dd-MM-yyyy HH:mm'
                        )}
                      </p>
                    )}
                  </div>
                  <p>Ereignis : {invite.event.name}</p>
                  <p>Name : {invite.vip.name}</p>
                  {invite?.vip?.email && <p>Email : {invite?.vip?.email}</p>}
                  {invite?.vip?.phone && <p>Telefon : {invite?.vip?.phone}</p>}
                  <p>
                    Anzahl der eingeladenen Personen :{' '}
                    {invite.invitation.peopleCount}
                  </p>
                  <div className=" bg-primary/90 text-white p-2 rounded-md flex flex-col gap-2">
                    1- {invite.vip.name}
                    {invite.invitation.peopleNames.map((item, indx) => {
                      return (
                        <p>
                          {indx + 2}- {item}
                        </p>
                      );
                    })}
                  </div>
                  <p>
                    Tischreservierung:{' '}
                    {invite.invitation.tableReservation ? (
                      <CustomChip Customcolor={green['500']} label="Ja" />
                    ) : (
                      <CustomChip Customcolor={red['500']} label="Nein" />
                    )}
                  </p>
                  <p>
                    Lieferservice:{' '}
                    {invite.invitation.deliveryOption ? (
                      <CustomChip Customcolor={green['500']} label="Ja" />
                    ) : (
                      <CustomChip Customcolor={red['500']} label="Nein" />
                    )}
                  </p>
                  {invite.invitation.deliveryOption && (
                    <div className=" bg-primary/90 text-white p-2 rounded-md flex flex-col gap-2">
                      <p className=" flex items-center gap-1">
                        <MuiIcon name="Timer" />
                        {format(
                          new Date(invite.invitation.deliveryDate),
                          ' HH:mm'
                        )}
                      </p>
                      <p className=" flex items-center gap-1">
                        <MuiIcon name="Map" />
                        {invite.invitation.deliveryAddress}
                      </p>
                    </div>
                  )}
                  {invite?.productList?.length !== 0 && (
                    <>
                      Bestellte Produkte{' '}
                      <div className=" bg-primary/90 text-white p-2 rounded-md flex flex-col gap-2">
                        {invite?.productList?.map((item, index) => {
                          return (
                            <div>
                              {item.product.name} - ({item.quantity})
                            </div>
                          );
                        })}
                      </div>
                    </>
                  )}
                  <div className=" flex items-center justify-center mt-5 mb-20">
                    <img
                      src={invite?.invitation?.qrCodeUrl}
                      alt=""
                      width={100}
                    />
                  </div>
                </div>
              )}

              <DashDrawerActions>
                <div className=" flex items-center justify-center mt-5">
                  <SuccessBtn
                    endIcon={<MuiIcon name="Check" />}
                    disabled={invite?.invitation?.status !== 'approved'}
                    loading={isPending}
                    onClick={completeInvite}
                  >
                    Als abgeschlossen markieren
                  </SuccessBtn>
                </div>
              </DashDrawerActions>
            </>
          }
          open={open}
          title={'Einladungsdetails'}
          onClose={handleClose}
        />
      )}
      <div>
        <h1 className=" text-5 text-white">
          Scannen Sie QR-Codes und überprüfen Sie die Einladungen Ihrer VIPs
        </h1>

        <Scanner
          components={{ tracker: true, count: true, torch: true, onOff: true }}
          options={{
            constraints: { facingMode: 'environment' },
          }}
          enabled
          onResult={(text, result) => {
            handleInvite(text);
          }}
          onError={(error) => console.log(error?.message)}
        />
        {result}
      </div>
    </>
  );
}

export default QrScanner;

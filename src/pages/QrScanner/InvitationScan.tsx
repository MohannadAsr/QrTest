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
import TableLoading from '@src/@core/shared/Table/TableLoading';
import { CircularProgress } from '@mui/material';

function InvitationScan({
  id,
  open,
  setOpen,
  refetch,
}: {
  id: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: () => void;
}) {
  const [invite, setInvite] = React.useState<InvitationDetails | null>(null);
  const { mutate, isPending: isGettingInvite } = MutateGetInviteByID();
  const { mutate: Complete, isPending } = MutateUpdateStatus();

  const handleClose = () => {
    setOpen(false);
    setInvite(null);
  };

  React.useEffect(() => {
    if (open) {
      handleInvite(id);
    }
  }, [open]);

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

  const completeInvite = () => {
    Complete(
      { id: invite.invitation.id, status: 'completed' },
      {
        onSuccess: (data) => {
          if (data) {
            refetch();
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
              {isGettingInvite ? (
                <div className=" h-[80vh] flex items-center justify-center">
                  <CircularProgress color="primary" />
                </div>
              ) : (
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
                            Diese Einladung ist bereits abgeschlossen{' '}
                            {format(
                              new Date(invite?.invitation?.completedDate),
                              'dd-MM-yyyy HH:mm'
                            )}
                          </p>
                        )}
                      </div>
                      <p>Ereignis : {invite.event.name}</p>
                      <p>Name : {invite.vip.name}</p>
                      {invite?.vip?.email && (
                        <p>Email : {invite?.vip?.email}</p>
                      )}
                      {invite?.vip?.phone && (
                        <p>Telefon : {invite?.vip?.phone}</p>
                      )}
                      <p>
                        Anzahl der eingeladenen Personen :{' '}
                        {invite.invitation.peopleCount}
                      </p>
                      <div className=" bg-primary/90 text-white p-2 rounded-md flex flex-col gap-2">
                        1- {invite.vip.name}
                        {invite?.invitation?.peopleNames?.map((item, indx) => {
                          return (
                            <p>
                              {indx + 2}- {item}
                            </p>
                          );
                        })}
                      </div>
                      <div>
                        <div className=" my-1">
                          Tischreservierung:{' '}
                          {invite.invitation.tableReservation ? (
                            <CustomChip Customcolor={green['500']} label="Ja" />
                          ) : (
                            <CustomChip Customcolor={red['500']} label="Nein" />
                          )}
                        </div>
                        {invite.invitation.tableReservation &&
                          invite.invitation.table && (
                            <div className=" bg-primary/90 text-white p-2 rounded-md flex  items-center justify-between gap-2">
                              <p>
                                <MuiIcon name="TableBar" />
                                {' # '}
                                {invite.invitation.table.number}
                              </p>
                              <p>
                                <MuiIcon name="Chair" />
                                {'  '} ({invite.invitation.table.seats})
                              </p>
                            </div>
                          )}
                      </div>
                      <div>
                        Lieferservice:{' '}
                        {invite.invitation.deliveryOption ? (
                          <CustomChip Customcolor={green['500']} label="Ja" />
                        ) : (
                          <CustomChip Customcolor={red['500']} label="Nein" />
                        )}
                      </div>
                      {invite.invitation.deliveryOption && (
                        <div className=" bg-primary/90 text-white p-2 rounded-md flex flex-col gap-2">
                          <p className=" flex items-center gap-1">
                            <MuiIcon name="Timer" />
                            {format(
                              new Date(invite.invitation.deliveryDate),
                              ' HH:mm'
                            )}
                          </p>
                          <div className=" flex items-center gap-1">
                            <MuiIcon name="Map" />
                            {invite.invitation.deliveryAddress}
                          </div>
                        </div>
                      )}
                      {invite?.invitation?.products &&
                        invite?.invitation?.products?.length !== 0 && (
                          <>
                            Bestellte Produkte{' '}
                            <div className=" bg-primary/90 text-white p-2 rounded-md flex flex-col gap-2">
                              {invite?.invitation.products?.map(
                                (item, index) => {
                                  return (
                                    <div className=" flex items-center justify-between gap-2">
                                      <p>
                                        {index + 1}- {item.name}
                                      </p>
                                      <p className=" bg-white text-primary p-2 rounded-md">
                                        {item.quantity}
                                      </p>
                                    </div>
                                  );
                                }
                              )}
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
              )}
            </>
          }
          open={open}
          title={'Einladungsdetails'}
          onClose={handleClose}
        />
      )}
    </>
  );
}

export default InvitationScan;

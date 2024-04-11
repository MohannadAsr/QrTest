import { Button, Card, IconButton } from '@mui/material';
import MuiIcon from '@src/@core/components/MuiIcon';
import { InvitaionByEventDto } from '@src/actions/Events/Dto';
import InvitationScan from '@src/pages/QrScanner/InvitationScan';
import React from 'react';

function InvitationCard({ invite }: { invite: InvitaionByEventDto }) {
  const [open, setOpen] = React.useState<boolean>(false);
  const [id, setId] = React.useState<string>('');

  return (
    <>
      <InvitationScan id={id} setOpen={setOpen} open={open} />
      <Card className=" p-3 flex flex-col gap-2 text-[18px] relative ">
        <div className=" flex items-center justify-between">
          <span className=" flex items-center gap-2">
            {invite?.qrCodeUrl && (
              <IconButton
                onClick={() => {
                  setId(invite.id);
                  setOpen(true);
                }}
              >
                <img src={invite.qrCodeUrl} alt="" width={25} />
              </IconButton>
            )}
            {invite?.status == 'approved' && (
              <MuiIcon name="Timer" color="primary" />
            )}
            {invite?.status == 'pending' && (
              <MuiIcon name="Receipt" color="primary" />
            )}
            {invite?.status == 'completed' && (
              <MuiIcon name="CheckCircle" color="success" />
            )}
            {invite?.status == 'missed' && (
              <MuiIcon name="Close" color="error" />
            )}
          </span>
          <div className=" flex items-center  gap-2">
            <Button startIcon={<MuiIcon name="Edit" />}>Edit</Button>
          </div>
        </div>

        <div className=" ">
          <div className=" flex items-center gap-1">
            <MuiIcon name="Person" color="primary" />
            <p>{invite.vip.name}</p>
          </div>

          <div className=" flex items-center gap-1">
            <MuiIcon name="Email" color="primary" />
            <p>{invite.vip.email || '...'}</p>
          </div>

          <div className=" flex items-center gap-1">
            <MuiIcon name="Phone" color="primary" />
            <p>{invite.vip.phone || '...'}</p>
          </div>
        </div>
        <div className=" mt-2 flex items-center justify-between gap-3 flex-wrap text-[14px] p-2 border-primary border-[2px] rounded-lg shadow-lg">
          <div className=" bg-primary p-2 rounded-full w-12 h-12 text-white flex flex-col items-center justify-center">
            <MuiIcon name="People" sx={{ fontSize: 16 }} />
            <p>{invite?.peopleCount}</p>
          </div>
          <div
            className={` ${
              invite.tableReservation
                ? 'bg-success text-primary'
                : 'bg-error text-white'
            }  p-2 rounded-full w-12 h-12  flex flex-col items-center justify-center`}
          >
            <MuiIcon name="TableBar" sx={{ fontSize: 16 }} />
          </div>
          <div
            className={` ${
              invite?.deliveryOption
                ? 'bg-success text-primary'
                : 'bg-error text-white'
            }  p-2 rounded-full w-12 h-12  flex flex-col items-center justify-center`}
          >
            <MuiIcon name="TimeToLeave" sx={{ fontSize: 16 }} />
          </div>
          <div
            className={` ${
              invite?.products?.length > 0
                ? 'bg-success text-primary'
                : 'bg-error text-white'
            }  p-2 rounded-full w-12 h-12  flex flex-col items-center justify-center`}
          >
            <MuiIcon name="Restaurant" sx={{ fontSize: 16 }} />
          </div>
        </div>
      </Card>
    </>
  );
}

export default InvitationCard;

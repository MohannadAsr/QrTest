import { Divider, IconButton, Paper, Tooltip } from '@mui/material';
import MuiIcon, { MUIIconName } from '@src/@core/components/MuiIcon';
import { InvitaionByEventDto } from '@src/actions/Events/Dto';
import { useInvitaionsByEventQuery } from '@src/actions/Events/useEventsQueries';
import {
  MutateApproveInvitation,
  MutateRejectInvitation,
  MutateUpdateInvitaionStatus,
} from '@src/actions/Invitaions/useInvitationsQueries';
import { InvitationStatus } from '@src/enums/Enums';
import { ErrorBtn, SuccessBtn } from '@src/styles/styledComponents';
import React from 'react';
import { useParams } from 'react-router-dom';

const InviteStatus: {
  status: InvitationStatus;
  icon: MUIIconName;
  title: string;
}[] = [
  {
    status: InvitationStatus.Pending,
    icon: 'HourglassEmpty',
    title: 'Pending',
  },
  {
    status: InvitationStatus.Completed,
    icon: 'Check',
    title: 'Completed',
  },
  {
    status: InvitationStatus.Rejected,
    icon: 'Cancel',
    title: 'Rejected',
  },
  {
    status: InvitationStatus.Approved,
    icon: 'Verified',
    title: 'verified',
  },
];

const InvitaionCard = ({ invite }: { invite: InvitaionByEventDto }) => {
  const { mutate: verify } = MutateApproveInvitation();
  const { mutate: reject } = MutateRejectInvitation();
  const Status = React.useMemo(() => {
    return InviteStatus.find((item) => item.status == invite.status);
  }, [invite]);

  const accept = () => {
    verify({ id: invite.id });
  };

  const decline = () => {
    reject({ id: invite.id });
  };
  return (
    <div className=" p-6 bg-primary brand-rounded text-white flex flex-col justify-between gap-3 relative">
      <div
        className=" absolute right-0 top-0 flex items-center gap-2 capitalize p-2"
        style={{
          fontWeight: 700,
        }}
      >
        <Tooltip title={Status?.title}>
          <IconButton sx={{ color: '#fff' }}>
            <MuiIcon name={Status?.icon} color="inherit" />
          </IconButton>
        </Tooltip>
      </div>
      <div className=" flex flex-col gap-4">
        <div className=" flex items-center gap-2 ">
          <MuiIcon name="Person" />
          <p>{invite?.vip?.name}</p>
        </div>
        <div className=" flex items-center gap-2  ">
          <MuiIcon name="Email" />
          <p>{invite?.vip?.email}</p>
        </div>
        <div className=" flex items-center gap-2 ">
          <MuiIcon name="Phone" />
          <p>{invite?.vip?.phone}</p>
        </div>
      </div>
      {invite.status == InvitationStatus.Rejected && (
        <div className=" flex items-center justify-evenly gap-3">
          {' '}
          <SuccessBtn onClick={accept}>Accept</SuccessBtn>
        </div>
      )}
      {invite.status == InvitationStatus.Pending && (
        <div className=" flex items-center justify-evenly gap-3">
          <SuccessBtn onClick={accept}>Accept</SuccessBtn>
          <ErrorBtn onClick={decline}>Reject</ErrorBtn>
        </div>
      )}
    </div>
  );
};

const StatusTypes = [
  {
    title: 'Ausstehende Anfrage',
    status: 'pending',
  },
  {
    title: 'verifizierte Anfrage',
    status: 'approved',
  },
  {
    title: 'abgelehnte Anfrage',
    status: 'rejected',
  },
  {
    title: 'abgeschlossene Anfrage',
    status: 'completed',
  },
];

function EventInvitaions() {
  const { id } = useParams();
  const { data, isLoading } = useInvitaionsByEventQuery(id);
  const groubedBy = React.useMemo(() => {
    if (data) {
      return data.data.reduce((acc, item) => {
        const key = item.status;
        acc[key] = acc[key] || [];
        acc[key].push(item);
        return acc;
      }, {});
    }

    return {};
  }, [data]);

  if (isLoading) return <></>;
  return (
    <>
      <h1 className=" text-3 font-bold text-white">
        Einladungen zu <span className=" text-success"> Veranstaltungen</span>{' '}
        <span className=" text-4">({data?.totalCount})</span>
      </h1>
      <div className=" my-4 flex flex-col gap-8">
        {StatusTypes.map((status, index) => {
          return (
            <div key={index}>
              {groubedBy[status.status] && (
                <>
                  <h5 className=" text-white text-4 capitalize">
                    {status.title}
                  </h5>
                  <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-5">
                    {groubedBy[status.status]?.map((item, index) => {
                      return <InvitaionCard invite={item} key={index} />;
                    })}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>

      {data?.totalCount == 0 && (
        <div className=" flex items-center justify-center my-10 text-gray-300 text-3 font-semibold ">
          Bisher keine Einladungen
        </div>
      )}
    </>
  );
}

export default EventInvitaions;

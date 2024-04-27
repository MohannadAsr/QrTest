import {
  Divider,
  FormControl,
  InputLabel,
  LinearProgress,
  MenuItem,
  Pagination,
  Select,
  TextField,
} from '@mui/material';
import { useInvitaionsByEventQuery } from '@src/actions/Events/useEventsQueries';
import { ErrorMessage } from 'formik';
import { useParams } from 'react-router-dom';
import InvitationCard from './InvitationCard';
import { PaginationControlDTO } from '@src/actions/Vips/Dto';
import React from 'react';
import { boolean } from 'yup';
import { useCustomHooks } from '@src/hooks/useCustomHooks';
import { EventDTO } from '@src/actions/Events/Dto';
import { TableDto } from '@src/actions/Products/Dto';

export class InvitationsFilters {
  name: string = '';
  status: 'pending' | 'approved' | 'completed' | 'missed' | null = null;
  deliveryOption: 1 | 0 | null = null;
}

function EventInvitaions({
  event,
}: {
  event: {
    event: EventDTO;
    AvailableTables: string[];
    AllTablesDetails: TableDto[];
  };
}) {
  const [pagination, setPagination] = React.useState<PaginationControlDTO>(
    new PaginationControlDTO()
  );
  const [filter, setFilter] = React.useState<InvitationsFilters>(
    new InvitationsFilters()
  );
  const { id } = useParams();
  const { data, isLoading, refetch, isFetching } = useInvitaionsByEventQuery(
    id,
    pagination,
    filter
  );
  const { useTimerFn } = useCustomHooks();

  React.useEffect(() => {
    useTimerFn(() => refetch(), 800);
  }, [pagination, filter]);

  if (isLoading) return <></>;

  return (
    <>
      <div className=" bg-white rounded-md">
        <p className=" text-6  p-3 text-primary font-semibold  mt-3  ">
          Beitrittsanfragen ({data?.pagination?.totalCount})
        </p>
        <Divider />
        {data?.pagination?.totalCount !== 0 && (
          <div className=" grid grid-cols-2 lg:grid-cols-4 items-center  p-2 gap-2 ">
            <div className=" col-span-2 lg:col-span-2">
              <TextField
                value={filter.name}
                fullWidth
                label="Name"
                onChange={(e) => {
                  setFilter({ ...filter, name: e.target.value });
                }}
              />
            </div>
            <div>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                <Select
                  label={'Status'}
                  value={filter.status == null ? 'all' : filter.status}
                  onChange={(e) => {
                    setFilter({
                      ...filter,
                      status:
                        e.target.value == 'all'
                          ? null
                          : (e.target.value as
                              | 'pending'
                              | 'approved'
                              | 'completed'
                              | 'missed'
                              | null),
                    });
                  }}
                >
                  <MenuItem value={'all'}>Alle</MenuItem>
                  <MenuItem value={'pending'}>Ausstehend</MenuItem>
                  <MenuItem value={'approved'}>Genehmigt</MenuItem>
                  <MenuItem value={'completed'}>Vollendet</MenuItem>
                  <MenuItem value={'missed'}>Verpasst</MenuItem>
                </Select>
              </FormControl>
            </div>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Lieferoptionen
              </InputLabel>
              <Select
                label={'Status'}
                value={
                  filter.deliveryOption == null ? 'all' : filter.deliveryOption
                }
                onChange={(e) => {
                  setFilter({
                    ...filter,
                    deliveryOption:
                      e.target.value == 'all'
                        ? null
                        : (e.target.value as 1 | 0 | null),
                  });
                }}
              >
                <MenuItem value={'all'}>Alle</MenuItem>
                <MenuItem value={1}>Mit Lieferung</MenuItem>
                <MenuItem value={0}>Keine Lieferung</MenuItem>
              </Select>
            </FormControl>
          </div>
        )}
        {isFetching && <LinearProgress color="primary" />}
      </div>
      {data?.pagination?.totalCount !== 0 ? (
        <>
          <div className=" bg-white/30 py-5 px-2 rounded-md mt-3">
            {data?.data.length !== 0 ? (
              <div className=" grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3  gap-4 ">
                {data?.data?.map((card, index) => {
                  return (
                    <InvitationCard
                      event={event}
                      key={index}
                      invite={card}
                      refetch={() => refetch()}
                    />
                  );
                })}
              </div>
            ) : (
              <div className=" flex items-center justify-center text-white text-7">
                Kein Ergebnis
              </div>
            )}
          </div>

          <div className=" flex items-center justify-center bg-white p-2 rounded-md mt-3">
            <Pagination
              page={data?.pagination?.page}
              onChange={(e, page) => {
                setPagination({ ...pagination, pageIndex: page });
              }}
            />
          </div>
        </>
      ) : (
        <div className=" flex items-center justify-center my-10 text-gray-300 text-3 font-semibold ">
          Bisher keine Einladungen
        </div>
      )}
    </>
  );
}

export default EventInvitaions;

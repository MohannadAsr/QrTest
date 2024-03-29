import { Button, IconButton, Paper } from '@mui/material';
import MuiIcon from '@src/@core/components/MuiIcon';
import DashTable from '@src/@core/shared/Table/DashTable';
import {
  MutateAcceptVipRequest,
  MutateDeleteVip,
  MutateRejectVipRequest,
  useVipQuery,
} from '@src/actions/Vips/useVipsQueries';
import React from 'react';
import { format } from 'date-fns';
import { PaginationControlDTO, VIPDTO } from '@src/actions/Vips/Dto';
import AddVip from '@components/Vips/AddVip';

const VipRequestCard = ({ reqeust }: { reqeust: VIPDTO }) => {
  const { mutate: accept } = MutateAcceptVipRequest();
  const { mutate: reject } = MutateRejectVipRequest();

  return (
    <div className=" grid grid-cols-12 bg-primary/70 rounded-md text-white p-3 ">
      <div className="col-span-8 flex flex-col gap-1 text-[14px]">
        <div className=" flex gap-1 items-center">
          <MuiIcon name="Person" /> <p>{reqeust.name}</p>
        </div>
        <div className=" flex gap-1 items-center">
          <MuiIcon name="Email" /> <p>{reqeust.email || 'None'}</p>
        </div>
        <div className=" flex gap-1 items-center">
          <MuiIcon name="Phone" /> <p>{reqeust.phone || 'None'}</p>
        </div>
      </div>
      <div className=" col-span-4 flex items-center justify-end gap-1 ">
        <div
          className=" p-2 rounded-full bg-secondary cursor-pointer hover:bg-primary"
          onClick={() => {
            accept(reqeust.id);
          }}
        >
          <MuiIcon name="Check" color="success" />
        </div>
        <div
          className=" p-2 rounded-full bg-secondary cursor-pointer hover:bg-primary"
          onClick={() => {
            reject(reqeust.id);
          }}
        >
          <MuiIcon name="Close" color="error" />
        </div>
      </div>
    </div>
  );
};

function Vips() {
  const [paginationControl, setPaginationControl] =
    React.useState<PaginationControlDTO>(new PaginationControlDTO());
  const {
    data: VipList,
    refetch,
    isLoading,
    isFetching,
  } = useVipQuery(paginationControl);

  const { mutate: deleteVip } = MutateDeleteVip();
  const [selectedIds, setSelectedIds] = React.useState([]);
  const Tableref = React.useRef<null | HTMLDivElement>(null);

  const deleteItems = () => {
    deleteVip(selectedIds, {
      onSuccess: () => {
        setSelectedIds([]);
      },
    });
  };

  React.useEffect(() => {
    refetch();
  }, [paginationControl]);

  return (
    <div className=" container">
      <h1 className=" text-3 font-bold text-white">
        Verwalten Sie die Daten Ihrer{' '}
        <span className=" text-success">VIPs</span>
      </h1>
      <DashTable
        isFetching={isFetching}
        isLoading={isLoading}
        paginationData={VipList?.pagination}
        paginationControl={paginationControl}
        setPaginationControl={setPaginationControl}
        actions={
          <>
            <AddVip />
          </>
        }
        data={VipList?.data?.map((item, index) => {
          return {
            id: item.id,
            cells: [
              item.name,
              item.email || '...',
              item.phone || '...',
              format(new Date(item.createdAt), ' dd-MM-yyyy'),
              format(new Date(item.updatedAt), ' dd-MM-yyyy'),
            ],
          };
        })}
        name="Vips"
        titles={[
          { name: 'name' },
          { name: 'email' },
          { name: 'Telefon' },
          { name: 'Erstellungsdatum', propertyName: 'createdAt' },
          { name: 'Letztes Update', propertyName: 'updatedAt' },
        ]}
        onDelete={deleteItems}
        selectedIds={selectedIds}
        setSelectedIds={setSelectedIds}
      />
      {VipList?.allVipRequests?.length !== 0 && !isLoading && (
        <>
          <p className=" text-5  text-success font-semibold rounded-md w-fit mt-5 ">
            Vips Requests ({VipList?.allVipRequests?.length})
          </p>
          <div
            className={` grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 mt-4`}
          >
            {VipList?.allVipRequests?.map((reqeust, index) => {
              return <VipRequestCard reqeust={reqeust} key={index} />;
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default Vips;

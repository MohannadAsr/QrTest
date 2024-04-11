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
import { useBillsQuery } from '@src/actions/Bills/useBillsQueries';

function Bills() {
  const [paginationControl, setPaginationControl] =
    React.useState<PaginationControlDTO>(new PaginationControlDTO());
  const {
    data: VipList,
    refetch,
    isLoading,
    isFetching,
  } = useBillsQuery(paginationControl);

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
        // actions={
        //   <>
        //     <AddVip />
        //   </>
        // }
        data={VipList?.data?.map((item, index) => {
          return {
            id: item.id,
            cells: [
              item.invitation.vip.name,
              format(new Date(item.createdAt), ' dd-MM-yyyy HH:mm'),
              <p>{item.invitation?.event?.name || 'Unknown'} </p>,
              <p>{(item.billDetails.amount_total / 100).toFixed(2)} €</p>,
            ],
          };
        })}
        name="Bills"
        titles={[
          { name: 'name' },
          { name: 'Create Date', propertyName: 'updatedAt' },
          { name: 'Event Name', propertyName: 'updatedAt' },
          { name: 'Total Amount', propertyName: 'updatedAt' },
        ]}
        onDelete={deleteItems}
        selectedIds={selectedIds}
        setSelectedIds={setSelectedIds}
      />
    </div>
  );
}

export default Bills;

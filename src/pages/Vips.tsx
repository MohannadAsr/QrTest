import { Button } from '@mui/material';
import MuiIcon from '@src/@core/components/MuiIcon';
import DashTable from '@src/@core/shared/Table/DashTable';
import { MutateDeleteVip, useVipQuery } from '@src/actions/Vips/useVipsQueries';
import React from 'react';
import { format } from 'date-fns';
import { PaginationControlDTO } from '@src/actions/Vips/Dto';
import AddVip from '@components/Vips/AddVip';

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
      <div className=" my-5">
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
      </div>
    </div>
  );
}

export default Vips;

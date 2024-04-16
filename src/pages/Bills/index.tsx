import DashTable from '@src/@core/shared/Table/DashTable';
import { useBillsQuery } from '@src/actions/Bills/useBillsQueries';
import { PaginationControlDTO } from '@src/actions/Vips/Dto';
import { MutateDeleteVip } from '@src/actions/Vips/useVipsQueries';
import { format } from 'date-fns';
import React from 'react';

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
        Verwalten Sie Ihre <span className=" text-success">Zahlungen</span>
      </h1>
      <DashTable
        isFetching={isFetching}
        isLoading={isLoading}
        paginationData={VipList?.pagination}
        paginationControl={paginationControl}
        setPaginationControl={setPaginationControl}
        data={VipList?.data?.map((item, index) => {
          return {
            id: item.id,
            cells: [
              item.invitation?.vip?.name,
              format(new Date(item.createdAt), ' dd-MM-yyyy HH:mm'),
              <div className=" flex items-center gap-2">
                <img
                  src={item.invitation?.event?.image}
                  alt=""
                  className=" rounded-full w-10 h-10 border-primary border-[1px]"
                />
                {item.invitation?.event?.name || 'Unknown'}{' '}
              </div>,
              <p>{(item.billDetails.amount_total / 100).toFixed(2)} €</p>,
            ],
          };
        })}
        name="Bills"
        titles={[
          { name: 'name' },
          { name: 'ERSTELLUNGSDATUM', propertyName: 'updatedAt' },
          { name: 'Ereignis', propertyName: 'updatedAt' },
          { name: 'Gesamtmenge', propertyName: 'updatedAt' },
        ]}
        onDelete={deleteItems}
        selectedIds={selectedIds}
        setSelectedIds={setSelectedIds}
      />
    </div>
  );
}

export default Bills;

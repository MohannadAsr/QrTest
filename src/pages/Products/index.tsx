import AddTabel from '@components/Products/AddTabel';
import Addproducts from '@components/Products/Addproducts';
import AddVip from '@components/Vips/AddVip';
import { IconButton } from '@mui/material';
import MuiIcon from '@src/@core/components/MuiIcon';
import ActiveComponent from '@src/@core/shared/Customs/ActiveComponent';
import DashTable from '@src/@core/shared/Table/DashTable';
import NoTableData from '@src/@core/shared/Table/NoTableData';
import {
  MutateDeleteProduct,
  MutateDeleteTables,
  MutateSwitchStatus,
  useProductsQuery,
  useTabelsQuery,
} from '@src/actions/Products/useProductsQueries';
import { PaginationControlDTO } from '@src/actions/Vips/Dto';
import { MutateDeleteVip, useVipQuery } from '@src/actions/Vips/useVipsQueries';
import { ErrorBtn, SuccessBtn } from '@src/styles/styledComponents';
import { format } from 'date-fns';
import React from 'react';

function ProductPage() {
  const [paginationControl, setPaginationControl] =
    React.useState<PaginationControlDTO>(new PaginationControlDTO());
  const {
    data: ProductsList,
    refetch,
    isLoading,
    isFetching,
    isError,
  } = useProductsQuery(paginationControl);

  const { mutate: deleteVip } = MutateDeleteProduct();
  const { mutate: switcher, isPending: isSwitching } = MutateSwitchStatus();
  const [selectedIds, setSelectedIds] = React.useState([]);
  const { data: tabels } = useTabelsQuery();
  const { mutate: deleteTable, isPending: isDeleting } = MutateDeleteTables();

  const deleteItems = () => {
    deleteVip(selectedIds, {
      onSuccess: () => {
        setSelectedIds([]);
      },
    });
  };

  const handleDeleteTable = (id: string) => {
    deleteTable([id]);
  };

  React.useEffect(() => {
    refetch();
  }, [paginationControl]);

  return (
    <div className=" container">
      <h1 className=" text-3 font-bold text-white">
        Verwalten Sie die Daten <span className=" text-success">Products</span>
      </h1>
      <div className=" my-5">
        <DashTable
          isError={isError}
          isFetching={isFetching}
          isLoading={isLoading}
          paginationData={ProductsList?.pagination}
          paginationControl={paginationControl}
          setPaginationControl={setPaginationControl}
          actions={
            <>
              <Addproducts />
            </>
          }
          data={ProductsList?.data?.map((item, index) => {
            return {
              id: item.id,
              cells: [
                item.name,
                <>{item.price} € </>,
                item.restaurant || '...',
                item.description || '...',
                <>
                  <ActiveComponent
                    isLoading={isSwitching}
                    onAction={() => switcher(item.id)}
                    isActive={item.active}
                  />
                </>,
                ,
                format(new Date(item.createdAt), ' dd-MM-yyyy'),
                format(new Date(item.updatedAt), ' dd-MM-yyyy'),
                <Addproducts
                  customBtn={
                    <IconButton>
                      <MuiIcon name="Edit" />
                    </IconButton>
                  }
                  product={item}
                />,
              ],
            };
          })}
          name="Products"
          titles={[
            { name: 'name' },
            { name: 'PREIS' },
            { name: 'RESTAURANT' },
            { name: 'Beschreibung' },
            { name: 'Status' },
            { name: 'Erstellungsdatum', propertyName: 'createdAt' },
            { name: 'Letztes Update', propertyName: 'updatedAt' },
            { name: 'Aktion', propertyName: 'updatedAt' },
          ]}
          onDelete={deleteItems}
          selectedIds={selectedIds}
          setSelectedIds={setSelectedIds}
        />
      </div>
      <div>
        <div className=" text-6 bg-primary p-3 text-white font-semibold rounded-md shadow-lg flex items-center justify-between">
          <p>Tabellen</p>
          <AddTabel />
        </div>
        <div>{tabels?.length == 0 && <NoTableData name="Tabels" />}</div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mt-4">
          {tabels?.map((item, index) => {
            return (
              <div
                key={index}
                className=" bg-white/90 p-3 rounded-md shadow-lg border-primary border-[3px]"
              >
                <div className=" bg-secondary flex items-center justify-center rounded-md">
                  <MuiIcon
                    name="TableBar"
                    sx={{ fontSize: 60, color: '#fff' }}
                  />
                </div>
                <div className=" flex items-center justify-between mt-3 gap-3">
                  <div className="flex-1 flex flex-col items-center justify-center gap-2 text-white bg-secondary p-2 rounded-md">
                    <MuiIcon name="Numbers" />
                    <p>{item.number}</p>
                  </div>
                  <div className=" flex-1 flex flex-col items-center justify-center gap-2 text-white bg-secondary p-2 rounded-md">
                    <MuiIcon name="Chair" />
                    <p>{item.seats}</p>
                  </div>
                </div>
                <div className=" flex items-center justify-center mt-3">
                  <ErrorBtn
                    startIcon={<MuiIcon name="Delete" />}
                    onClick={() => handleDeleteTable(item.id)}
                    loading={isDeleting}
                  >
                    Löschen
                  </ErrorBtn>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ProductPage;

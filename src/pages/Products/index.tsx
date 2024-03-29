import Addproducts from '@components/Products/Addproducts';
import AddVip from '@components/Vips/AddVip';
import { IconButton } from '@mui/material';
import MuiIcon from '@src/@core/components/MuiIcon';
import ActiveComponent from '@src/@core/shared/Customs/ActiveComponent';
import DashTable from '@src/@core/shared/Table/DashTable';
import {
  MutateDeleteProduct,
  MutateSwitchStatus,
  useProductsQuery,
} from '@src/actions/Products/useProductsQueries';
import { PaginationControlDTO } from '@src/actions/Vips/Dto';
import { MutateDeleteVip, useVipQuery } from '@src/actions/Vips/useVipsQueries';
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
  } = useProductsQuery(paginationControl);

  const { mutate: deleteVip } = MutateDeleteProduct();
  const { mutate: switcher, isPending: isSwitching } = MutateSwitchStatus();
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
        Verwalten Sie die Daten <span className=" text-success">Products</span>
      </h1>
      <div className=" my-5">
        <DashTable
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
            { name: 'price' },
            { name: 'Restaurant' },
            { name: 'Description' },
            { name: 'Status' },
            { name: 'Erstellungsdatum', propertyName: 'createdAt' },
            { name: 'Letztes Update', propertyName: 'updatedAt' },
            { name: 'Action', propertyName: 'updatedAt' },
          ]}
          onDelete={deleteItems}
          selectedIds={selectedIds}
          setSelectedIds={setSelectedIds}
        />
      </div>
    </div>
  );
}

export default ProductPage;

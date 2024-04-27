import { Checkbox, FormLabel, Paper, TextField } from '@mui/material';
import React from 'react';
import { ProductDto } from '@src/actions/Products/Dto';
import { ErrorMessage } from 'formik';
import ApproveHandler from './ApproveHandler';
import { useVipRequestContext } from './EditInvitation';
import { useProductsListQuery } from '@src/actions/Products/useProductsQueries';

export const ProductList = ({
  productList,
  selectedItems,
  setSelectedIems,
}: {
  productList: ProductDto[];
  selectedItems: {
    id: string;
    quantity: number;
    name: string;
    price: number;
  }[];
  setSelectedIems: React.Dispatch<
    React.SetStateAction<{ id: string; quantity: number }[]>
  >;
}) => {
  const switchItem = (id: string, name: string, price: number) => {
    const list = [...selectedItems];
    const findIndex = list.findIndex((item) => item.id == id);
    findIndex == -1
      ? list.push({ id: id, quantity: 1, name: name, price: price })
      : list.splice(findIndex, 1);
    setSelectedIems(list);
  };

  const handleQuantityChange = (id: string, value: string) => {
    const list = [...selectedItems];
    const newList = list.map((item) => {
      return item.id == id
        ? { ...item, id: item.id, quantity: Number(value) }
        : item;
    });
    setSelectedIems(newList);
  };

  return productList?.map((item, index) => {
    return (
      <div
        key={item.id}
        className={` ${
          selectedItems.findIndex((selected) => selected.id == item.id) !== -1
            ? 'bg-primary/70 dark:bg-success/20 text-white'
            : ''
        }   rounded-md flex   px-1 py-2  gap-3  flex-wrap   justify-between items-center  relative `}
      >
        <div className=" flex items-center gap-2">
          <div>
            <Checkbox
              color="success"
              checked={
                selectedItems.findIndex(
                  (selected) => selected.id == item.id
                ) !== -1
              }
              onClick={() => switchItem(item.id, item.name, item.price)}
            />
          </div>
          <div>
            <div>
              <p>{item.name}</p>
              <p className=" text-[12px] ">{item.description}</p>
            </div>
            <p className=" font-semibold">{item.price} € </p>
          </div>
        </div>
        <Paper elevation={0}>
          {selectedItems.findIndex((selected) => selected.id == item.id) !==
            -1 && (
            <TextField
              sx={{ width: 70 }}
              type="number"
              onChange={(e) => handleQuantityChange(item.id, e.target.value)}
              value={
                selectedItems.find((select) => select.id == item.id)?.quantity
              }
            />
          )}
        </Paper>
      </div>
    );
  });
};

function ProductsOption({ selectedItems, setSelectedItems }) {
  const { FormState, setFormState } = useVipRequestContext();
  const { data: productList, isLoading: isLoadingProduct } =
    useProductsListQuery();

  React.useEffect(() => {
    setFormState({ ...FormState, products: selectedItems });
  }, [selectedItems]);

  if (productList?.length == 0) return <></>;
  return (
    <>
      <div>
        <div className=" flex sm:flex-row flex-col items-start lg:items-center justify-between flex-wrap gap-2 my-2">
          <FormLabel>Gibt es Produktanfragen?</FormLabel>
          <ApproveHandler
            value={FormState.productsOption}
            onChange={(val) => {
              setFormState({ ...FormState, productsOption: val });
            }}
          />
        </div>

        {FormState.productsOption && (
          <>
            <p className=" text-[12px]">
              *Wählen Sie Produkte aus, die Sie bestellen möchten
            </p>
            <Paper
              elevation={0}
              className=" flex flex-col gap-2 p-3 max-h-[250px] overflow-auto"
            >
              <ProductList
                productList={productList}
                selectedItems={selectedItems}
                setSelectedIems={setSelectedItems}
              />
            </Paper>
          </>
        )}
        <ErrorMessage component={'div'} name="products" className="error-msg" />
      </div>
    </>
  );
}

export default ProductsOption;

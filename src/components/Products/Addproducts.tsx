import { Button, Checkbox } from '@mui/material';
import MuiIcon from '@src/@core/components/MuiIcon';
import DashDialog from '@src/@core/shared/Dialog/DashDialog';
import FormikControl from '@src/@core/shared/Formik/FormikControl';
import { AddProductDto, ProductDto } from '@src/actions/Products/Dto';
import { MutateAddProduct } from '@src/actions/Products/useProductsQueries';
import { AddVIPDto } from '@src/actions/Vips/Dto';
import { MutataAddVip } from '@src/actions/Vips/useVipsQueries';
import { useCustomHooks } from '@src/hooks/useCustomHooks';
import { ErrorBtn, SuccessBtn } from '@src/styles/styledComponents';
import { Form, Formik } from 'formik';
import React, { ReactNode } from 'react';
import * as yup from 'yup';

function Addproducts({
  product,
  customBtn,
}: {
  product?: ProductDto;
  customBtn?: ReactNode;
}) {
  const [open, setOpen] = React.useState<boolean>(false);
  const { mutate, isPending } = MutateAddProduct();
  const [active, setActive] = React.useState<boolean>(true);
  const { matchExistedKeys } = useCustomHooks();

  const validationSchema = yup.object({
    name: yup.string().required(),
    price: yup.number().min(1).required(),
    description: yup.string().nullable(),
    restaurant: yup.string().nullable(),
  });
  const [FormState, setFormState] = React.useState(new AddProductDto());

  const submit = (values: AddProductDto) => {
    mutate(
      { ...values, active: active },
      {
        onSuccess: () => {
          setOpen(false);
        },
      }
    );
  };

  React.useEffect(() => {
    if (product) {
      setFormState(matchExistedKeys(product, new AddProductDto()));
    } else {
      setFormState(new AddProductDto());
    }
  }, [product]);

  return (
    <>
      {!customBtn ? (
        <SuccessBtn
          onClick={() => setOpen(true)}
          color="success"
          variant="contained"
          sx={{ minWidth: 150 }}
          startIcon={<MuiIcon name="Add" />}
        >
          Neuen Produkte hinzufügen
        </SuccessBtn>
      ) : (
        <span onClick={() => setOpen(true)}>{customBtn}</span>
      )}
      <DashDialog
        open={open}
        title={'Neuen Produkte hinzufügen'}
        handleClose={() => setOpen(false)}
        body={
          <>
            <div>
              <Formik
                onSubmit={submit}
                validationSchema={validationSchema}
                initialValues={FormState}
                enableReinitialize
              >
                <Form>
                  <div className=" grid  grid-cols-1 md:grid-cols-2 gap-5">
                    <FormikControl
                      value={FormState.name}
                      Fn={(val) => {
                        setFormState({ ...FormState, name: val });
                      }}
                      fullWidth
                      Fieldtype="textField"
                      name="name"
                      label="*Name"
                    />
                    <FormikControl
                      value={FormState.price}
                      Fn={(val) => {
                        setFormState({ ...FormState, price: val });
                      }}
                      InputProps={{
                        endAdornment: (
                          <MuiIcon name="Euro" sx={{ fontSize: 17 }} />
                        ),
                      }}
                      fullWidth
                      Fieldtype="textField"
                      type="number"
                      name="price"
                      label="*Preis"
                    />
                    <div className=" col-span-1 md:col-span-2">
                      <FormikControl
                        value={FormState.restaurant}
                        Fn={(val) => {
                          setFormState({ ...FormState, restaurant: val });
                        }}
                        fullWidth
                        Fieldtype="textField"
                        name="restaurant"
                        label="Restaurantname"
                      />
                    </div>
                    <div className=" col-span-1 md:col-span-2">
                      <FormikControl
                        value={FormState.description}
                        Fn={(val) => {
                          setFormState({ ...FormState, description: val });
                        }}
                        multiline
                        fullWidth
                        Fieldtype="textField"
                        rows={3}
                        type="tel"
                        name="description"
                        label="Beschreibung"
                      />
                    </div>
                  </div>

                  <div className=" flex justify-end items-center gap-4 mt-3 ">
                    <ErrorBtn
                      startIcon={<MuiIcon name="Close" />}
                      color="error"
                      onClick={() => setOpen(false)}
                    >
                      {' '}
                      Schließen
                    </ErrorBtn>
                    <SuccessBtn
                      loading={isPending}
                      startIcon={<MuiIcon name="Check" />}
                      type="submit"
                    >
                      Hinzufügen
                    </SuccessBtn>
                  </div>
                </Form>
              </Formik>
            </div>
          </>
        }
      />
    </>
  );
}
export default Addproducts;

import { Button, Checkbox } from '@mui/material';
import MuiIcon from '@src/@core/components/MuiIcon';
import DashDialog from '@src/@core/shared/Dialog/DashDialog';
import FormikControl from '@src/@core/shared/Formik/FormikControl';
import {
  AddProductDto,
  AddTabelDto,
  ProductDto,
} from '@src/actions/Products/Dto';
import {
  MutateAddProduct,
  MutateAddTable,
} from '@src/actions/Products/useProductsQueries';
import { AddVIPDto } from '@src/actions/Vips/Dto';
import { MutataAddVip } from '@src/actions/Vips/useVipsQueries';
import { useCustomHooks } from '@src/hooks/useCustomHooks';
import { ErrorBtn, SuccessBtn } from '@src/styles/styledComponents';
import { Form, Formik } from 'formik';
import React, { ReactNode } from 'react';
import * as yup from 'yup';

function AddTabel({
  product,
  customBtn,
}: {
  product?: ProductDto;
  customBtn?: ReactNode;
}) {
  const [open, setOpen] = React.useState<boolean>(false);
  const { mutate, isPending } = MutateAddTable();
  const { matchExistedKeys } = useCustomHooks();

  const validationSchema = yup.object({
    number: yup.string().required(),
    seats: yup.number().required(),
  });

  const [FormState, setFormState] = React.useState(new AddTabelDto());

  const submit = (values: AddTabelDto) => {
    mutate(
      { ...values },
      {
        onSuccess: () => {
          setOpen(false);
          setFormState(new AddTabelDto());
        },
      }
    );
  };

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
          Neuer Tisch
        </SuccessBtn>
      ) : (
        <span onClick={() => setOpen(true)}>{customBtn}</span>
      )}
      <DashDialog
        open={open}
        title={'Neue Tisch'}
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
                      value={FormState.number}
                      Fn={(val) => {
                        setFormState({ ...FormState, number: val });
                      }}
                      fullWidth
                      Fieldtype="textField"
                      InputProps={{
                        endAdornment: (
                          <MuiIcon name="Numbers" sx={{ fontSize: 17 }} />
                        ),
                      }}
                      name="number"
                      label="*Tabellen-ID"
                    />
                    <FormikControl
                      value={FormState.seats}
                      Fn={(val) => {
                        setFormState({ ...FormState, seats: val });
                      }}
                      InputProps={{
                        endAdornment: (
                          <MuiIcon name="Chair" sx={{ fontSize: 17 }} />
                        ),
                      }}
                      fullWidth
                      Fieldtype="textField"
                      type="number"
                      name="seats"
                      label="*Sitze"
                    />
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
export default AddTabel;

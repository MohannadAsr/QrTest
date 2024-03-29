import { Button, FormControl } from '@mui/material';
import MuiIcon from '@src/@core/components/MuiIcon';
import DashDialog from '@src/@core/shared/Dialog/DashDialog';
import FormikControl from '@src/@core/shared/Formik/FormikControl';
import { AddVIPDto } from '@src/actions/Vips/Dto';
import { MutataAddVip } from '@src/actions/Vips/useVipsQueries';
import { ErrorBtn, SuccessBtn } from '@src/styles/styledComponents';
import { Form, Formik } from 'formik';
import React from 'react';
import * as yup from 'yup';

function AddVip() {
  const [open, setOpen] = React.useState<boolean>(false);
  const { mutate, isPending } = MutataAddVip();

  const validationSchema = yup.object({
    name: yup.string().required(),
    email: yup.string().email().nullable(),
    phone: yup.number().nullable(),
  });

  const initialValues = { ...new AddVIPDto() };

  const submit = (values: AddVIPDto) => {
    mutate(values, {
      onSuccess: () => {
        setOpen(false);
      },
    });
  };

  return (
    <>
      <SuccessBtn
        onClick={() => setOpen(true)}
        color="success"
        variant="contained"
        sx={{ minWidth: 150 }}
        startIcon={<MuiIcon name="Add" />}
      >
        Neuen VIP hinzufügen
      </SuccessBtn>
      <DashDialog
        open={open}
        title={'Neuen VIP hinzufügen'}
        handleClose={() => setOpen(false)}
        body={
          <>
            <div>
              <Formik
                onSubmit={submit}
                validationSchema={validationSchema}
                initialValues={initialValues}
              >
                <Form>
                  <div className=" grid  grid-cols-1 md:grid-cols-2 gap-5">
                    <FormikControl
                      fullWidth
                      Fieldtype="textField"
                      name="name"
                      label="Name"
                    />
                    <FormikControl
                      fullWidth
                      Fieldtype="textField"
                      name="email"
                      label="E-mail"
                    />
                    <div className=" col-span-1 md:col-span-2">
                      <FormikControl
                        fullWidth
                        Fieldtype="textField"
                        type="tel"
                        name="phone"
                        label="Phone Number"
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
                      Close
                    </ErrorBtn>
                    <SuccessBtn
                      loading={isPending}
                      startIcon={<MuiIcon name="Check" />}
                      type="submit"
                    >
                      Add
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

export default AddVip;

import { CircularProgress } from '@mui/material';
import MuiIcon from '@src/@core/components/MuiIcon';
import GoBack from '@src/@core/shared/Customs/GoBack';
import FormikControl from '@src/@core/shared/Formik/FormikControl';
import { AddVIPDto } from '@src/actions/Vips/Dto';
import {
  MutataAddVip,
  MutateVipRequest,
} from '@src/actions/Vips/useVipsQueries';
import { ErrorBtn, SuccessBtn } from '@src/styles/styledComponents';
import { Form, Formik } from 'formik';
import React from 'react';
import * as yup from 'yup';

function VipRequest({ join, setJoin }) {
  const [FormState, setFormState] = React.useState(new AddVIPDto());
  const { mutate, isPending } = MutateVipRequest();
  const [done, setDone] = React.useState<boolean>(false);

  const validationSchema = yup.object({
    name: yup.string().required(),
    email: yup.string().email().nullable(),
    phone: yup.number().nullable(),
  });

  const submit = (values: AddVIPDto) => {
    mutate(values, {
      onSuccess: (data) => {
        if (data) setDone(true);
        setTimeout(() => {
          setJoin(false);
        }, 3000);
      },
    });
  };

  if (done)
    return (
      <div className=" flex items-center flex-col gap-5">
        <MuiIcon name="CheckCircle" color="primary" sx={{ fontSize: 50 }} />
        <p className=" text-primary text-7 capitalize font-semibold">
          Ihre Anfrage wurde erfolgreich übermittelt
        </p>
        <CircularProgress />
      </div>
    );
  return (
    <div>
      <Formik
        onSubmit={submit}
        validationSchema={validationSchema}
        initialValues={FormState}
        enableReinitialize
      >
        <Form>
          <div className=" flex flex-col gap-3">
            <div className=" flex items-center gap-1">
              <GoBack customAction={() => setJoin(false)} />
              <p className=" text-primary font-semibold">
                Geben Sie Ihre Informationen an, damit wir Sie zu unserer
                VIP-Liste hinzufügen können
              </p>
            </div>
            <div className=" grid  grid-cols-1 md:grid-cols-2 gap-5">
              <FormikControl
                InputProps={{
                  startAdornment: <MuiIcon name="PermIdentity" />,
                }}
                value={FormState.name}
                Fn={(val) => {
                  setFormState({ ...FormState, name: val });
                }}
                fullWidth
                Fieldtype="textField"
                name="name"
                label="Name"
              />
              <FormikControl
                InputProps={{ startAdornment: <MuiIcon name="Email" /> }}
                value={FormState.email}
                Fn={(val) => {
                  setFormState({ ...FormState, email: val });
                }}
                fullWidth
                Fieldtype="textField"
                name="email"
                label="E-mail"
              />
              <div className=" col-span-1 md:col-span-2">
                <FormikControl
                  InputProps={{ startAdornment: <MuiIcon name="Phone" /> }}
                  value={FormState.phone}
                  Fn={(val) => {
                    setFormState({ ...FormState, phone: val });
                  }}
                  fullWidth
                  Fieldtype="textField"
                  type="tel"
                  name="phone"
                  label="Telefonnummer"
                />
              </div>
            </div>

            <div className=" flex justify-center items-center gap-4 mt-3 ">
              <SuccessBtn loading={isPending} type="submit">
                Einreichen
              </SuccessBtn>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default VipRequest;

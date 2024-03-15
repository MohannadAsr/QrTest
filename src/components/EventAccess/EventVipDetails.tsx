import { Alert, Paper } from '@mui/material';
import FormikControl from '@src/@core/shared/Formik/FormikControl';
import { useVipAuth } from '@src/Auth/Vips/useVipAuth';
import { SuccessBtn } from '@src/styles/styledComponents';
import { AxiosError } from 'axios';
import { Form, Formik } from 'formik';
import React from 'react';
import * as yup from 'yup';
import EventByUser from './EventByUser';

export class vipLogin {
  email = '' as string;
  phone = '' as string;
}

function EventVipDetails() {
  const { Login, isLoggedIn } = useVipAuth();
  const [isLoggedin, setIsLoggedin] = React.useState<boolean>(isLoggedIn());
  const [error, setError] = React.useState<string>('');

  const validationSchema = yup.object({
    email: yup.string().nullable(),
    phone: yup.string().nullable(),
  });

  const submit = (values: vipLogin) => {
    Login(values)
      .then(() => {
        setIsLoggedin(isLoggedIn());
      })
      .catch((error: AxiosError<any>) => {
        setError(error.response.data?.message);
      });
  };

  if (!isLoggedin)
    return (
      <div className=" flex flex-col justify-start gap-5 min-h-[40vh] my-10  px-2 md:px-14 z-[2] container">
        <Paper className=" z-[2]  px-5 w-full  py-14">
          <Formik
            onSubmit={submit}
            initialValues={{ ...new vipLogin() }}
            validationSchema={validationSchema}
          >
            <Form>
              <div className=" flex flex-col gap-5 justify-center   ">
                <p className="  text-primary text-center font-semibold text-6 z-[2] drop-shadow-md">
                  Bitte melden Sie sich an, um auf die Veranstaltungsdetails
                  zuzugreifen
                </p>
                <FormikControl
                  name="email"
                  label={'Email'}
                  Fieldtype="textField"
                  fullWidth
                />
                <p className=" text-center capitalize font-medium text-secondary drop-shadow-md">
                  Oder über die Telefonnummer
                </p>
                <FormikControl
                  name="phone"
                  label={'Telfon'}
                  Fieldtype="textField"
                  type="tel"
                  fullWidth
                />
                <SuccessBtn type="submit">Anmeldung</SuccessBtn>
                {error && <Alert severity="error">{error}</Alert>}
              </div>
            </Form>
          </Formik>
        </Paper>
        <div className=" text-white drop-shadow-lg uppercase  text-xs md:text-sm text-center z-[2]">
          COPYRIGHT © 2024{' '}
          <a
            href="https://ddm-agentur.de/"
            className=" text-success font-semibold"
          >
            DDM-Agentur
          </a>{' '}
          , All rights Reserved
        </div>
      </div>
    );

  return <EventByUser />;
}

export default EventVipDetails;

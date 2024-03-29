import { Alert, Paper } from '@mui/material';
import FormikControl from '@src/@core/shared/Formik/FormikControl';
import { useVipAuth } from '@src/Auth/Vips/useVipAuth';
import { SuccessBtn } from '@src/styles/styledComponents';
import { AxiosError } from 'axios';
import { Form, Formik } from 'formik';
import React from 'react';
import * as yup from 'yup';
import EventByUser from './EventByUser';
import MuiIcon from '@src/@core/components/MuiIcon';
import VipRequest from './VipRequest';

export class vipLogin {
  email = '' as string;
  phone = '' as string;
}

function EventVipDetails() {
  const { Login, isLoggedIn } = useVipAuth();
  const [isLoggedin, setIsLoggedin] = React.useState<boolean>(isLoggedIn());
  const [error, setError] = React.useState<string>('');
  const [join, setJoin] = React.useState<boolean>(false);

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
      <>
        <div className=" flex flex-col justify-start gap-5 min-h-[40vh] my-10  px-2 md:px-20 z-[2] container">
          <Paper className=" z-[2]  px-5 w-full  py-8">
            {join && <VipRequest setJoin={setJoin} join={join} />}
            {!join && (
              <Formik
                onSubmit={submit}
                initialValues={{ ...new vipLogin() }}
                validationSchema={validationSchema}
              >
                <Form>
                  <div className=" flex flex-col gap-3 justify-center   ">
                    <p className="  text-primary  font-semibold text-[15px] z-[2] ">
                      Bitte melden Sie sich an, um auf die Veranstaltungsdetails
                      zuzugreifen
                    </p>
                    <FormikControl
                      InputProps={{
                        startAdornment: (
                          <MuiIcon name="Email" color="primary" />
                        ),
                      }}
                      name="email"
                      label={'Email'}
                      Fieldtype="textField"
                      fullWidth
                    />
                    <p className=" text-center capitalize font-medium text-secondary text-[15px] ">
                      Oder über die Telefonnummer
                    </p>
                    <FormikControl
                      InputProps={{
                        startAdornment: (
                          <MuiIcon name="Phone" color="primary" />
                        ),
                      }}
                      name="phone"
                      label={'Telfon'}
                      Fieldtype="textField"
                      type="tel"
                      fullWidth
                    />
                    <div className=" flex items-center justify-center">
                      <SuccessBtn
                        type="submit"
                        sx={{ maxWidth: 250 }}
                        fullWidth
                      >
                        Anmeldung
                      </SuccessBtn>
                    </div>
                    {error && <Alert severity="error">{error}</Alert>}
                    <div
                      onClick={() => setJoin(true)}
                      className=" flex items-center justify-center text-primary underline font-semibold text-[14px] cursor-pointer"
                    >
                      Join Our Vips Members
                    </div>
                  </div>
                </Form>
              </Formik>
            )}
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
      </>
    );

  return <EventByUser />;
}

export default EventVipDetails;

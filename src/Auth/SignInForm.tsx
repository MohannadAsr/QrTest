import { Check } from '@mui/icons-material';
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  TextField,
} from '@mui/material';
import MuiIcon from '@src/@core/components/MuiIcon';
import FormikControl from '@src/@core/shared/Formik/FormikControl';
import { Form, Formik } from 'formik';
import React from 'react';
import * as yup from 'yup';
import { useAuth } from './useAuth';
import { useNavigate } from 'react-router-dom';

export class signinDto {
  email: string = 'l1@admin.com';
  password: string = 'l1admin';
}

function SignInForm() {
  const { Login } = useAuth();
  const navigate = useNavigate();
  const [initValues, setInitValues] = React.useState(new signinDto());
  const [showPass, setShowPass] = React.useState<boolean>(false);
  const validationSchema = yup.object({
    email: yup.string().required(),
    password: yup.string().required(),
  });

  const submit = (values: signinDto) => {
    Login(values).then(() => {
      navigate('/');
    });
  };
  return (
    <>
      <Formik
        onSubmit={submit}
        validationSchema={validationSchema}
        initialValues={initValues}
        enableReinitialize
      >
        <Form>
          <div className=" flex flex-col gap-5">
            <FormikControl
              name="email"
              label={'Email'}
              Fieldtype="textField"
              className=" w-full"
              placeholder="E-mail"
            />
            <FormikControl
              name="password"
              label={'Passwort'}
              Fieldtype="textField"
              type={showPass ? 'text' : 'password'}
              className=" w-full"
              placeholder="Password"
              InputProps={{
                endAdornment: (
                  <IconButton onClick={() => setShowPass(!showPass)}>
                    {showPass ? (
                      <MuiIcon name="RemoveRedEye" />
                    ) : (
                      <MuiIcon name="VisibilityOff" />
                    )}
                  </IconButton>
                ),
              }}
            />
            <div className=" flex items-center gap-3">
              <Checkbox checked />
              <p className=" drop-shadow-lg">Erinnere dich an mich</p>
            </div>
            <Button variant="contained" type="submit">
              Anmelden{' '}
            </Button>
          </div>
        </Form>
      </Formik>
    </>
  );
}

export default SignInForm;

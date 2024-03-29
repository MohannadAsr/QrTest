import {
  InputAdornment,
  Paper,
  TextField,
  TextFieldProps,
} from '@mui/material';
import { ErrorMessage, Field, FieldAttributes, FieldProps } from 'formik';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import get from 'lodash/get';

interface FormikTextFieldProps extends FieldAttributes<any> {
  label: string;
  Fn?: (props: any) => any;
}

function FormikTextField({
  name,
  label,
  Fn,
  ...rest
}: FormikTextFieldProps & TextFieldProps) {
  return (
    <div>
      <Field>
        {({ field, form }: FieldProps) => {
          return (
            <>
              <TextField
                {...field}
                value={get(form?.values, name)}
                {...rest}
                // helperText={
                //   get(form.errors, name) && get(form.touched, name)
                //     ? `*${get(form.errors, name)} `
                //     : rest?.helperText
                // }
                error={Boolean(
                  get(form.errors, name) && get(form.touched, name)
                )}
                label={label}
                id={name}
                onChange={(e) => {
                  form.setFieldValue(name, e.target.value);
                  Fn ? Fn(e.target.value) : null;
                }}
                name={name}
                InputProps={{
                  ...rest.InputProps,
                  sx: { borderRadius: 0, minHeight: 50 },
                  endAdornment:
                    get(form.errors, name) && get(form.touched, name) ? (
                      <InputAdornment position="end">
                        {get(form.errors, name) && get(form.touched, name) && (
                          <WarningAmberOutlinedIcon color="error" />
                        )}
                      </InputAdornment>
                    ) : (
                      rest?.InputProps?.endAdornment || null
                    ),
                }}
              />
            </>
          );
        }}
      </Field>
      <ErrorMessage name={name} component={'div'} className=" error-msg" />
    </div>
  );
}

export default FormikTextField;

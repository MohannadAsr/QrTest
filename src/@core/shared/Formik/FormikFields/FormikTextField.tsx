import { InputAdornment, TextField, TextFieldProps } from '@mui/material';
import { ErrorMessage, Field, FieldAttributes, FieldProps } from 'formik';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';

interface FormikTextFieldProps extends FieldAttributes<any> {
  label?: string;
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
                value={form.values[name]}
                {...rest}
                helperText={
                  form.errors[name] && form.touched[name]
                    ? `*${form.errors[name]} `
                    : rest?.helperText
                }
                error={Boolean(form.errors[name] && form.touched[name])}
                id={name}
                onChange={(e) => {
                  form.setFieldValue(name, e.target.value);
                  Fn ? Fn(e.target.value) : null;
                }}
                label={label}
                name={name}
                autoComplete={label}
                InputProps={{
                  ...rest.InputProps,

                  sx: { padding: 1 },
                  endAdornment:
                    form.errors[name] && form.touched[name] ? (
                      <InputAdornment position="end">
                        {form.errors[name] && form.touched[name] && (
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
      {/* <ErrorMessage name={name} /> */}
    </div>
  );
}

export default FormikTextField;

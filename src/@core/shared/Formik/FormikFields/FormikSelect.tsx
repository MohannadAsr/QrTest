import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
} from '@mui/material';
import { ErrorMessage, Field, FieldProps } from 'formik';
import React from 'react';

export interface FormikSelectProps extends SelectProps {
  name: string;
  label?: any;
  radios?: { title: string; value: any }[];
  menuList?: { title: String; value: any }[];
  Fn?: (props: any) => any;
}

function FormikSelect({
  name,
  label,
  menuList,
  Fn,
  ...rest
}: FormikSelectProps) {
  return (
    <div>
      <Field>
        {({ field, form }: FieldProps) => {
          return (
            <>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{label}</InputLabel>
                <Select
                  label={label}
                  id={name}
                  name={name}
                  value={form.values[name]}
                  onChange={(e) => {
                    form.setFieldValue(name, e.target.value);
                    Fn ? Fn(e.target.value) : null;
                  }}
                  {...rest}
                >
                  <MenuItem value={''}>None</MenuItem>
                  {menuList.map((item, index) => {
                    return (
                      <MenuItem key={index} value={item.value}>
                        {item.title}
                      </MenuItem>
                    );
                  })}
                </Select>
                <ErrorMessage
                  component={'div'}
                  className="error-msg"
                  name={name}
                />
              </FormControl>
            </>
          );
        }}
      </Field>
    </div>
  );
}

export default FormikSelect;

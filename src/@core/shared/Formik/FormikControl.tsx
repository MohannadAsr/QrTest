import React from 'react';
import FormikTextField from './FormikFields/FormikTextField';
import { RadioGroupProps, TextFieldProps } from '@mui/material';
import FormikRadioGroup, {
  FormikRadioGroupProps,
} from './FormikFields/FormikRadioGroup';
import FormikSelect, { FormikSelectProps } from './FormikFields/FormikSelect';

export type FormikControlType =
  | ({
      Fieldtype: 'textField';
      name: string;
      label?: any;
      menuList?: null;
      radios?: null;
      Fn?: (props: any) => any;
    } & TextFieldProps)
  | ({
      Fieldtype: 'radio';
      name: string;
      label?: any;
      menuList?: null;
      radios?: { title: string; value: any }[];
      Fn?: (props: any) => any;
    } & FormikRadioGroupProps)
  | ({
      Fieldtype: 'select';
      name: string;
      label?: any;
      radios?: null;
      menuList?: { title: string; value: any }[];
      Fn?: (props: any) => any;
    } & FormikSelectProps);

function FormikControl({
  Fieldtype,
  name,
  label,
  radios,
  menuList,
  Fn,
  ...rest
}: FormikControlType) {
  switch (Fieldtype) {
    case 'textField':
      return (
        <FormikTextField
          name={name}
          label={label}
          {...(rest as TextFieldProps)}
          Fn={Fn}
        />
      );
    case 'radio':
      return (
        <FormikRadioGroup
          name={name}
          label={label}
          {...(rest as FormikRadioGroupProps)}
          radios={radios}
          Fn={Fn}
        />
      );
    case 'select':
      return (
        <FormikSelect
          name={name}
          label={label}
          menuList={menuList}
          Fn={Fn}
          {...(rest as FormikSelectProps)}
        />
      );
    default:
      return null;
  }
}

export default FormikControl;

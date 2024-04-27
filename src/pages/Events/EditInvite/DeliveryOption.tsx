import React from 'react';
import { FormLabel, IconButton, Paper, TextField } from '@mui/material';
import MuiIcon from '@src/@core/components/MuiIcon';
import FormikControl from '@src/@core/shared/Formik/FormikControl';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import ApproveHandler from './ApproveHandler';
import { useVipRequestContext } from './EditInvitation';

function DeliveryOption() {
  const { FormState, setFormState } = useVipRequestContext();

  return (
    <div>
      <div className=" flex sm:flex-row flex-col items-start lg:items-center justify-between flex-wrap gap-2 my-2">
        <FormLabel>Brauchst du/ihr ein Taxi?</FormLabel>
        <ApproveHandler
          value={FormState.deliveryOption}
          onChange={(val) => {
            setFormState({ ...FormState, deliveryOption: val });
          }}
        />
      </div>

      {FormState.deliveryOption && (
        <Paper elevation={0} className=" flex gap-5 flex-col my-7 p-3">
          <FormikControl
            value={FormState?.deliveryAddress || ''}
            Fn={(val) => {
              setFormState({
                ...FormState,
                deliveryAddress: val,
              });
            }}
            label={'Geben Sie Ihre Adresse an*'}
            fullWidth
            placeholder="Geben Sie Ihre Adresse an"
            Fieldtype="textField"
            type="text"
            name="deliveryAddress"
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TimePicker
              ampm={false}
              label="Abholdatum*"
              value={FormState.deliveryDate}
              onChange={(val) => {
                setFormState({ ...FormState, deliveryDate: val });
              }}
            />
          </LocalizationProvider>
        </Paper>
      )}
    </div>
  );
}

export default DeliveryOption;

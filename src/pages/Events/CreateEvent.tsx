import { InputLabel } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import MuiIcon from '@src/@core/components/MuiIcon';
import FileUploader from '@src/@core/shared/FileUploader/FileUploader';
import FormikControl from '@src/@core/shared/Formik/FormikControl';
import { CreateEventDTO } from '@src/actions/Events/Dto';
import { MutateAddEvent } from '@src/actions/Events/useEventsQueries';
import { SuccessBtn } from '@src/styles/styledComponents';
import { Form, Formik } from 'formik';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

function CreateEvents() {
  const [File, setFile] = React.useState<File | null>();
  const [formValues, setFormValues] = React.useState<CreateEventDTO>(
    new CreateEventDTO()
  );
  const { mutate } = MutateAddEvent();
  const navigate = useNavigate();

  const validationSchema = yup.object({
    name: yup.string().required(),
    description: yup.string().required(),
    date: yup.date().required(),
  });

  const submit = (values) => {
    mutate(
      {
        ...values,
        image: File,
      },
      {
        onSuccess: (data) => {
          if (data) {
            navigate(-1);
          }
        },
      }
    );
  };

  return (
    <div className=" flex flex-col gap-10 text-white mb-10">
      <div>
        <h1 className=" text-3 font-bold text-white">
          Neues<span className=" text-success">Ereignis</span>erstellen
        </h1>
        <p>
          Personalisieren Sie Ihre neue Veranstaltung und fügen Sie Ihre
          Informationen hinzu.
        </p>
      </div>
      <div className=" grid grid-cols-12 gap-5 px-5 md:px-20">
        <div className=" col-span-12 md:col-span-12">
          <FileUploader File={File} setFile={setFile} />
        </div>
        <div className="col-span-12 md:col-span-12 ">
          <div className=" bg-white brand-rounded   p-5 md:p-8">
            <Formik
              onSubmit={submit}
              validationSchema={validationSchema}
              initialValues={formValues}
              enableReinitialize
            >
              <Form>
                <div className=" grid grid-cols-1  md:grid-cols-2 gap-3">
                  <div>
                    <InputLabel id="demo-simple-select-label">
                      Event Name
                    </InputLabel>
                    <FormikControl
                      fullWidth
                      Fieldtype="textField"
                      name="name"
                      Fn={(val) => {
                        setFormValues({ ...formValues, name: val });
                      }}
                    />
                  </div>
                  <div>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <InputLabel id="demo-simple-select-label">
                        Event Date & Time
                      </InputLabel>

                      <DateTimePicker
                        value={formValues.date}
                        onChange={(e: Date) => {
                          setFormValues({ ...formValues, date: e });
                        }}
                        ampm={false}
                        className=" w-full"
                        disablePast
                        closeOnSelect={false}
                      />
                    </LocalizationProvider>
                  </div>
                  <div className=" col-span-1 md:col-span-2">
                    <InputLabel id="demo-simple-select-label">
                      Event Description
                    </InputLabel>
                    <FormikControl
                      Fn={(val) => {
                        setFormValues({ ...formValues, description: val });
                      }}
                      fullWidth
                      multiline
                      rows={4}
                      Fieldtype="textField"
                      name="description"
                    />
                  </div>
                </div>
                <div className=" mt-5 flex justify-end items-center">
                  <SuccessBtn
                    startIcon={<MuiIcon name="Check" />}
                    type="submit"
                  >
                    Erstellen
                  </SuccessBtn>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateEvents;

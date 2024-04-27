import { InputLabel } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import MuiIcon from '@src/@core/components/MuiIcon';
import GoBack from '@src/@core/shared/Customs/GoBack';
import FileUploader from '@src/@core/shared/FileUploader/FileUploader';
import FormikControl from '@src/@core/shared/Formik/FormikControl';
import { CreateEventDTO } from '@src/actions/Events/Dto';
import { MutateAddEvent } from '@src/actions/Events/useEventsQueries';
import { useTabelsQuery } from '@src/actions/Products/useProductsQueries';
import { SuccessBtn } from '@src/styles/styledComponents';
import { ErrorMessage, Form, Formik } from 'formik';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

function CreateEvents() {
  const [File, setFile] = React.useState<File | null>();
  const [formValues, setFormValues] = React.useState<CreateEventDTO>(
    new CreateEventDTO()
  );
  const { mutate, isPending } = MutateAddEvent();
  const navigate = useNavigate();
  const { data: tabels } = useTabelsQuery();

  const validationSchema = yup.object({
    name: yup.string().required(),
    date: yup
      .date()
      .min(new Date(), 'Date must be greater than today date')
      .required(),
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

  const handleSwitchTable = (id: string) => {
    const list = [...formValues.tableIds];
    const Index = list.findIndex((item) => item == id);
    Index == -1 ? list.push(id) : list.splice(Index, 1);

    setFormValues({ ...formValues, tableIds: list });
  };

  return (
    <div className=" flex flex-col gap-10 text-white mb-10">
      <div>
        <div className=" flex items-center gap-2">
          <div>
            <h1 className=" text-3 font-bold text-white">
              Neues<span className=" text-success">Ereignis</span>erstellen
            </h1>
            <p>
              Personalisieren Sie Ihre neue Veranstaltung und fügen Sie Ihre
              Informationen hinzu.
            </p>
          </div>
        </div>
      </div>
      <div className=" grid grid-cols-12 gap-5 px-1 md:px-20 bg-white p-5 rounded-md">
        <p className=" text-6 p-3 text-primary font-semibold  col-span-12">
          Geben Sie Ihr Veranstaltungsbild und Ihre Details ein
        </p>
        <div className=" col-span-12 md:col-span-12">
          <FileUploader File={File} setFile={setFile} />
        </div>
        <div className="col-span-12 md:col-span-12 ">
          <div className=" bg-white    p-5 md:p-8">
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
                      Veranstaltungsname
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
                        Datum und Uhrzeit des Ereignisses
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
                      <ErrorMessage
                        component={'div'}
                        name="date"
                        className=" error-msg"
                      />
                    </LocalizationProvider>
                  </div>

                  <div className=" col-span-1 md:col-span-2">
                    <InputLabel id="demo-simple-select-label">
                      Eventbeschreibung
                    </InputLabel>
                    <FormikControl
                      value={formValues.description}
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
                  {tabels?.length > 0 && (
                    <div className="col-span-1 md:col-span-2">
                      <InputLabel>
                        Ereignistabellen (Klicken Sie, um Tabellen auszuwählen)
                      </InputLabel>

                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mt-4 ">
                        {tabels?.map((item, index) => {
                          return (
                            <div
                              onClick={() => handleSwitchTable(item.id)}
                              key={index}
                              className={` ${
                                formValues.tableIds.includes(item.id)
                                  ? 'bg-primary'
                                  : 'bg-white/90'
                              }  p-3 rounded-md shadow-lg border-primary border-[3px] cursor-pointer`}
                            >
                              <div className=" bg-secondary flex items-center justify-center rounded-md">
                                <MuiIcon
                                  name="TableBar"
                                  sx={{ fontSize: 60, color: '#fff' }}
                                />
                              </div>
                              <div className=" flex items-center justify-between mt-3 gap-3">
                                <div className="flex-1 flex flex-col items-center justify-center gap-2 text-white bg-secondary p-2 rounded-md">
                                  <MuiIcon name="Numbers" />
                                  <p>{item.number}</p>
                                </div>
                                <div className=" flex-1 flex flex-col items-center justify-center gap-2 text-white bg-secondary p-2 rounded-md">
                                  <MuiIcon name="Chair" />
                                  <p>{item.seats}</p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
                <div className=" mt-5 flex justify-end items-center">
                  <SuccessBtn
                    loading={isPending}
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

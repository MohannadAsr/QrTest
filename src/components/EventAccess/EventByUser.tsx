import {
  Checkbox,
  FormLabel,
  IconButton,
  Paper,
  TextField,
} from '@mui/material';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import MuiIcon from '@src/@core/components/MuiIcon';
import FormikControl from '@src/@core/shared/Formik/FormikControl';
import { useVipAuth } from '@src/Auth/Vips/useVipAuth';
import { useEventByIdQueries } from '@src/actions/Events/useEventsQueries';
import { CreateVipInvitaion } from '@src/actions/Invitaions/Dto';
import {
  MutateCreateInvitation,
  MutateDeleteInvite,
  useVipInvitaion,
} from '@src/actions/Invitaions/useInvitationsQueries';
import { ProductDto } from '@src/actions/Products/Dto';
import { useProductsListQuery } from '@src/actions/Products/useProductsQueries';
import { countDownDto, useCountDown } from '@src/hooks/useCountDown';
import { ErrorBtn, SuccessBtn } from '@src/styles/styledComponents';
import { Form, Formik } from 'formik';
import React from 'react';
import { useParams } from 'react-router-dom';
import * as yup from 'yup';
import EventDetailsCard from './EventDetailsCard';
import ApproveHandler from './Custom/ApproveHandler';

export const ProductList = ({
  productList,
  selectedItems,
  setSelectedIems,
}: {
  productList: ProductDto[];
  selectedItems: {
    id: string;
    quantity: number;
    name: string;
    price: number;
  }[];
  setSelectedIems: React.Dispatch<
    React.SetStateAction<{ id: string; quantity: number }[]>
  >;
}) => {
  const switchItem = (id: string, name: string, price: number) => {
    const list = [...selectedItems];
    const findIndex = list.findIndex((item) => item.id == id);
    findIndex == -1
      ? list.push({ id: id, quantity: 1, name: name, price: price })
      : list.splice(findIndex, 1);
    setSelectedIems(list);
  };

  const handleQuantityChange = (id: string, value: string) => {
    const list = [...selectedItems];
    const newList = list.map((item) => {
      return item.id == id
        ? { ...item, id: item.id, quantity: Number(value) }
        : item;
    });
    setSelectedIems(newList);
  };

  return productList?.map((item, index) => {
    return (
      <div
        className={` ${
          selectedItems.findIndex((selected) => selected.id == item.id) !== -1
            ? 'bg-primary text-white'
            : 'bg-primary/30'
        }   rounded-md flex   px-1 py-2  gap-3  flex-wrap   justify-between items-center  relative `}
      >
        <div className=" flex items-center gap-2">
          <div>
            <Checkbox
              color="success"
              checked={
                selectedItems.findIndex(
                  (selected) => selected.id == item.id
                ) !== -1
              }
              onClick={() => switchItem(item.id, item.name, item.price)}
            />
          </div>
          <div>
            <div>
              <p>{item.name}</p>
              <p className=" text-[12px] ">{item.description}</p>
            </div>
            <p className=" font-semibold">{item.price} € </p>
          </div>
        </div>
        <div>
          {selectedItems.findIndex((selected) => selected.id == item.id) !==
            -1 && (
            <TextField
              sx={{ width: 70 }}
              type="number"
              onChange={(e) => handleQuantityChange(item.id, e.target.value)}
              value={
                selectedItems.find((select) => select.id == item.id)?.quantity
              }
            />
          )}
        </div>
      </div>
    );
  });
};

const validationSchema = yup.object().shape({
  peopleCount: yup.number().required(),
  tableReservation: yup.number().required(),
  deliveryOption: yup.number().required(),
  deliveryDate: yup.number().required(),
  deliveryAddress: yup.number().required(),
});

function EventByUser() {
  const { id } = useParams();
  const { counter } = useCountDown();
  //auth
  const { GetUserData, LogOut } = useVipAuth();
  // Event Data
  const { data } = useEventByIdQueries(id);
  const {
    data: invitaion,
    refetch,
    isLoading,
  } = useVipInvitaion({
    eventId: id,
    vipId: GetUserData()?.id,
  });
  // FormState
  const [FormState, setFormState] = React.useState<CreateVipInvitaion>(
    new CreateVipInvitaion()
  );

  // Api Queries
  const { mutate: create, isPending: isCreating } = MutateCreateInvitation();
  const { data: productList, isLoading: isLoadingProduct } =
    useProductsListQuery();
  const [selectedItems, setSelectedItems] = React.useState<
    { id: string; quantity: number; name: string; price: number }[]
  >([]);
  const { mutate: deleteInvite, isPending: isDeleting } = MutateDeleteInvite();

  // Count Down
  const [CountDown, setCountDown] = React.useState<countDownDto | null>(null);
  const startedRef = React.useRef(false);
  const [multiple, setMultiple] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (data?.event.date && !startedRef.current) {
      startedRef.current = true;
      setInterval(() => {
        setCountDown(counter(data?.event.date));
      }, 1000);
    }
  }, [data]);

  // Is Ended
  const isEnded = React.useMemo(() => {
    if (CountDown) {
      return [
        CountDown.day,
        CountDown.hour,
        CountDown.minute,
        CountDown.second,
      ].every((item) => item == 0);
    }
    return false;
  }, [CountDown]);

  // Total Pice
  const TotalPrice = React.useMemo(() => {
    if (productList && selectedItems.length > 0) {
      const total = selectedItems.reduce((acc, curr) => {
        return (acc =
          acc +
          productList.find((product) => product.id == curr.id)?.price *
            curr.quantity);
      }, 0);
      return total;
    }
    return 0;
  }, [productList, selectedItems]);

  const createInvitaion = () => {
    create(
      {
        ...FormState,
        eventId: id,
        vipId: GetUserData().id,
        peopleNames: multiple ? FormState.peopleNames : null,
        peopleCount: multiple ? FormState.peopleNames.length + 1 : 1,
        deliveryDate: FormState.deliveryOption ? FormState.deliveryDate : null,
        deliveryAddress: FormState.deliveryOption
          ? FormState.deliveryAddress
          : null,
        products:
          FormState.productsOption && CountDown?.day >= 1
            ? selectedItems
            : null,
      },
      {
        onSuccess: (data) => {
          if (data.data.data.url) {
            return location.replace(data.data.data.url);
          }
          refetch();
        },
      }
    );
  };

  // Handle Delete Invite
  const handleDeleteInvite = () => {
    deleteInvite(invitaion.id, {
      onSuccess: (data) => {
        location.reload();
      },
    });
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = invitaion?.qrCodeUrl;
    link.download = 'downloaded-photo.jpg';
    link.click();
  };

  // if (isLoading)
  //   return (
  //     <div className=" my-10 flex items-center justify-center">
  //       <CircularProgress color="inherit" className=" text-white z-[2]" />
  //     </div>
  //   );

  if (!data)
    return (
      <div className=" my-10 flex flex-col items-center justify-center text-white text-5  text-center px-5">
        <p className="z-[2]">
          Leider kann die gesuchte Veranstaltung nicht gefunden werden
        </p>
        <div className=" z-[2] my-4">
          <ErrorBtn startIcon={<MuiIcon name="Logout" />} onClick={LogOut}>
            Ausloggen
          </ErrorBtn>
        </div>
      </div>
    );

  return (
    <div className=" z-[2] relative px-1 container my-10 ">
      {!invitaion && (
        <p className=" bg-white text-primary p-3 rounded-md">
          {' '}
          Hi ,
          <span className=" text-success font-bold">
            {' '}
            {GetUserData()?.name}
          </span>{' '}
          Sie sind zu einer Veranstaltung eingeladen. Bitte lesen Sie die
          Veranstaltungsdetails und teilen Sie uns mit, ob Sie zu diesem
          Zeitpunkt dabei sein möchten. Damit wir Ihnen einen QR-Code zur
          Verfügung stellen können, damit Sie auf die Veranstaltung zugreifen
          können.
        </p>
      )}
      <EventDetailsCard
        CountDown={CountDown}
        data={data.event}
        isEnded={isEnded}
      />
      {!invitaion && !isEnded && (
        <Paper className=" p-4 ">
          <Formik onSubmit={null} initialValues={FormState}>
            <Form>
              <div className=" flex items-center justify-center">
                <p className=" ">
                  Bitte füllen Sie dieses Formular aus, wenn Sie beitreten
                  möchten
                </p>
              </div>
              <div className=" grid grid-cols-1  gap-2 my-4 lg:w-3/4 mx-auto ">
                <div className=" flex items-center flex-wrap gap-2 my-2">
                  <FormLabel>
                    Gibt es noch andere Leute, die mitkommen?
                  </FormLabel>
                  <ApproveHandler
                    value={multiple}
                    onChange={(val) => {
                      setMultiple(val);
                    }}
                  />
                </div>
                {multiple && (
                  <div className=" flex flex-col gap-3">
                    {FormState.peopleNames.map((item, index) => {
                      return (
                        <div className=" flex  gap-2" key={index}>
                          <TextField
                            disabled={
                              index !== FormState.peopleNames.length - 1
                            }
                            value={item}
                            onChange={(e) => {
                              setFormState({
                                ...FormState,
                                peopleNames: FormState.peopleNames.map(
                                  (item, nameIndex) => {
                                    return nameIndex == index
                                      ? e.target.value
                                      : item;
                                  }
                                ),
                              });
                            }}
                            label="Name"
                            fullWidth
                          />

                          {index !== 0 && (
                            <IconButton
                              onClick={() => {
                                setFormState({
                                  ...FormState,
                                  peopleNames: FormState.peopleNames.filter(
                                    (name, nameIndex) => nameIndex !== index
                                  ),
                                });
                              }}
                            >
                              <MuiIcon name="Remove" />
                            </IconButton>
                          )}
                        </div>
                      );
                    })}
                    <div className=" flex items-center justify-center">
                      <IconButton
                        disabled={
                          FormState.peopleNames[
                            FormState.peopleNames.length - 1
                          ] == ''
                        }
                        onClick={() => {
                          setFormState({
                            ...FormState,
                            peopleNames: [...FormState.peopleNames, ''],
                          });
                        }}
                      >
                        <MuiIcon name="Add" />
                      </IconButton>
                    </div>
                  </div>
                )}

                <div>
                  <div className=" flex items-center flex-wrap gap-2 my-2">
                    <FormLabel>Benötigen Sie einen Lieferservice?</FormLabel>
                    <ApproveHandler
                      value={FormState.deliveryOption}
                      onChange={(val) => {
                        setFormState({ ...FormState, deliveryOption: val });
                      }}
                    />
                  </div>

                  {FormState.deliveryOption && (
                    <div className=" flex gap-2 flex-col my-7">
                      <FormikControl
                        value={FormState.deliveryAddress}
                        Fn={(val) => {
                          setFormState({
                            ...FormState,
                            deliveryAddress: val,
                          });
                        }}
                        label={'Geben Sie Ihre Adresse an'}
                        fullWidth
                        placeholder="Geben Sie Ihre Adresse an"
                        Fieldtype="textField"
                        type="text"
                        name="address"
                      />
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <TimePicker
                          label="Abholdatum"
                          value={FormState.deliveryDate}
                          onChange={(val) => {
                            setFormState({ ...FormState, deliveryDate: val });
                          }}
                        />
                      </LocalizationProvider>
                    </div>
                  )}
                </div>
                {data?.AvailableTables.length > 0 && (
                  <>
                    <div>
                      <div className=" flex items-center flex-wrap gap-2 my-2">
                        <FormLabel>
                          Wünschen Sie eine Tischreservierung?
                        </FormLabel>
                        <ApproveHandler
                          value={FormState.tableReservation}
                          onChange={(val) => {
                            setFormState({
                              ...FormState,
                              tableReservation: val,
                            });
                          }}
                        />
                      </div>
                    </div>
                    {FormState.tableReservation && (
                      <>
                        <div className=" grid grid-cols-2 md:grid-cols-3 gap-3">
                          {data?.AllTablesDetails.filter((item) =>
                            data?.AvailableTables.includes(item.id)
                          ).map((item, index) => {
                            return (
                              <div
                                onClick={() => {
                                  setFormState({
                                    ...FormState,
                                    tableId:
                                      FormState.tableId == item.id
                                        ? null
                                        : item.id,
                                  });
                                }}
                                key={index}
                                className={` ${
                                  FormState.tableId == item.id
                                    ? 'bg-primary'
                                    : 'bg-white'
                                } cursor-pointer p-3 rounded-md shadow-lg border-primary border-[3px]`}
                              >
                                <div className=" bg-secondary flex items-center justify-center rounded-md">
                                  <MuiIcon
                                    name="TableBar"
                                    sx={{ fontSize: 60, color: '#fff' }}
                                  />
                                </div>
                                <div className=" flex items-center justify-between mt-3 gap-3">
                                  <div className=" flex-1 flex  items-center justify-center gap-2 text-white bg-secondary p-2 rounded-md">
                                    <MuiIcon name="Chair" />
                                    <p>{item.seats}</p>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        {multiple &&
                          data?.AllTablesDetails?.find(
                            (table) => table?.id == FormState?.tableId
                          )?.seats <
                            FormState?.peopleNames?.length + 1 && (
                            <div className=" text-red-500 font-semibold text-[12px]">
                              * Warning The Table Seats is Less than the
                              Incoming People.
                            </div>
                          )}
                      </>
                    )}
                  </>
                )}
                {CountDown?.day >= 1 && productList?.length > 0 && (
                  <div>
                    <div className=" flex items-center flex-wrap gap-2 my-2">
                      <FormLabel>Möchten Sie Produkte?</FormLabel>
                      <ApproveHandler
                        value={FormState.productsOption}
                        onChange={(val) => {
                          setFormState({ ...FormState, productsOption: val });
                        }}
                      />
                    </div>
                    {FormState.productsOption && (
                      <>
                        <p className=" text-[12px]">
                          *Wählen Sie Produkte aus, die Sie bestellen möchten
                        </p>
                        <div className=" flex flex-col gap-2">
                          <ProductList
                            productList={productList}
                            selectedItems={selectedItems}
                            setSelectedIems={setSelectedItems}
                          />
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
              <div className="flex items-center justify-center  bg-primary p-3 rounded-md shadow-md">
                {TotalPrice == 0 || !FormState.productsOption ? (
                  <SuccessBtn loading={isCreating} onClick={createInvitaion}>
                    Beitrittsanfrage
                  </SuccessBtn>
                ) : (
                  <SuccessBtn loading={isCreating} onClick={createInvitaion}>
                    {' '}
                    Kasse {TotalPrice} €{' '}
                  </SuccessBtn>
                )}
              </div>
            </Form>
          </Formik>
        </Paper>
      )}
      <Paper>
        {invitaion?.status == 'approved' && (
          <div className=" flex flex-col gap-2 justify-center items-center  p-3 ">
            <p className=" text-7  text-primary ">
              Bitte speichern Sie Ihren QR-Code und verwenden Sie ihn, um Zugang
              zur Veranstaltung zu erhalten. Hinweis: Ohne diesen QrCode können
              Sie nicht auf diese Veranstaltung zugreifen.
            </p>
            <img src={invitaion.qrCodeUrl} alt="" className=" h-[150px]" />
            <SuccessBtn onClick={handleDownload}>
              Laden Sie den QR-Code herunter
            </SuccessBtn>
          </div>
        )}
        {invitaion?.status == 'pending' && (
          <div className=" py-5">
            <p className=" text-7  text-primary  p-2">
              Sie haben bereits eine ausstehende Anfrage und eine Rechnung muss
              bezahlt werden , Ihre Anfrage wird 10 Minuten nach der Erstellung
              gelöscht, wenn Sie zahlen es nicht und können danach eine neue
              Anfrage erstellen.
            </p>
            <div className=" flex items-center justify-center gap-4 px-2">
              <a
                href={invitaion?.paymentUrl}
                target="_self"
                className=" text-center text-primary bg-success p-3 font-semibold rounded-md text-[12px] flex items-center gap-1"
              >
                <MuiIcon name="Payment" />
                Gehen Sie zur Zahlung
              </a>
              <button
                disabled={isDeleting}
                onClick={handleDeleteInvite}
                className=" text-center text-white bg-error p-3 font-semibold rounded-md text-[12px] flex items-center gap-1"
              >
                <MuiIcon name="Cancel" />
                Meine Anfrage löschen
              </button>
            </div>
          </div>
        )}
      </Paper>
      <div className=" flex items-center justify-center z-[3] mt-5">
        <ErrorBtn
          startIcon={<MuiIcon name="Logout" />}
          onClick={LogOut}
          className=" z-[2]"
        >
          Ausloggen
        </ErrorBtn>
      </div>
    </div>
  );
}

export default EventByUser;

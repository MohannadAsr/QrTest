import { CircularProgress } from '@mui/material';
import DashDrawer from '@src/@core/shared/Drawer/DashDrawer';
import DashDrawerActions from '@src/@core/shared/Drawer/DashDrawerActions';
import FormikControl from '@src/@core/shared/Formik/FormikControl';
import { EventDTO } from '@src/actions/Events/Dto';
import {
  CreateVipInvitaionForm,
  InvitationDetails,
} from '@src/actions/Invitaions/Dto';
import {
  MutateDeleteInvite,
  MutateGetInviteByID,
  MutateUpdateInvitation,
} from '@src/actions/Invitaions/useInvitationsQueries';
import { TableDto } from '@src/actions/Products/Dto';
import { useCustomHooks } from '@src/hooks/useCustomHooks';
import { ErrorBtn, SuccessBtn } from '@src/styles/styledComponents';
import { Form, Formik } from 'formik';
import React from 'react';
import * as yup from 'yup';
import DeliveryOption from './DeliveryOption';
import PeopleNames from './PeopleNames';
import ProductsOption from './ProductsOption';
import TableOption from './TableOption';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

export type VipRequestType = {
  FormState: CreateVipInvitaionForm;
  setFormState: React.Dispatch<React.SetStateAction<CreateVipInvitaionForm>>;
};

export const VipRequest = React.createContext<undefined | VipRequestType>(
  undefined
);

function EditInvitation({
  id,
  open,
  setOpen,
  event,
  refetch,
}: {
  id: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  event: {
    event: EventDTO;
    AvailableTables: string[];
    AllTablesDetails: TableDto[];
  };
  refetch: () => void;
}) {
  const { id: paramsId } = useParams();
  const [FormState, setFormState] = React.useState<CreateVipInvitaionForm>(
    new CreateVipInvitaionForm()
  );
  const [invite, setInvite] = React.useState<InvitationDetails | null>(null);
  const { mutate, isPending: isGettingInvite, data } = MutateGetInviteByID();
  const [selectedItems, setSelectedItems] = React.useState<
    { id: string; quantity: number; name: string; price: number }[]
  >([]);
  const { mutate: update, isPending } = MutateUpdateInvitation();
  const { mutate: deleteInvite, isPending: isDeleting } = MutateDeleteInvite();

  const { matchExistedKeys } = useCustomHooks();

  const handleClose = () => {
    setOpen(false);
    setInvite(null);
  };

  React.useEffect(() => {
    if (open) {
      handleInvite(id);
    }
  }, [open]);

  const handleInvite = (id: string) => {
    mutate(id, {
      onSuccess: (data) => {
        if (data) {
          setInvite(data);
          setOpen(true);
          setFormState({
            ...matchExistedKeys(data.invitation, new CreateVipInvitaionForm()),
            multiple: data.invitation.peopleCount > 1,
            productsOption:
              data?.invitation?.products &&
              data?.invitation?.products?.length > 0,
          });
          setSelectedItems(data.invitation?.products || []);
        }
      },
      onError: () => {
        setOpen(true);
      },
    });
  };

  const validationSchema = React.useMemo(() => {
    return yup.object().shape({
      tableId: FormState.tableReservation
        ? yup.string().required('Bitte wählen Sie einen Tisch aus.')
        : yup.string().nullable(),
      deliveryDate: FormState.deliveryOption
        ? yup.string().required()
        : yup.string().nullable(),
      deliveryAddress: FormState.deliveryOption
        ? yup.string().required('Bitte geben Sie Ihre Adresse an.')
        : yup.string().nullable(),
      peopleNames: FormState.multiple
        ? yup
            .array()
            .of(
              yup
                .string()
                .required(
                  'Bitte geben Sie einen Namen an oder löschen Sie dieses Feld.'
                )
            )
            .min(1)
            .required()
        : null,
      products: FormState.productsOption
        ? yup
            .array()
            .of(
              yup.object().shape({
                id: yup.string(),
                quantity: yup
                  .string()
                  .min(1)
                  .required('Bitte geben Sie eine Menge an.'),
                name: yup.string(),
                price: yup.string(),
              })
            )
            .min(1, 'Bitte wählen Sie Ihre Produkte aus.')
            .required()
        : null,
    });
  }, [FormState]);

  const handleUpdate = (values) => {
    update(
      {
        ...FormState,
        id: id,
        peopleNames: FormState.multiple ? FormState.peopleNames : [],
        peopleCount: FormState.multiple ? FormState.peopleNames.length + 1 : 1,
        deliveryDate: FormState.deliveryOption ? FormState.deliveryDate : null,
        deliveryAddress: FormState.deliveryOption
          ? FormState.deliveryAddress
          : null,
        products: FormState.productsOption ? selectedItems : null,
        tableId: FormState.tableReservation ? FormState.tableId : null,
      },
      {
        onSuccess: (data) => {
          if (data) {
            refetch();

            setOpen(false);
          }
        },
      }
    );
  };

  const handleDelete = () => {
    deleteInvite(id, {
      onSuccess: () => {
        refetch();
        setOpen(false);
      },
    });
  };

  return (
    <VipRequest.Provider value={{ FormState, setFormState }}>
      {open && (
        <DashDrawer
          body={
            <>
              {isGettingInvite ? (
                <div className=" h-[80vh] flex items-center justify-center">
                  <CircularProgress color="primary" />
                </div>
              ) : (
                <>
                  <Formik
                    onSubmit={handleUpdate}
                    initialValues={FormState}
                    enableReinitialize
                    validationSchema={validationSchema}
                  >
                    <Form>
                      {invite && (
                        <div className=" flex flex-col gap-2 text-[15px] p-4 font-semibold ">
                          <p>Ereignis : {invite.event.name}</p>
                          <p>Name : {invite.vip.name}</p>
                          {invite?.vip?.email && (
                            <p>Email : {invite?.vip?.email}</p>
                          )}
                          {invite?.vip?.phone && (
                            <p>Telefon : {invite?.vip?.phone}</p>
                          )}

                          <div>
                            <PeopleNames />
                          </div>
                          <div>
                            <TableOption
                              data={event}
                              currentTableId={data.invitation.tableId}
                            />
                          </div>
                          <div>
                            <DeliveryOption />
                          </div>
                          <div>
                            <ProductsOption
                              selectedItems={selectedItems}
                              setSelectedItems={setSelectedItems}
                            />
                          </div>
                          <div className=" mt-5">
                            <FormikControl
                              value={FormState?.comment || ''}
                              Fn={(val) => {
                                setFormState({ ...FormState, comment: val });
                              }}
                              fullWidth
                              Fieldtype="textField"
                              name="comment"
                              multiline
                              rows={3}
                              label={'Kommentar und Anmerkung'}
                            />
                          </div>

                          {invite?.invitation?.qrCodeUrl && (
                            <div className=" flex items-center justify-center mt-5 mb-20">
                              <img
                                src={invite?.invitation?.qrCodeUrl}
                                alt=""
                                width={100}
                              />
                            </div>
                          )}
                        </div>
                      )}

                      <DashDrawerActions>
                        <div className=" flex items-center gap-3 justify-center ">
                          <SuccessBtn loading={isPending} type="submit">
                            Aktualisieren
                          </SuccessBtn>
                          <ErrorBtn onClick={handleDelete}>Löschen</ErrorBtn>
                        </div>
                      </DashDrawerActions>
                    </Form>
                  </Formik>
                </>
              )}
            </>
          }
          open={open}
          title={'Einladungsdetails'}
          onClose={handleClose}
        />
      )}
    </VipRequest.Provider>
  );
}

export default EditInvitation;

export const useVipRequestContext = () => {
  return React.useContext(VipRequest);
};

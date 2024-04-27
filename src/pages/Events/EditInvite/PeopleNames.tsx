import { Button, FormLabel, IconButton, Paper, TextField } from '@mui/material';
import MuiIcon from '@src/@core/components/MuiIcon';
import FormikControl from '@src/@core/shared/Formik/FormikControl';
import { useVipRequestContext } from './EditInvitation';
import ApproveHandler from './ApproveHandler';

function PeopleNames() {
  const { FormState, setFormState } = useVipRequestContext();

  const handleDeleteName = (index: number) => {
    if (FormState.peopleNames.length == 1) {
      return setFormState({ ...FormState, multiple: false });
    }
    setFormState({
      ...FormState,
      peopleNames: FormState.peopleNames.filter(
        (name, nameIndex) => nameIndex !== index
      ),
    });
  };

  return (
    <>
      <div className=" flex sm:flex-row flex-col items-start lg:items-center justify-between flex-wrap gap-2 my-2">
        <FormLabel>Es kommen noch mehr Leute?</FormLabel>
        <ApproveHandler
          value={FormState.multiple}
          onChange={(val) => {
            setFormState({
              ...FormState,
              multiple: val,
              // peopleNames: val ? [''] : FormState.peopleNames,
            });
          }}
        />
      </div>
      {FormState.multiple && (
        <>
          <Paper elevation={0} className=" flex flex-col gap-3 p-2">
            <div className=" p-3 max-h-[200px] overflow-auto flex flex-col gap-3">
              {FormState?.peopleNames?.map((item, index) => {
                return (
                  <div className=" flex items-start w-full gap-2" key={index}>
                    <div className=" flex-1 w-full">
                      <FormikControl
                        name={`peopleNames[${index}]`}
                        label="Name*"
                        fullWidth
                        Fieldtype="textField"
                        disabled={index !== FormState.peopleNames.length - 1}
                        value={item}
                        Fn={(val) => {
                          setFormState({
                            ...FormState,
                            peopleNames: FormState.peopleNames.map(
                              (item, nameIndex) => {
                                return nameIndex == index ? val : item;
                              }
                            ),
                          });
                        }}
                      />
                    </div>
                    <IconButton onClick={() => handleDeleteName(index)}>
                      <MuiIcon name="Close" />
                    </IconButton>
                  </div>
                );
              })}
            </div>
            <div className=" flex items-center justify-center">
              <Button
                startIcon={<MuiIcon name="Add" />}
                variant="text"
                disabled={
                  FormState.peopleNames[FormState?.peopleNames?.length - 1] ==
                  ''
                }
                onClick={() => {
                  setFormState({
                    ...FormState,
                    peopleNames: [...FormState?.peopleNames, ''],
                  });
                }}
              >
                New
              </Button>
            </div>
          </Paper>
        </>
      )}
    </>
  );
}

export default PeopleNames;

import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Dialog, DialogContent } from '@mui/material';
import { RootState } from '@src/store/store';
import { ErrorBtn, SuccessBtn } from '@src/styles/styledComponents';
import { useSelector } from 'react-redux';
function DeleteContainer() {
  const { showDeleteAlert } = useSelector((state: RootState) => state.App);
  return (
    <Dialog open={showDeleteAlert} id="deleteDialog" maxWidth={'xl'}>
      <DialogContent>
        <Box>
          <div className=" flex flex-col gap-5 items-center justify-center">
            <img src="/deleteAlert.svg" alt="" className=" max-h-[100px]" />

            <span className=" text-xl text-center flex flex-col gap-1 items-center justify-center">
              <span>
                Sind Sie sicher, dass Sie diese Elemente löschen möchten?
              </span>
            </span>
            <div className=" flex items-center justify-center gap-3">
              <SuccessBtn
                sx={{ minWidth: 90 }}
                startIcon={<CheckIcon />}
                id="deleteConfirm"
              >
                Ja
              </SuccessBtn>
              <ErrorBtn
                sx={{ minWidth: 90 }}
                startIcon={<CloseIcon />}
                id="deleteDecline"
              >
                NEIN
              </ErrorBtn>
            </div>
          </div>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteContainer;

import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Dialog, DialogContent } from '@mui/material';
import { RootState } from '@src/store/store';
import { ErrorBtn, SuccessBtn } from '@src/styles/styledComponents';
import { useSelector } from 'react-redux';

function DashConfirmDialog({
  open,
  text,
  onConfirm,
  onReject,
  isLoading = false,
}: {
  open: boolean;
  text: string;
  onConfirm: () => void;
  onReject: () => void;
  isLoading?: boolean;
}) {
  return (
    <Dialog open={open} id="deleteDialog" maxWidth={'xl'}>
      <DialogContent>
        <Box>
          <div className=" flex flex-col gap-5 items-center justify-center">
            <img src="/quest.png" alt="" className=" max-h-[130px]" />

            <span className=" text-xl text-center flex flex-col gap-1 items-center justify-center">
              <span>{text}</span>
            </span>
            <div className=" flex items-center justify-center gap-3">
              <SuccessBtn
                loading={isLoading}
                onClick={() => onConfirm()}
                sx={{ minWidth: 90 }}
                startIcon={<CheckIcon />}
                id="deleteConfirm"
              >
                Ja
              </SuccessBtn>
              <ErrorBtn
                onClick={() => onReject()}
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

export default DashConfirmDialog;

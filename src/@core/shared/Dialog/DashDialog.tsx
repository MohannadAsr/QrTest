import { IconButton, Paper } from '@mui/material';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import MuiIcon from '@src/@core/components/MuiIcon';
function DashDialog({
  open,
  handleClose,
  title,
  body,
}: {
  body: JSX.Element;
  open: boolean;
  handleClose: () => any;
  title?: string | JSX.Element;
}) {
  return (
    <Dialog maxWidth={'md'} fullWidth open={open} component={'div'}>
      <Paper
        elevation={0}
        className={` flex items-center justify-between px-3 ${
          !title && 'py-2'
        } `}
      >
        <DialogTitle sx={{ fontSize: 14 }}>{title}</DialogTitle>
        <IconButton onClick={handleClose}>
          <MuiIcon name="Close" />
        </IconButton>
      </Paper>
      <Paper elevation={4} className=" p-4">
        <Box>
          <div className=" mt-3">{body}</div>
        </Box>
      </Paper>
    </Dialog>
  );
}

export default DashDialog;

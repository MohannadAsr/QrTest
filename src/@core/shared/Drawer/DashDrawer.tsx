import { Box, Divider, Drawer, IconButton, Paper } from '@mui/material';
import MuiIcon from '@src/@core/components/MuiIcon';
import React, { ReactNode } from 'react';

function DashDrawer({
  open,
  title,
  onClose,
  body,
  actions,
}: {
  onClose: () => void;
  open: boolean;
  title: string | ReactNode;
  body?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <>
      <Drawer elevation={0} anchor="bottom" open={open}>
        <Box
          sx={{
            maxHeight: '100vh',
            height: '100vh',
            padding: 0,
            overflow: 'hidden',
          }}
        >
          <Paper
            elevation={0}
            className=" flex items-center justify-between  md:py-2 px-1  md:px-5  sticky top-0 z-[99999] py-2 "
          >
            <p className=" font-semibold text-7 text-primary ">{title}</p>
            <IconButton onClick={onClose}>
              <MuiIcon name="Close" />
            </IconButton>
          </Paper>
          <Divider />
          <div className={` overflow-auto p-1 md:p-5  h-[90vh]  min-h-[80vh]`}>
            {body}
          </div>
          {actions && (
            <Paper className=" flex items-center justify-end px-5 gap-6 py-2 shadow-xl">
              {actions}
            </Paper>
          )}
        </Box>
      </Drawer>
    </>
  );
}

export default DashDrawer;

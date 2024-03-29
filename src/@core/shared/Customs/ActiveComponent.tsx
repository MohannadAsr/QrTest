import { Chip } from '@mui/material';
import { lightTheme } from '@src/@core/Providers/DashThemeProvider';
import { useCustomHooks } from '@src/hooks/useCustomHooks';
import DashConfirmDialog from '../Dialog/DashConfirmDialog';
import React from 'react';
import CustomChip from './CustomChip';

const ActiveComponent = ({
  isActive,
  onAction = null,
  isLoading = false,
  text = 'Sind Sie sicher, dass Sie den Status ändern möchten?',
}: {
  isActive: boolean;
  onAction?: () => void;
  isLoading?: boolean;
  text?: string;
}) => {
  const { hexToRgbaString } = useCustomHooks();
  const [open, setOpen] = React.useState<boolean>(false);

  const handleConfirm = () => {
    if (onAction) {
      onAction();
    }
  };

  React.useEffect(() => {
    if (isLoading == false) {
      setOpen(false);
    }
  }, [isLoading]);

  return (
    <>
      <DashConfirmDialog
        open={open}
        onConfirm={handleConfirm}
        onReject={() => setOpen(false)}
        isLoading={isLoading}
        text={text}
      />
      {isActive ? (
        <span
          className={`${onAction && 'cursor-pointer'}`}
          onClick={() => setOpen(true)}
        >
          <CustomChip
            Customcolor={lightTheme.palette.primary.main}
            label="Active"
          />
        </span>
      ) : (
        <span
          className={`${onAction && 'cursor-pointer'}`}
          onClick={() => setOpen(true)}
        >
          <CustomChip
            Customcolor={lightTheme.palette.error.main}
            label="Not Active"
          />
        </span>
      )}
    </>
  );
};
export default ActiveComponent;

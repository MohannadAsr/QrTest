import { Chip, ChipOwnProps } from '@mui/material';
import { useCustomHooks } from '@src/hooks/useCustomHooks';
import React from 'react';

function CustomChip({
  Customcolor,
  ...ChipProps
}: { Customcolor: string } & ChipOwnProps) {
  const { hexToRgbaString } = useCustomHooks();
  return (
    <Chip
      {...ChipProps}
      color="primary"
      sx={{
        color: Customcolor,
        fontWeight: 800,
        fontSize: 11,
        ':active': {
          backgroundColor: `${hexToRgbaString(Customcolor, 0.9)}`,
          color: '#fff',
        },
        ':hover': {
          backgroundColor: `${hexToRgbaString(Customcolor, 0.9)}`,
          color: '#fff',
        },

        backgroundColor: `${hexToRgbaString(Customcolor, 0.2)}`,
      }}
    />
  );
}

export default CustomChip;

// CustomIcon.js
import * as MUIIcons from '@mui/icons-material';
import { IconProps, SxProps } from '@mui/material';
import { CommonProps } from '@mui/material/OverridableComponent';

export type MUIIconName = keyof typeof MUIIcons;

const MuiIcon = ({
  name,
  color,
  className,
  sx,
  ...rest
}: {
  name: MUIIconName;
  color?:
    | 'inherit'
    | 'disabled'
    | 'action'
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning';
  sx?: SxProps;
  className?: CommonProps['className'];
}) => {
  const IconComponent = MUIIcons[name];

  if (!IconComponent) {
    console.error(`Invalid icon name: ${name}`);
    return null;
  }
  return (
    <IconComponent
      color={color || 'inherit'}
      className={className || ''}
      {...rest}
      sx={sx || null}
    />
  );
};

export default MuiIcon;

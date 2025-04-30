import { Box, SvgIconProps } from '@mui/material';
import { ComponentType } from 'react';

type Props = {
  Icon: ComponentType<SvgIconProps>;
} & SvgIconProps;

export function FlashingIcon(props: Props) {
  const { Icon, ...rest } = props;

  return (
    <Box
      sx={({ transitions }) => ({
        display: 'flex',
        '@keyframes flashing': {
          '0%': {
            opacity: 0,
          },
          '50%': {
            opacity: 1,
          },
          '100%': {
            opacity: 0,
          },
        },
        animation: `flashing 1200ms ${transitions.easing.easeInOut} infinite`,
      })}
    >
      <Icon {...rest} />
    </Box>
  );
}

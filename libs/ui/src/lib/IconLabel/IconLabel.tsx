import { Box, Stack, Typography } from '@mui/material';
import { ComponentType } from 'react';

export enum Size {
  Small = 'small',
  Medium = 'medium',
}

type Props = {
  Icon: ComponentType<{ fontSize?: Size }>;
  label: string;
  size?: Size;
};

export function IconLabel(props: Props) {
  const { Icon, label, size = Size.Medium } = props;

  return (
    <Stack
      alignItems="center"
      direction="row"
      spacing={size === Size.Medium ? 1.5 : 1}
    >
      <Box color="text.primary" display="flex">
        <Icon fontSize={size} />
      </Box>
      <Typography variant={size === Size.Medium ? 'body1' : 'body2'}>
        {label}
      </Typography>
    </Stack>
  );
}

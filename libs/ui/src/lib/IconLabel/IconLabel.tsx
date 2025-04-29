import { Stack, Typography } from '@mui/material';
import { ReactNode } from 'react';

type Props = {
  icon: ReactNode;
  label: string;
};

export function IconLabel(props: Props) {
  const { icon, label } = props;

  return (
    <Stack alignItems="center" direction="row" spacing={1.5}>
      {icon}
      <Typography variant="body1">{label}</Typography>
    </Stack>
  );
}

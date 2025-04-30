import { DialogTitle, IconButton, Stack, Typography } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { useDispatch } from 'react-redux';
import { closeCurrentDialog } from '@talk-to-agent/store';
import { useEffect, useState } from 'react';
import { Call } from '@talk-to-agent/assets';

type Props = {
  startTime: Dayjs;
};

export function DialogHeader(props: Props) {
  const { startTime } = props;

  const dispatch = useDispatch();
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setSeconds(Math.abs(startTime.diff(dayjs(), 's'))),
      1000
    );

    return () => clearInterval(interval);
  }, [startTime]);

  return (
    <Stack alignItems="center" direction="row" gap={3} p={3}>
      <Stack flexGrow={1} gap={0.5}>
        <DialogTitle id="dialog-title" sx={{ p: 0 }}>
          Calling Jessica
        </DialogTitle>
        <Typography>{dayjs.duration(seconds, 's').format('mm:ss')}</Typography>
      </Stack>
      <IconButton
        aria-label="close"
        color="error"
        onClick={() => dispatch(closeCurrentDialog())}
      >
        <Call />
      </IconButton>
    </Stack>
  );
}

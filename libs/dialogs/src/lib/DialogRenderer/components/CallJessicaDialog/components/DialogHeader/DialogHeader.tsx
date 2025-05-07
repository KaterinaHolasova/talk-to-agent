import { DialogTitle, IconButton, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { closeCurrentDialog, RootState } from '@talk-to-agent/store';
import { useEffect, useState } from 'react';
import { Call } from '@talk-to-agent/assets';

export function DialogHeader() {
  const dispatch = useDispatch();
  const startTime = useSelector(({ call }: RootState) => dayjs(call.startTime));
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!startTime) return;

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

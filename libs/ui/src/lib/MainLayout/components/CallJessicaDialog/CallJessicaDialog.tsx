import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { closeCurrentDialog } from '@talk-to-agent/store';
import { Call } from '@talk-to-agent/assets';

export function CallJessicaDialog() {
  const dispatch = useDispatch();

  return (
    <Dialog
      aria-labelledby="dialog-title"
      maxWidth="xs"
      onClose={() => dispatch(closeCurrentDialog())}
      open
    >
      <Stack alignItems="center" direction="row" gap={3} p={3}>
        <DialogTitle id="dialog-title" sx={{ p: 0, flexGrow: 1 }}>
          Calling Jessica
        </DialogTitle>
        <IconButton
          aria-label="close"
          color="error"
          onClick={() => dispatch(closeCurrentDialog())}
        >
          <Call />
        </IconButton>
      </Stack>
      <DialogContent>wavesurfer</DialogContent>
    </Dialog>
  );
}

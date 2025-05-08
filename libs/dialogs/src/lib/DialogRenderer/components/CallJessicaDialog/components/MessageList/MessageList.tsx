import { Box, Stack } from '@mui/material';
import { MessageWaveform } from '../MessageWaveform';
import { Message } from '../../types';

type Props = {
  messages: Message[];
};
export function MessageList(props: Props) {
  const { messages } = props;

  return (
    <Box
      sx={({ palette, spacing }) => ({
        position: 'relative',
        mb: -3,
        '&::after': {
          content: '""',
          position: 'absolute',
          zIndex: 5,
          bottom: 0,
          left: 0,
          right: 0,
          height: spacing(3),
          backgroundImage: `linear-gradient(transparent, ${palette.background.default})`,
        },
      })}
    >
      <Box sx={{ overflowY: 'auto', maxHeight: '240px', pb: 3 }}>
        <Stack gap={2}>
          {messages.map((item, index) => (
            <MessageWaveform
              isLast={index + 1 === messages.length}
              key={item.time.toString()}
              {...item}
            />
          ))}
        </Stack>
      </Box>
    </Box>
  );
}

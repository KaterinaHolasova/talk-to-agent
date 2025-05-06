import { Box, Stack } from '@mui/material';
import { MessageWaveform, MessageWaveformSpeaker } from '../MessageWaveform';
import { Dayjs } from 'dayjs';

type Message = {
  audio: Blob;
  speaker: MessageWaveformSpeaker;
  time: Dayjs;
};

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
          width: '100%',
          height: spacing(3),
          backgroundImage: `linear-gradient(transparent, ${palette.background.default})`,
        },
      })}
    >
      <Box sx={{ overflowY: 'auto', maxHeight: '240px', pb: 3 }}>
        <Stack gap={2}>
          {messages.map(({ audio, speaker, time }, index) => (
            <MessageWaveform
              audio={audio}
              isLast={index + 1 === messages.length}
              key={time.toString()}
              speaker={speaker}
              time={time}
            />
          ))}
        </Stack>
      </Box>
    </Box>
  );
}

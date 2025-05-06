import { Box } from '@mui/material';
import { RiPhoneLine } from '@remixicon/react';

export function CallLoader() {
  return (
    <Box
      sx={({ palette, transitions }) => ({
        '@keyframes pulse': {
          '0%': {
            transform: `scale(1)`,
            opacity: 1,
          },
          '100%': {
            transform: `scale(1.8)`,
            opacity: 0,
          },
        },
        position: 'relative',
        zIndex: 5,
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        borderRadius: 24,
        width: 48,
        height: 48,
        p: 1,
        backgroundColor: palette.primary.main,
        '&::before': {
          content: '""',
          position: 'absolute',
          zIndex: -5,
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          animation: `pulse 1200ms ${transitions.easing.easeInOut} infinite`,
          borderRadius: 24,
          backgroundColor: palette.primary.main,
        },
      })}
    >
      <RiPhoneLine />
    </Box>
  );
}

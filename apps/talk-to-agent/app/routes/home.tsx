import { Box, Stack, Typography } from '@mui/material';
import { ChartLineUp, Coins, ShieldCheck } from '@talk-to-agent/assets';
import { IconLabel } from '@talk-to-agent/ui';

export default function Home() {
  return (
    <>
      <Box mb={[6, 8, 12, 18]}>
        <Typography variant="h1" gutterBottom>
          Solving problems.
          <br />
          Thousands at a&nbsp;time.
        </Typography>
        <Typography>
          It is a&nbsp;long <strong>established fact that a&nbsp;reader</strong>{' '}
          will be distracted by the readable content of a&nbsp;page when looking
          at its layout. The point of using Lorem Ipsum is that it has
          a&nbsp;more-or-less normal <strong>distribution of letters</strong>,
          as opposed to using 'Content here, content here', making it look like
          readable English.
        </Typography>
      </Box>
      <Stack
        direction={{ md: 'row' }}
        flexWrap="wrap"
        gap={{ xs: 3, md: 5 }}
        justifyContent={{ lg: 'space-between' }}
      >
        <IconLabel icon={<Coins />} label="Reduce costs by 40%." />
        <IconLabel
          icon={<ChartLineUp />}
          label="Increase customer satisfaction by 30%."
        />
        <IconLabel icon={<ShieldCheck />} label="Trusted by those you know." />
      </Stack>
    </>
  );
}

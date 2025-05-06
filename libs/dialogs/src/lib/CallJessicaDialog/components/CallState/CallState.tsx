import { useSelector } from 'react-redux';
import { IconLabel, IconLabelSize } from '../../../../../IconLabel';
import { RootState } from '@talk-to-agent/store';
import { FlashingMic, FlashingVolumeUp } from '@talk-to-agent/assets';
import { Typography } from '@mui/material';

type Props = {
  dialing?: boolean;
};

export function CallState(props: Props) {
  const { dialing } = props;

  const activeResponse = useSelector(
    ({ call }: RootState) => call.activeResponse
  );

  const getIcon = () => {
    if (dialing) {
      return null;
    } else if (activeResponse) {
      return FlashingVolumeUp;
    }

    return FlashingMic;
  };

  const getLabel = () => {
    if (dialing) {
      return 'Dialing...';
    } else if (activeResponse) {
      return 'Jessica speaking...';
    }

    return 'Listening...';
  };

  const icon = getIcon();
  const label = getLabel();

  if (icon) {
    return <IconLabel Icon={icon} label={label} size={IconLabelSize.Small} />;
  } else {
    return <Typography variant="body2">{label}</Typography>;
  }
}

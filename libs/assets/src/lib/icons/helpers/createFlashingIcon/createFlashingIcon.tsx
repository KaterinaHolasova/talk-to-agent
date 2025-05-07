import { ComponentType } from 'react';
import { SvgIconProps } from '@mui/material';
import { FlashingIcon } from '../../components';

export function createFlashingIcon(Icon: ComponentType<SvgIconProps>) {
  return (props: SvgIconProps) => <FlashingIcon Icon={Icon} {...props} />;
}

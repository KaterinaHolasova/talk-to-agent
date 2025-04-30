import { createSvgIcon } from '@mui/material/utils';
import { RiMenu2Line } from '@remixicon/react';
import { RiMicLine } from '@remixicon/react';
import { ReactComponent as CallSvg } from './Call.svg';
import { ReactComponent as ChartLineUpSvg } from './ChartLineUp.svg';
import { ReactComponent as CoinsSvg } from './Coins.svg';
import { ReactComponent as ShieldCheckSvg } from './ShieldCheck.svg';
import { createFlashingIcon } from './createFlashingIcon';

export const Call = createSvgIcon(<CallSvg />, 'Call');
export const ChartLineUp = createSvgIcon(<ChartLineUpSvg />, 'ChartLineUp');
export const Coins = createSvgIcon(<CoinsSvg />, 'Coins');
export const Menu = createSvgIcon(<RiMenu2Line />, 'Menu');
export const Mic = createSvgIcon(<RiMicLine />, 'Mic');
export const ShieldCheck = createSvgIcon(<ShieldCheckSvg />, 'ShieldCheck');

export const FlashingMic = createFlashingIcon(Mic);

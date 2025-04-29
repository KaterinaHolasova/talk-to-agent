import { createSvgIcon } from '@mui/material/utils';
import { ReactComponent as CallSvg } from './Call.svg';
import { ReactComponent as ChartLineUpSvg } from './ChartLineUp.svg';
import { ReactComponent as CoinsSvg } from './Coins.svg';
import { ReactComponent as ShieldCheckSvg } from './ShieldCheck.svg';

export const Call = createSvgIcon(<CallSvg />, 'Call');
export const ChartLineUp = createSvgIcon(<ChartLineUpSvg />, 'ChartLineUp');
export const Coins = createSvgIcon(<CoinsSvg />, 'Coins');
export const ShieldCheck = createSvgIcon(<ShieldCheckSvg />, 'ShieldCheck');

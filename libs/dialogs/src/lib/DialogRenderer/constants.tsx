import { ReactElement } from 'react';
import { CallJessicaDialog } from './components';
import { DialogComponent } from '@talk-to-agent/store';

export const COMPONENT: Record<DialogComponent, ReactElement> = {
  callJessica: <CallJessicaDialog />,
};

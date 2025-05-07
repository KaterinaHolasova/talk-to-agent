import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '../store';

type Props = {
  children: ReactNode;
};

export function StoreProvider(props: Props) {
  const { children } = props;

  return <Provider store={store}>{children}</Provider>;
}

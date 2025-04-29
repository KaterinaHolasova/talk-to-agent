import { ReactNode } from 'react';
import { Provider, useSelector } from 'react-redux';
import { type RootState, store } from '../store';

type Props = {
  children: ReactNode;
};

export function StoreProvider(props: Props) {
  const { children } = props;

  const dialog = useSelector(({ dialog }: RootState) => dialog.value);

  return (
    <Provider store={store}>
      {children}
      {dialog}
    </Provider>
  );
}

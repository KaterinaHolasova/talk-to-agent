import { useSelector } from 'react-redux';
import { COMPONENT } from './constants';
import { RootState } from '@talk-to-agent/store';

export function DialogRenderer() {
  const dialog = useSelector(({ dialog }: RootState) =>
    dialog.component ? COMPONENT[dialog.component] : null
  );

  return dialog;
}

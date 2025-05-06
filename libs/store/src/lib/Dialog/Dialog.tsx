import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { DIALOG_COMPONENT } from './constants';

export function Dialog() {
  const dialog = useSelector(({ dialog }: RootState) =>
    dialog.component ? DIALOG_COMPONENT[dialog.component] : null
  );

  return dialog;
}

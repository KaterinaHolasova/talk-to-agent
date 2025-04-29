import { useSelector } from 'react-redux';
import { RootState } from '../store';

export function Dialog() {
  const dialog = useSelector(({ dialog }: RootState) => dialog.value);

  return dialog;
}

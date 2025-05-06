import { render } from '@testing-library/react';

import Dialogs from './dialogs';

describe('Dialogs', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Dialogs />);
    expect(baseElement).toBeTruthy();
  });
});

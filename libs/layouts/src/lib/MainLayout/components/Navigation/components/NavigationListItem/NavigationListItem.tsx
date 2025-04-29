import { ListItem, ListItemButton, ListItemText } from '@mui/material';
import { NavLink, useMatch } from 'react-router';

type Props = {
  closeDrawer?: () => void;
  label: string;
  to: string;
};

export function NavigationListItem(props: Props) {
  const { closeDrawer, label, to } = props;

  const pathMatch = useMatch(to);

  return (
    <ListItem disablePadding key={to}>
      <ListItemButton
        component={NavLink}
        onClick={closeDrawer}
        selected={!!pathMatch}
        to={to}
      >
        <ListItemText
          primary={label}
          slotProps={{ primary: { variant: 'body2' } }}
        />
      </ListItemButton>
    </ListItem>
  );
}

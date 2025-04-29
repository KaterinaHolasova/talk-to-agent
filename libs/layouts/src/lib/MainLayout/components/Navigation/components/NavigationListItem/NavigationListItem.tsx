import { ListItem, ListItemButton, ListItemText } from '@mui/material';
import { NavLink, useMatch } from 'react-router';

type Props = {
  label: string;
  to: string;
};

export function NavigationListItem(props: Props) {
  const { label, to } = props;

  const isActive = useMatch(to);

  return (
    <ListItem disablePadding key={to}>
      <ListItemButton component={NavLink} selected={!!isActive} to={to}>
        <ListItemText primary={label} />
      </ListItemButton>
    </ListItem>
  );
}

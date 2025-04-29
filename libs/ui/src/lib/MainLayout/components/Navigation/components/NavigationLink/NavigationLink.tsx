import { Link } from '@mui/material';
import { NavLink, useMatch } from 'react-router';

type Props = {
  label: string;
  to: string;
};

export function NavigationLink(props: Props) {
  const { label, to } = props;

  const pathMatch = useMatch(to);

  return (
    <Link
      component={NavLink}
      to={to}
      underline={pathMatch ? 'always' : 'hover'}
      variant="body2"
    >
      {label}
    </Link>
  );
}

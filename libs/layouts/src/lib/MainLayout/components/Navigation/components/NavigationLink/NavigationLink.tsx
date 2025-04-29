import { Link } from '@mui/material';
import { NavLink, useMatch } from 'react-router';

type Props = {
  label: string;
  to: string;
};

export function NavigationLink(props: Props) {
  const { label, to } = props;

  const isActive = useMatch(to);

  return (
    <Link
      component={NavLink}
      to={to}
      underline={isActive ? 'always' : 'hover'}
      variant="body1"
    >
      {label}
    </Link>
  );
}

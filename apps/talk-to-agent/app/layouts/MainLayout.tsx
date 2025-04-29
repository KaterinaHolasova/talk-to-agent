import { MainLayout as Layout } from '@talk-to-agent/ui';
import { Outlet } from 'react-router';

export default function MainLayout() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}

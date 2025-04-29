import { MainLayout as Layout } from '@talk-to-agent/layouts';
import { Outlet } from 'react-router';

export default function MainLayout() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}

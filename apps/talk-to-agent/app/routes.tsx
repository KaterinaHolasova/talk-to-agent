import {
  type RouteConfig,
  index,
  layout,
  route,
} from '@react-router/dev/routes';

export default [
  layout('./layouts/mainLayout.tsx', [
    index('./routes/home.tsx'),
    route('account', './routes/account.tsx'),
    route('help', './routes/help.tsx'),
    route('organization', './routes/organization.tsx'),
    route('products', './routes/products.tsx'),
  ]),
] satisfies RouteConfig;

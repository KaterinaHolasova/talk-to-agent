import { ThemeProvider } from '@talk-to-agent/theme';
import { ReactNode } from 'react';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  type MetaFunction,
} from 'react-router';
import { StoreProvider } from '@talk-to-agent/store';

type Props = {
  children: ReactNode;
};

export const meta: MetaFunction = () => [
  {
    title: 'Talk to Agent',
  },
];

export function Layout(props: Props) {
  const { children } = props;

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <ThemeProvider>
          <StoreProvider>{children}</StoreProvider>
        </ThemeProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

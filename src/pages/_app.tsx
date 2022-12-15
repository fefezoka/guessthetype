import type { AppProps } from 'next/app';
import { QueryClientProvider, QueryClient } from 'react-query';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';
import '../styles/global.css';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps<{ session: Session }>) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    </QueryClientProvider>
  );
}

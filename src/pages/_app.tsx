import type { AppProps } from 'next/app';
import { QueryClientProvider, QueryClient } from 'react-query';
import { global } from '../styles/global';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  global();
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

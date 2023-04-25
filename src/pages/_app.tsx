import type { AppProps } from 'next/app';
import { QueryClientProvider, QueryClient } from 'react-query';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';
import { DefaultSeo } from 'next-seo';
import ogimage from '../assets/ogimage.jpg';
import { trpc } from '../utils/trpc';
import { global } from '@styles';

const queryClient = new QueryClient();

function App({ Component, pageProps }: AppProps<{ session: Session }>) {
  global();

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={pageProps.session}>
        <DefaultSeo
          title="Guess the Type"
          openGraph={{
            images: [{ url: ogimage.src }],
            siteName: 'Guess the Type',
            description: 'Joga ai',
            url: 'https://guessthetype.vercel.app',
            type: 'website',
          }}
          twitter={{ cardType: 'summary_large_image' }}
          additionalMetaTags={[{ name: 'theme-color', content: '#dc8cfe' }]}
        />
        <Component {...pageProps} />
      </SessionProvider>
    </QueryClientProvider>
  );
}

export default trpc.withTRPC(App);

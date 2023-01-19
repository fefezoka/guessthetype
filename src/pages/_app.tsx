import type { AppProps } from 'next/app';
import { QueryClientProvider, QueryClient } from 'react-query';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';
import '../styles/global.css';
import { DefaultSeo } from 'next-seo';
import ogimage from '../assets/ogimage.jpg';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps<{ session: Session }>) {
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

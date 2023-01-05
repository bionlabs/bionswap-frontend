import '../../styles/globals.css';
import Toast from 'components/Toast';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { useEffect } from 'react';
import { ListsUpdater } from 'state/lists/updater';
import { MulticallUpdater } from 'state/multicall/updater';
import { exception, GOOGLE_ANALYTICS_TRACKING_ID, pageview } from 'utils/gtag';
import Footer from 'views/Footer';
import Menu from 'views/Menu';
import NextNProgress from 'nextjs-progressbar';
import Provider from './Provider';
import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
// Import Swiper styles
import 'swiper/css';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter();
  const { locale, events } = router;
  const getLayout = Component.getLayout ?? ((page) => page);

  useEffect(() => {
    // @ts-ignore TYPE NEEDS FIXING
    const handleRouteChange = (url) => {
      pageview(url);
    };
    events.on('routeChangeComplete', handleRouteChange);

    // @ts-ignore TYPE NEEDS FIXING
    const handleError = (error) => {
      exception({
        description: `${error.message} @ ${error.filename}:${error.lineno}:${error.colno}`,
        fatal: true,
      });
    };

    window.addEventListener('error', handleError);

    return () => {
      events.off('routeChangeComplete', handleRouteChange);
      window.removeEventListener('error', handleError);
    };
  }, [events]);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>BionSwap - Multichain Decentralized Trading Platform and Automation Launchpad</title>
      </Head>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GOOGLE_ANALYTICS_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <Provider>
        <Menu>
          <MulticallUpdater />
          <ListsUpdater />
          <Toast />
          <NextNProgress color="#3671E9" stopDelayMs={500} height={3} options={{ easing: 'ease', speed: 1000 }} />
          {getLayout(<Component {...pageProps} />)}
          <Footer />
        </Menu>
      </Provider>
    </>
  );
}

export default MyApp;

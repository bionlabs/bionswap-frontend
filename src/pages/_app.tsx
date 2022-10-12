import { ThemeProvider } from '@mui/material';
import { AuthProvider, BlockNumberProvider } from 'components';
import Toast from 'components/Toast';
import { getTheme } from 'configs/theme';
import { useDarkMode } from 'hooks';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { useEffect } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from 'state';
import { ListsUpdater } from 'state/lists/updater';
import { MulticallUpdater } from 'state/multicall/updater';
import { exception, GOOGLE_ANALYTICS_TRACKING_ID, pageview } from 'utils/gtag';
import Footer from 'views/Footer';
import Menu from 'views/Menu';
import { WagmiConfig } from 'wagmi';
import '../../styles/globals.css';
import { client } from '../configs/chain';

type StyledThemeProviderProps = {
  children: React.ReactElement;
};
const StyledThemeProvider = ({ children }: StyledThemeProviderProps) => {
  const { darkMode } = useDarkMode();

  const theme = getTheme(darkMode ? 'dark' : 'light');
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { locale, events } = router;

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
      <Head>BionSwap</Head>

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

      <WagmiConfig client={client}>
        <ReduxProvider store={store}>
          <PersistGate persistor={persistor}>
            <AuthProvider>
              <StyledThemeProvider>
                <BlockNumberProvider>
                  <Menu>
                    <MulticallUpdater />
                    <ListsUpdater />
                    <Toast />
                    <Component {...pageProps} />
                    <Footer />
                  </Menu>
                </BlockNumberProvider>
              </StyledThemeProvider>
            </AuthProvider>
          </PersistGate>
        </ReduxProvider>
      </WagmiConfig>
    </>
  );
}

export default MyApp;

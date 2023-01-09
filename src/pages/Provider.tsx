import React from 'react'
import { WagmiConfig } from 'wagmi';
import { CookiesProvider } from 'react-cookie';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { AuthProvider, BlockNumberProvider } from 'components';
import { ThemeProvider } from '@mui/material';
import { useDarkMode } from 'hooks';
import { getTheme } from 'configs/theme';
import { client } from 'configs/chain';
import { persistor, store } from 'state';


type StyledThemeProviderProps = {
    children: React.ReactElement;
  };
  const StyledThemeProvider = ({ children }: StyledThemeProviderProps) => {
    const { darkMode } = useDarkMode();
  
    const theme = getTheme(darkMode ? 'dark' : 'light');
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
  };

const Provider = ({children}:any) => {
  return (
    <WagmiConfig client={client}>
        <ReduxProvider store={store}>
            <PersistGate persistor={persistor}>
              <CookiesProvider>
                <AuthProvider>
                      <StyledThemeProvider>
                          <BlockNumberProvider>
                              {children}
                          </BlockNumberProvider>
                      </StyledThemeProvider>
                  </AuthProvider>
              </CookiesProvider>
            </PersistGate>
        </ReduxProvider>
    </WagmiConfig>
  )
}

export default Provider
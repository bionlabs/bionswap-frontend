import { ThemeProvider } from "@mui/material";
import { BlockNumberProvider } from "components";
import { getTheme } from "configs/theme";
import { useDarkMode } from "hooks";
import type { AppProps } from "next/app";
import { Provider as ReduxProvider } from "react-redux";
import { persistor, store } from "state";
import { ListsUpdater } from "state/lists/updater";
import { MulticallUpdater } from "state/multicall/updater";
import Footer from "views/Footer";
import Menu from "views/Menu";
import { WagmiConfig } from "wagmi";
import "../../styles/globals.css";
import { client } from "../configs/chain";
import { PersistGate } from "redux-persist/integration/react";

type StyledThemeProviderProps = {
  children: React.ReactElement;
};
const StyledThemeProvider = ({ children }: StyledThemeProviderProps) => {
  const { darkMode } = useDarkMode();

  const theme = getTheme(darkMode ? "dark" : "light");
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={client}>
      <ReduxProvider store={store}>
        <PersistGate persistor={persistor}>
          <StyledThemeProvider>
            <BlockNumberProvider>
              <Menu>
                <MulticallUpdater />
                <ListsUpdater />
                <Component {...pageProps} />
                <Footer />
              </Menu>
            </BlockNumberProvider>
          </StyledThemeProvider>
        </PersistGate>
      </ReduxProvider>
    </WagmiConfig>
  );
}

export default MyApp;

import { ThemeProvider } from "@mui/material";
import { getTheme } from "configs/theme";
import { useDarkMode } from "hooks";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "state";
import Footer from "views/Footer";
import Menu from "views/Menu";
import { WagmiConfig } from "wagmi";
import "../../styles/globals.css";
import { client } from "../configs/chain";

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
      <Provider store={store}>
        <StyledThemeProvider>
          <Menu>
            <Component {...pageProps} />
            <Footer />
          </Menu>
        </StyledThemeProvider>
      </Provider>
    </WagmiConfig>
  );
}

export default MyApp;
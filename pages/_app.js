import "../styles/globals.css";
import "tailwindcss/tailwind.css";

import { GlobalStyle } from "../styles/globalStyle";
import Layout from "../components/main/Layout";
import React from "react";
import { ThemeProvider } from "styled-components";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { theme } from "../styles/theme";
import { useState } from "react";

library.add(fas, fab, far);
const SetThemeContext = React.createContext();

function MyApp({ Component, pageProps }) {
  const [currentTheme, setCurrentTheme] = useState("light");
  return (
    <SetThemeContext.Provider value={{ currentTheme, setCurrentTheme }}>
      <ThemeProvider theme={theme[currentTheme]}>
        <GlobalStyle />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </SetThemeContext.Provider>
  );
}

export { SetThemeContext };
export default MyApp;

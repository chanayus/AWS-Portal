import "../styles/globals.css";
import "tailwindcss/tailwind.css";

import { AnimatePresence, motion } from "framer-motion";
import { dark, light } from "../styles/theme";
import { useEffect, useState } from "react";

import { GlobalStyle } from "../styles/globalStyle";
import Layout from "../components/main/Layout";
import React from "react";
import { ThemeProvider } from "styled-components";
import storage from "local-storage-fallback";

const SetThemeContext = React.createContext();

const getLocalTheme = () => {
  return storage.getItem("theme") ? storage.getItem("theme") : "light";
};

function MyApp({ Component, pageProps, router }) {
  const [currentTheme, setCurrentTheme] = useState(getLocalTheme);
  const [mounted, setMounted] = useState(false);
  const themeHandle = (value) => {
    storage.setItem("theme", value);
    setCurrentTheme(value);
  };
  useEffect(() => {
    setMounted(true);
  }, []);
  if (mounted) {
    return (
      <SetThemeContext.Provider value={{ currentTheme, themeHandle }}>
        <ThemeProvider theme={currentTheme === "light" ? light : dark}>
          <GlobalStyle />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </SetThemeContext.Provider>
    );
  } else {
    return <></>;
  }
}

export { SetThemeContext };
export default MyApp;

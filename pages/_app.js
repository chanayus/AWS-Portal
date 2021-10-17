import "../styles/globals.css";
import "tailwindcss/tailwind.css";

import { dark, light } from "../styles/theme";
import { useEffect, useState } from "react";

import { GlobalStyle } from "../styles/globalStyle";
import Layout from "../components/main/Layout";
import React from "react";
import { ThemeProvider } from "styled-components";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { motion } from "framer-motion";
import storage from "local-storage-fallback";
import { theme } from "../styles/theme";

library.add(fas, fab, far);
const SetThemeContext = React.createContext();

const getLocalTheme = () => { 
  return storage.getItem("theme") ? storage.getItem("theme") : "light";
};

function MyApp({ Component, pageProps, router }) {
  const [currentTheme, setCurrentTheme] = useState(getLocalTheme);
  const [mounted, setMounted] = useState(false)
  const themeHandle = (value) => {
    storage.setItem("theme", value);
    setCurrentTheme(value);
  };
  console.log(currentTheme);
  useEffect(() => {
    setMounted(true)
  }, [])
  if (mounted) {
    return (
      <SetThemeContext.Provider value={{ currentTheme, themeHandle }}>
        <ThemeProvider theme={currentTheme === "light" ? light : dark}>
          <GlobalStyle />
          <Layout>
            <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }} key={router.route}>
              <Component {...pageProps} />
            </motion.div>
          </Layout>
        </ThemeProvider>
      </SetThemeContext.Provider>
    );
  }
  else{
    return <></>
  }
}

// MyApp.getInitialProps = () =>{
//   console.log(storage.getItem('theme'))
//   return {LocalTheme: storage.getItem('theme') ? storage.getItem('theme') : "light"};
// }
export { SetThemeContext };
export default MyApp;

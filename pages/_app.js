import "../styles/globals.css";
import "tailwindcss/tailwind.css";

import { useEffect, useState } from "react";

import { GlobalStyle } from "../styles/globalStyle";
import Layout from "../components/main/Layout";
import React from "react";
import { ThemeProvider } from "styled-components";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import {motion} from "framer-motion"
import storage from 'local-storage-fallback'
import { theme } from "../styles/theme";
import { useLoaded } from "../lib/useLoaded"

library.add(fas, fab, far);
const SetThemeContext = React.createContext();

const getLocalTheme = () =>{
  return storage.getItem('theme') ? storage.getItem('theme') : "light";
}

function MyApp({ Component, pageProps, router }) {
  const [currentTheme, setCurrentTheme] = useState(getLocalTheme);
  const loaded = useLoaded
  const themeHandle = (value) => {
    storage.setItem("theme", value);
    setCurrentTheme(value)
  }
  console.log(currentTheme)
  return (
      loaded ? 
      <SetThemeContext.Provider value={{ currentTheme, themeHandle }}>
      <ThemeProvider theme={theme[currentTheme]}>
        <GlobalStyle />
        <Layout>
          <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }} key={router.route}>
            <Component {...pageProps} />
          </motion.div>
        </Layout>
      </ThemeProvider>
    </SetThemeContext.Provider>
    : null
    
  );
}

// MyApp.getInitialProps = () =>{
//   console.log(storage.getItem('theme'))
//   return {LocalTheme: storage.getItem('theme') ? storage.getItem('theme') : "light"};
// }
export { SetThemeContext };
export default MyApp;

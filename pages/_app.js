import "../styles/globals.css";
import "tailwindcss/tailwind.css";

import { ThemeProvider, createGlobalStyle } from "styled-components";

import Layout from "../components/main/Layout";
import React from "react";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { theme } from "../styles/theme";
import { useState } from "react";

library.add(fas, fab, far);
const SetThemeContext = React.createContext();

function MyApp({ Component, pageProps }) {
  const [currentTheme, setCurrentTheme] = useState("dark");

  const GlobalStyle = createGlobalStyle`
    *{
      box-sizing: border-box !important;
    }
    body {
      background:  ${(props) => props.theme.mainColor};
    }
    h1{
        font-size:clamp(40px,8vmin,45px);
        font-weight: 700;
    }
    p,h1,h2,h3,h4,h5,h6{
      color: ${(props) => props.theme.textColor};
    }
    a{
      text-align: center;
    }
    table{
      width: 100%;
      text-align: center;
      td, th{
        padding: 15px 0;
      }
      th{
        padding-top: 0;
      }
      thead{
        border-bottom: 2px solid #050505;
      }
      tbody{
        tr{
          border-bottom: 2px solid rgba(0,0,0,0.30);
        }
      }
    }
  `;
  return (
    <SetThemeContext.Provider value={{currentTheme, setCurrentTheme}}>
      <ThemeProvider theme={theme[currentTheme]}>
        <GlobalStyle />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </SetThemeContext.Provider>
  );
}

export {SetThemeContext};
export default MyApp;

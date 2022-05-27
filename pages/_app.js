import "../styles/globals.css"
import "tailwindcss/tailwind.css"

import { dark, light } from "../styles/theme"
import { useEffect, useState } from "react"

import { GlobalStyle } from "../styles/globalStyle"
import Head from "next/head"
import Layout from "../components/main/Layout"
import React from "react"
import { ThemeProvider } from "styled-components"
import fetch from "isomorphic-unfetch"
import storage from "local-storage-fallback"

const SetThemeContext = React.createContext()
const SetUserContext = React.createContext()

const getLocalTheme = () => {
  return storage.getItem("theme") ? storage.getItem("theme") : "light"
}

const getLocalUser = () => {
  return storage.getItem("user") ? storage.getItem("user") : { user: { _id: "1", username: "test" } }
}

function MyApp({ Component, pageProps, router }) {
  const [currentTheme, setCurrentTheme] = useState(getLocalTheme)
  const [user, setUser] = useState({ user: { _id: "1", username: "" } })
  const [mounted, setMounted] = useState(false)
  const themeHandle = (value) => {
    storage.setItem("theme", value)
    setCurrentTheme(value)
  }
  const userHandle = (value) => {
    storage.setItem("user", value)
    setUser(value)
  }
  const logCb = (value) => {
    console.log(value)
  }

  useEffect(() => {
    setMounted(true)
    if (user.user._id === "1") {
      let abortController = new AbortController()
      const url = "/api/get-profile"
      const fetchData = async () => {
        const response = await fetch(url, { signal: abortController.signal })
        if (response.status !== 200) {
          setUser({ user: { _id: "2", username: "" } })
        } else {
          const json = await response.json()
          setUser({ user: json.me })
        }
      }
      fetchData()
    }
  }, [])

  // useEffect(() => {
  //   if (user.user.id !== "1" && mounted === false){
  //     setMounted(true);
  //   }
  // }, [user])

  if (mounted) {
    return (
      <SetThemeContext.Provider value={{ currentTheme, themeHandle }}>
        <SetUserContext.Provider value={{ user, userHandle, getLocalUser }}>
          <ThemeProvider theme={currentTheme === "light" ? light : dark}>
            <Head>
              <meta property="og:description" key="description" content="Web Application for Resource Management and Cost Monitoring in AWS" />
              <meta property="og:title" content="AWS Portal" />
              <meta property="og:image" key="image" content="https://aws-portal.vercel.app/img_meta.jpg" />
              <meta property="og:image:type" content="image/jpg" />
              <meta property="og:image:width" content="1200" />
              <meta property="og:image:height" content="630" />
              <meta name="twitter:title" content="AWS Portal" />
              <meta name="twitter:card" content="summary_large_image" />
              <meta name="twitter:image" content="https://aws-portal.vercel.app/img_meta.jpg" />
              <meta name="twitter:description" content="Web Application for Resource Management and Cost Monitoring in AWS" />
            </Head>
            <GlobalStyle />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
        </SetUserContext.Provider>
      </SetThemeContext.Provider>
    )
  } else {
    return (
      <Head>
        <meta property="og:description" key="description" content="Web Application for Resource Management and Cost Monitoring in AWS" />
        <meta property="og:title" content="AWS Portal" />
        <meta property="og:image" key="image" content="https://aws-portal.vercel.app/img_meta.jpg" />
        <meta property="og:image:type" content="image/jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:title" content="AWS Portal" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://aws-portal.vercel.app/img_meta.jpg" />
        <meta name="twitter:description" content="Web Application for Resource Management and Cost Monitoring in AWS" />
      </Head>
    )
  }
}

export { SetThemeContext, SetUserContext }
export default MyApp

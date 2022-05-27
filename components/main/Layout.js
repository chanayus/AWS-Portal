import { AnimatePresence, motion } from "framer-motion"

import Head from "next/head"
import Logo from "../icon/Logo"
import Navbar from "./Navbar"
import { SetUserContext } from "../../pages/_app"
import Sidebar from "./Sidebar"
import styled from "styled-components"
import tw from "twin.macro"
import { useContext } from "react"
import { useRouter } from "next/router"

const Layout = ({ children }) => {
  const router = useRouter()
  const { user, getLocalUser } = useContext(SetUserContext)
  const excludePath = ["/login", "/_error", "/404"]
  const isHidden = excludePath?.find((value) => value === router.pathname)
  const isLogin = !user.user._id === "1"
  return (
    <>
      <Head>
        <title>AWS Portal</title>
        <meta property="og:description" content="Web Application for Resource Management and Cost Monitoring in AWS" />
        <meta property="og:title" content="AWS Portal" />
        <meta property="og:image" content="https://aws-portal.vercel.app/img_meta.jpg" />
        <meta property="og:image:type" content="image/jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:title" content="AWS Portal" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://aws-portal.vercel.app/img_meta.jpg" />
        <meta name="twitter:description" content="Web Application for Resource Management and Cost Monitoring in AWS" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Head>

      <div className="flex">
        <AnimatePresence exitBeforeEnter>
          {!isHidden && isLogin && (
            <>
              <Sidebar key="sidebar" />
              <Navbar key="navbar" />
            </>
          )}
        </AnimatePresence>
        <AnimatePresence exitBeforeEnter>
          {isHidden ? (
            <motion.div
              className="w-full"
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              key="exclude-path"
            >
              <>{children}</>
            </motion.div>
          ) : (
            <Content exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.175 }} key={router.pathname}>
              <div className="relative min-h-full mt-24 pb-24 ">
                {isLogin ? (
                  children
                ) : (
                  <Login className="fixed w-screen h-screen z-[99999] top-0 left-0 ">
                    <div className="w-full h-full backdrop-blur-md bg-black/60 flex justify-center items-center flex-col">
                      <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.15 }}
                        className="w-[30rem] md:w-[65%]"
                      ></motion.div>
                      <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.15 }}
                        className="w-[30rem] md:w-[65%]"
                      >
                        <Logo />
                      </motion.div>
                      <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.7 }}
                        className="mt-6 dynamic-bg-invert dynamic-text-invert py-3 px-8 rounded font-bold"
                        onClick={() => router.replace("/login")}
                      >
                        เข้าสู่ระบบ
                      </motion.button>
                    </div>
                  </Login>
                )}
              </div>
            </Content>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}

const Content = styled(motion.div)`
  margin-left: clamp(85px, 10vw, 240px);
  min-height: calc(100vh - 100px);
  ${tw`w-full md:mx-0 2xl:ml-20 px-20 2xl:pl-6 2xl:pr-3`}
  @media(max-width: 960px) {
    ${tw`mx-0 px-3`}
  }
`

const Login = styled.div`
  background-image: url("https://images.unsplash.com/photo-1620121692029-d088224ddc74?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80");
  background-repeat: no-repeat;
  background-size: cover;
`
export default Layout

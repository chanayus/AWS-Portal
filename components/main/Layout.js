import { AnimatePresence, motion } from "framer-motion";

import Head from "next/head";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import styled from "styled-components";
import tw from "twin.macro";
import { useRouter } from "next/router";

const Layout = ({ children }) => {
  const router = useRouter();
  const excludePath = ["/login", "/_error"];
  const isHidden = excludePath?.find((value) => value === router.pathname);

  return (
    <>
      <Head>
        <title>AWS Portal</title>
      </Head>
      <div className="flex">
        <AnimatePresence exitBeforeEnter>{isHidden ? <></> : <Sidebar  key="sidebar" />}</AnimatePresence>
        <AnimatePresence exitBeforeEnter>
          {isHidden ? (
            <motion.div className="w-full" exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }} key="exclude-path">
              <>{children}</>
            </motion.div>
          ) : (
            <Content exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }} key={router.pathname}>
              <AnimatePresence exitBeforeEnter>{isHidden ? <></> : <Navbar key="navbar" />}</AnimatePresence>
              <div className="relative min-h-full mt-8 px-20 pb-24 2xl:px-3 md:mt-24">{children}</div>
            </Content>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

const Content = styled(motion.div)`
  margin-left: clamp(85px, 10vw, 240px);
  min-height: calc(100vh - 100px);
  ${tw`w-full md:mx-0 2xl:ml-20`}
  /* ${tw`w-full px-20 pb-24 2xl:px-3 2xl:mr-4 md:mx-0 md:mt-24`}; */
  @media(max-width: 960px) {
    ${tw`mx-0`}
  }
`;
export default Layout;

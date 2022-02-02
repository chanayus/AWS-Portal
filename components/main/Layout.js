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
        <AnimatePresence exitBeforeEnter>
          {isHidden ? null : (
            <>
              <Sidebar key="sidebar" />
              <Navbar key="navbar" />
            </>
          )}
        </AnimatePresence>
        <AnimatePresence exitBeforeEnter>
          {isHidden ? (
            <motion.div className="w-full" exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }} key="exclude-path">
              <>{children}</>
            </motion.div>
          ) : (
            <Content exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.175 }} key={router.pathname}>
              <div className="relative min-h-full mt-24 pb-24 ">{children}</div>
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
  ${tw`w-full md:mx-0 2xl:ml-20 px-20 2xl:px-3`}
  @media(max-width: 960px) {
    ${tw`mx-0`}
  }
`;
export default Layout;

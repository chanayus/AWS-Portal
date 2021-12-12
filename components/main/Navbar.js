import { AnimatePresence, motion } from "framer-motion";
import { HiOutlineBell, HiOutlineMoon, HiOutlineSun, HiUser } from "react-icons/hi";
import { useEffect, useRef, useState } from "react";

import Link from "next/link";
import { SetThemeContext } from "../../pages/_app";
import styled from "styled-components";
import tw from "twin.macro";
import { useContext } from "react";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();
  const { currentTheme, themeHandle } = useContext(SetThemeContext);
  const [lastScroll, setLastScroll] = useState(window.pageYOffset);
  const navRef = useRef();
  const maxScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  // useEffect(() => {
  //   const handleScroll = (e) => {
  //     if (lastScroll > window.pageYOffset || window.pageYOffset <= 0) {
  //       navRef.current.style.top ??= "0px";
  //     } else if (lastScroll < window.pageYOffset || window.pageYOffset >= maxScroll) {
  //       navRef.current.style.top ??= "-80px";
  //     }
  //     setLastScroll(window.pageYOffset);
  //   };
  //   if (window.innerWidth <= 960 && !excludePath) {
  //     window.addEventListener("scroll", (e) => handleScroll(e));
  //   }
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, [lastScroll]);

  return (
    <Container ref={navRef} exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.15 }} key="navbar" >
      <div className="hidden md:block w-44 navbar-logo">
        <Link href="/">
          <a>
            <img src="/images/logo-no-text.svg" alt="nav-bar-logo" className="filter drop-shadow" />
          </a>
        </Link>
      </div>
      <Menu>
        {/* <button className="user-button">
            <div className=" bg-gradient-to-r from-red-500 to-red-400 rounded-full text-gray-500rounded-full w-9 h-9 flex justify-center items-center">
              <HiUser size="1.7rem" color="#FFF" />
            </div>
            <p className="ml-2 md:hidden">Username</p>
          </button> */}
        <button className="mx-6 sm:mx-4 darkmode-toggle" onClick={() => themeHandle(currentTheme === "light" ? "dark" : "light")}>
          <AnimatePresence exitBeforeEnter>
            {currentTheme === "light" ? (
              <motion.div initial={{ scale: 0 }} animate={{ rotate: 360, scale: 1 }} key="dark">
                <HiOutlineMoon size="1.8rem" />
              </motion.div>
            ) : (
              <motion.div initial={{ scale: 0 }} animate={{ rotate: 180, scale: 1 }} key="light">
                <HiOutlineSun size="1.8rem" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
        <button className="notification-button">
          <HiOutlineBell size="1.8rem" />
          <div className="notification-badge"></div>
        </button>
      </Menu>
    </Container>
  );
};

const Container = styled(motion.div)`
  ${tw`flex sticky top-0 items-center justify-end overflow-hidden py-3 pr-12 pl-14 xl:pl-3 duration-100 z-40 md:justify-between md:fixed md:top-0 md:w-full md:pl-4 sm:py-2 lg:pr-4`}
  color: ${(props) => props.theme.textColor};
  background: ${(props) => props.theme.bodyColor};
  @media (max-width: 960px) {
    background: ${(props) => props.theme.subColor};
  }
  .navbar-logo {
    img {
      height: 35px;
    }
  }
`;

const Menu = styled.div`
  ${tw`flex justify-start items-center py-1`}
  button {
    ${tw`flex items-center`}
  }
  svg {
    font-size: clamp(17px, 1.725vw, 22px);
  }
  .notification-button {
    position: relative;
    .notification-badge {
      ${tw`flex items-center justify-center p-0.5 rounded-full absolute`}
      top: -7px;
      right: -7px;
      background: ${(props) => props.theme.red};
      min-width: 15px;
      height: 15px;
      color: #fff;
    }
  }
`;

export default Navbar;

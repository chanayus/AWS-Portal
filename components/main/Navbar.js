import { useEffect, useRef, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import Logo from "../Logo";
import { SetThemeContext } from "../../pages/_app";
import styled from "styled-components";
import tw from "twin.macro";
import { useContext } from "react";
import { useRouter } from "next/router";

const Navbar = ({ excludePath }) => {
  const router = useRouter();
  const isHidden = excludePath?.find((value) => value === router.pathname);
  const { currentTheme, themeHandle } = useContext(SetThemeContext);
  const [lastScroll, setLastScroll] = useState(window.pageYOffset);
  const navRef = useRef();
  const maxScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight
  useEffect(() => {
    const handleScroll = (e) => {
      const scrollTop = window.pageYOffset || navRef.current.scrollTop;
      if(lastScroll > window.pageYOffset || window.pageYOffset <= 0){
        navRef.current.style.top = "0px"
      }
      else if(lastScroll < window.pageYOffset || window.pageYOffset >= maxScroll){
        navRef.current.style.top = "-80px"
      }
      setLastScroll(window.pageYOffset);
    };
    if(window.innerWidth <= 960){
      window.addEventListener("scroll", (e) => handleScroll(e));
    } 
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScroll]);


  if (isHidden) {
    return <></>;
  } else {
    return (
      <Container ref={navRef}>
        <div className="hidden md:flex w-44 logo">
          {/* <button onClick={() => console.log("asd")}>
            <FontAwesomeIcon icon="bars" size="2x" className="mr-4 md:mr-2" />
          </button> */}
          <Link href="/">
            <a>
              <Logo />
            </a>
          </Link>
        </div>
        <Menu>
          <button className="user-button">
            <div className="bg-gray-400 rounded-full text-gray-500rounded-full w-9 h-9 flex justify-center items-center">
              <FontAwesomeIcon icon="user" size="2x" />
            </div>
            <p className="ml-2 md:hidden">Username</p>
          </button>
          <button className="mx-6 sm:mx-5" onClick={() => themeHandle(currentTheme === "light" ? "dark" : "light")}>
            <FontAwesomeIcon icon={["fas", currentTheme === "light" ? "moon" : "sun"]} size="2x" />
          </button>
          <button className="notification-button">
            <FontAwesomeIcon icon={["fas", "bell"]} size="2x" />
            <div className="notification-badge">9</div>
          </button>
        </Menu>
      </Container>
    );
  }
};

const Container = styled.div`
  ${tw`flex items-center overflow-hidden py-4 pr-12 pl-4 justify-end duration-100 z-50 md:justify-between md:fixed md:top-0 md:w-full sm:py-2 lg:pr-6 md:shadow`}
  color: ${(props) => props.theme.textColor};
  @media (max-width: 960px) {
    background: ${(props) => props.theme.subColor};
  }
  .logo {
    svg.portal-logo {
      width: clamp(80px, 20vw, 100px);
      height: 50px;
      fill: ${(props) => props.theme.textColor};
      path {
        stroke: ${(props) => props.theme.textColor};
      }
    }
  }
`;

const Menu = styled.div`
  ${tw`flex justify-start items-center`}
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
      top: -10px;
      right: -13px;
      background: ${(props) => props.theme.red};
      min-width: 20px;
      height: 20px;
      color: #fff;
    }
  }
`;

export default Navbar;

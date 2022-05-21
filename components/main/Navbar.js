import { AnimatePresence, motion } from "framer-motion"
import { HiOutlineBell, HiOutlineMoon, HiOutlineSun, HiUser } from "react-icons/hi"
import { useContext, useEffect, useState } from "react"

import Link from "next/link"
import { SetThemeContext } from "../../pages/_app"
import { SetUserContext } from "../../pages/_app"
import styled from "styled-components"
import tw from "twin.macro"
import { useFetch } from "../../hooks/useFetch"
import { useRouter } from "next/router"

const Navbar = () => {
  const router = useRouter()
  const { loading, data } = useFetch("/api/get_notification", () => {}, false)
  const [showNoti, setShowNoti] = useState(false)
  const { currentTheme, themeHandle } = useContext(SetThemeContext)
  const { user, getLocalUser } = useContext(SetUserContext)

  useEffect(() => {
    console.log(data)
  }, [router, loading])
  // const navRef = useRef();

  // const router = useRouter();
  // const [lastScroll, setLastScroll] = useState(window.pageYOffset);
  // const maxScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;
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
    <Container exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.15 }} key="navbar">
      <div className="hidden md:block w-44 navbar-logo">
        <Link href="/">
          <a>
            <img src="/images/logo-no-text.svg" alt="nav-bar-logo" className="filter drop-shadow" />
          </a>
        </Link>
      </div>
      <Menu>
        <div className="flex items-center">
          {!["1", "2"].includes(user.user._id) && (
            <div className="flex items-center md:hidden dynamic-bg py-1 px-4 rounded-md">
              <div className="2xl:mx-auto bg-gradient-to-r flex-shrink-0 from-blue-500 to-blue-400 rounded-full text-gray-500 w-8 h-8 flex justify-center items-center">
                <HiUser size="1.5rem" color="#FFF" />
              </div>
              <div className="truncate">
                <p className="ml-2 w-fit text-white leading-5 text-sm truncate dynamic-text">{user.user.username}</p>
                <p className="ml-2 w-fit text-gray-400 ">Admin</p>
              </div>
            </div>
          )}
          <button
            className="mx-6 sm:mx-4 darkmode-toggle"
            onClick={() => themeHandle(currentTheme === "light" ? "dark" : "light")}
            aria-label="darkmode-toggle"
          >
            <AnimatePresence exitBeforeEnter>
              {currentTheme === "light" ? (
                <motion.div initial={{ scale: 0 }} animate={{ rotate: 360, scale: 1 }} key="dark">
                  <HiOutlineMoon size="1.75rem" />
                </motion.div>
              ) : (
                <motion.div initial={{ scale: 0 }} animate={{ rotate: 180, scale: 1 }} key="light">
                  <HiOutlineSun size="1.75rem" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
          <div className="relative  flex items-center">
            <button className="notification-button" aria-label="notofication-button" onClick={() => setShowNoti(!showNoti)}>
              <Bell size="1.75rem" fillBell={`${showNoti ? "transparent" : ""}`} />
              <div className="notification-badge"></div>
            </button>
            <AnimatePresence>
              {showNoti && (
                <motion.div
                  exit={{ opacity: 0 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.25 }}
                  className="absolute w-[500px] sm:w-[97vw] h-[250px] rounded-md dynamic-bg shadow-lg top-[170%] sm:top-[200%] z-50 right-[0%] sm:right-[-50%] overflow-hidden"
                >
                  <div className="p-4">
                    <h2 className="text-left text-2xl font-bold">การแจ้งเตือน</h2>
                  </div>
                  {data.notification.map((item, index) => (
                    <NotiContent className="dynamic-bg-main h-full" key={index}>
                      <div className="w-full py-2 px-4">
                        <p className="text-left font-semibold">{item.description}</p>
                        <p className="text-left opacity-60 font-light">จาก {item.owner.username}</p>
                      </div>
                    </NotiContent>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Menu>
    </Container>
  )
}

const Container = styled(motion.div)`
  ${tw`flex fixed w-full top-0 items-center justify-between pt-3 pb-2 pr-12 xl:pl-3 2xl:pr-5 duration-200 z-40 md:justify-between md:fixed md:top-0 md:w-full md:pl-4 sm:py-2`}
  color: ${(props) => props.theme.textColor};
  min-height: 70px;
  background: ${(props) => props.theme.bodyColor};
  @media (max-width: 960px) {
    background: ${(props) => props.theme.subColor};
  }
  .navbar-logo {
    img {
      height: 35px;
    }
  }
`

const Menu = styled.div`
  ${tw`flex items-center w-full justify-end`}
  padding-left: clamp(85px, 11.5vw, 260px);

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
`

const NotiContent = styled.div`
  background: ${(props) => (props.theme.themeName === "dark" ? "#212121" : "#f0f0f0")};
`

const Bell = styled(HiOutlineBell)`
  fill: ${(props) => (props.fillBell !== "transparent" ? "transparent" : props.theme.textColor)};
`

export default Navbar

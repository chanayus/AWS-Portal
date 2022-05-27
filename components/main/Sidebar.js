import { AnimateSharedLayout, motion } from "framer-motion"
import { HiCurrencyDollar, HiHome, HiOutlineCurrencyDollar, HiOutlineHome, HiOutlineLogin, HiOutlineLogout, HiUser } from "react-icons/hi"
import { IoCube, IoCubeOutline } from "react-icons/io5"

import Link from "next/link"
import { SetUserContext } from "../../pages/_app"
import dynamic from "next/dynamic"
import styled from "styled-components"
import tw from "twin.macro"
import { useContext } from "react"
import { useRouter } from "next/router"

const Logo = dynamic(import("../icon/Logo"))
const LogoNoText = dynamic(import("../icon/LogoNoText"))

const Sidebar = () => {
  const router = useRouter()
  const { user, getLocalUser } = useContext(SetUserContext)
  return (
    <Container exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.15 }} key="sidebar">
      <div className="sidebar-logo md:hidden">
        <div className="2xl:hidden">
          <Logo />
        </div>
        <div className="w-10 hidden 2xl:flex">
          <LogoNoText />
        </div>
      </div>

      <Menu>
        <AnimateSharedLayout>
          <Link href="/" scroll={false}>
            <a aria-label="home">
              {router.asPath === "/" ? <Hilight layoutId="sidebar-hilight" className="sidebar-hilight" /> : null}
              {router.asPath === "/" ? <HiHome /> : <HiOutlineHome />}
              <p className="2xl:hidden">หน้าหลัก</p>
            </a>
          </Link>
          <Link href="/resources" scroll={false}>
            <a aria-label="resources">
              {router.asPath.includes("/resources") ? <Hilight layoutId="sidebar-hilight" className="sidebar-hilight" /> : null}
              {router.asPath.includes("/resources") ? <IoCube /> : <IoCubeOutline />}
              <p className="2xl:hidden">Resources</p>
            </a>
          </Link>
          <Link href="/cost" scroll={false}>
            <a aria-label="cost">
              {router.asPath.includes("/cost") ? <Hilight layoutId="sidebar-hilight" className="sidebar-hilight" /> : null}
              {router.asPath.includes("/cost") ? <HiCurrencyDollar /> : <HiOutlineCurrencyDollar />}
              <p className="2xl:hidden">ค่าใช้จ่าย</p>
            </a>
          </Link>
          <Link href="/api/logout" scroll={false}>
            <a aria-label="signout">
              <HiOutlineLogout />
              <p className="2xl:hidden">ออกจากระบบ</p>
            </a>
          </Link>
        </AnimateSharedLayout>
      </Menu>

      <div className="md:hidden">
        {["1", "2"].includes(user.user._id) ? (
          <Link href="/login">
            <a aria-label="signout">
              <HiOutlineLogin />
              <p className="2xl:hidden">ลงชื่อเข้าสู่ระบบ</p>
            </a>
          </Link>
        ) : (
          <>
            <Link href="/api/logout">
              <a aria-label="signout">
                <HiOutlineLogout />
                <p className="2xl:hidden">ออกจากระบบ</p>
              </a>
            </Link>
            {/* <div className="flex items-center mt-5 mb-4 border-t border-gray-700 pt-7">
              <div className="ml-2 2xl:mx-auto bg-gradient-to-r flex-shrink-0 from-blue-500 to-blue-400 rounded-full text-gray-500 w-8 h-8 flex justify-center items-center">
                <HiUser size="1.5rem" color="#FFF" />
              </div>
              <div className="truncate">
                <p className="ml-2 w-fit text-white 2xl:hidden leading-5 text-sm truncate">{user.user.username}</p>
                <p className="ml-2 w-fit text-gray-400 2xl:hidden">Admin</p>
              </div>
            </div> */}
          </>
        )}
      </div>
    </Container>
  )
}

const Container = styled(motion.div)`
  ${tw`fixed left-0 h-screen flex flex-col overflow-hidden justify-between py-7 pb-2 min-h-full z-50 px-2.5 xl:px-0 md:w-full md:p-0 md:flex-row md:h-16 md:min-h-0 md:bottom-0`}
  width: clamp(150px,10.25vw,200px);
  background: #191919;
  @media (max-width: 1366px) {
    width: fit-content;
    ${tw`pr-5 pl-5`}
  }
  @media (max-width: 960px) {
    padding: 0;
    width: 100%;
    background: ${(props) => props.theme.subColor};
  }
  .sidebar-logo {
    ${tw`duration-75 self-center`}
    svg {
      width: clamp(100px, 6vw, 135px);
      height: 50px;
    }
  }
  a,
  button {
    ${tw`relative w-full flex items-center self-stretch leading-tight text-left md:m-0 md:flex-col md:justify-center md:h-full duration-200`}
    height: 45px;
    color: #ddd;
    margin: 0.7vh 0;
    @media (max-width: 960px) {
      color: ${(props) => props.theme.textColor};
    }
    svg {
      ${tw`flex-1 mr-1 2xl:mr-0 duration-200`}
      font-size: 1.3rem;
    }
    p {
      ${tw`md:flex-1 md:hidden duration-200`}
      flex: 2;
      font-size: clamp(0.925rem, 0.9vw, 1rem);
      text-align: left;
      color: #ddd;
      font-weight: 300;
    }
  }
`

const Menu = styled.div`
  ${tw`flex flex-col flex-1 pt-14 md:flex-row md:pt-0`}
  a:last-child {
    ${tw`hidden md:flex`}
  }
`

const Hilight = styled(motion.div)`
  ${tw`absolute w-full bg-white h-full rounded md:h-1 md:rounded-none top-0`}
  background: rgba(255, 255, 255, 0.18);
  @media (max-width: 960px) {
    background: ${(props) => props.theme.textColor};
  }
`

export default Sidebar

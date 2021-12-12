import { AnimateSharedLayout, motion } from "framer-motion";
import { HiHome, HiOutlineHome, HiOutlineLogout } from "react-icons/hi";
import { IoCube, IoCubeOutline } from "react-icons/io5";

import Link from "next/link";
import Logo from "../Logo";
import LogoNoText from "../LogoNoText";
import styled from "styled-components";
import tw from "twin.macro";
import { useRouter } from "next/router";

const Sidebar = () => {
  const router = useRouter();

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
          {/* <Link href="/history">
              <a aria-label="history">
                {router.asPath === "/history" ? <Hilight layoutId="sidebar-hilight" className="sidebar-hilight" /> : null}
                {router.asPath === "/history" ? <HiClock /> : <HiOutlineClock />}
                <p className="2xl:hidden">ประวัติ</p>
              </a>
            </Link> */}
          <Link href="/resources" scroll={false}>
            <a aria-label="resources">
              {router.asPath.includes("/resources") ? <Hilight layoutId="sidebar-hilight" className="sidebar-hilight" /> : null}
              {router.asPath.includes("/resources") ? <IoCube /> : <IoCubeOutline />}
              <p className="2xl:hidden">Resources</p>
            </a>
          </Link>
          {/* <Link href="/iam">
              <a aria-label="iam">
                {router.asPath === "/iam" ? <Hilight layoutId="sidebar-hilight" className="sidebar-hilight" /> : null}
                {router.asPath === "/iam" ? <HiUser /> : <HiOutlineUser />}
                <p className="2xl:hidden">IAM Users</p>
              </a>
            </Link> */}
          <Link href="/login" scroll={false}>
            <a aria-label="signout">
              <HiOutlineLogout />
              <p className="2xl:hidden">ออกจากระบบ</p>
            </a>
          </Link>
        </AnimateSharedLayout>
      </Menu>

      <div className="md:hidden">
        <Link href="/login">
          <a aria-label="signout">
            <HiOutlineLogout />
            <p className="2xl:hidden">ออกจากระบบ</p>
          </a>
        </Link>
      </div>
    </Container>
  );
};

const Container = styled(motion.div)`
  ${tw`fixed left-0 h-screen flex flex-col overflow-hidden justify-between py-7 pb-2 min-h-full z-50 px-2.5 xl:px-0 md:w-full md:p-0 md:flex-row md:h-16 md:min-h-0 md:bottom-0`}
  width: clamp(150px,10.25vw,200px);
  background: #111;
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
`;

const Menu = styled.div`
  ${tw`flex flex-col flex-1 pt-14 md:flex-row md:pt-0`}
  a:last-child {
    ${tw`hidden md:flex`}
  }
`;

const Hilight = styled(motion.div)`
  ${tw`absolute w-full bg-white h-full rounded md:h-1 md:rounded-none top-0`}
  background: rgba(255, 255, 255, 0.18);
  @media (max-width: 960px) {
    background: ${(props) => props.theme.textColor};
  }
`;

export default Sidebar;

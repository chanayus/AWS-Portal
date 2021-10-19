import { HiClock, HiHome, HiOutlineClock, HiOutlineHome, HiOutlineLogout, HiOutlineServer, HiOutlineUser, HiServer, HiUser } from "react-icons/hi";

import Link from "next/link";
import Logo from "../Logo";
import styled from "styled-components";
import tw from "twin.macro";
import { useRouter } from "next/router";

const Sidebar = ({ excludePath }) => {
  const router = useRouter();

  const isHidden = excludePath?.find((value) => value === router.pathname);
  if (isHidden) {
    return <></>;
  } else {
    return (
      <Container>
        <div className="logo md:hidden">
          <Logo />
        </div>
        <Menu>
          <Link href="/">
            <a>
              {router.asPath === "/" ?  <HiHome /> : <HiOutlineHome />}
              <p>หน้าหลัก</p>
            </a>
          </Link>
          <Link href="/history">
            <a>
              {router.asPath === "/history" ?  <HiClock /> : <HiOutlineClock />}
              <p>ประวัติ</p>
            </a>
          </Link>
          <Link href="/resource">
            <a>
              {router.asPath === "/resource" ?  <HiServer /> : <HiOutlineServer />}
              <p>
                Resource<br/>
                ที่กำลังใช้งาน
              </p>
            </a>
          </Link>
          <Link href="/iam">
            <a>
              {router.asPath === "/iam" ?  <HiUser/> : <HiOutlineUser/>}
              <p>IAM Users</p>
            </a>
          </Link>
          <Link href="/login">
            <a>
              <HiOutlineLogout/>
              <p>ออกจากระบบ</p>
            </a>
          </Link>
        </Menu>
        <div className="md:hidden">
          <Link href="/login">
            <a>
              <HiOutlineLogout/>
              <p>ออกจากระบบ</p>
            </a>
          </Link>
        </div>
      </Container>
    );
  }
};

const Container = styled.div`
  ${tw`fixed left-0 flex flex-col overflow-hidden justify-between py-7 pb-2 min-h-full z-50 px-2.5 xl:px-0 md:w-full md:p-0 md:flex-row md:h-16 md:min-h-0 md:bottom-0`}
  width: clamp(160px,10vw,200px); 
  background: #111;
  @media(max-width: 960px){
    background: ${(props) => props.theme.subColor};
  }
  .logo {
    ${tw`duration-75 self-center`}
    svg {
      width: clamp(100px, 1vw, 135px);
      fill: #c5c5c5;
      path {
        stroke: #ddd;
      }
    }
  }
  a, button {
    ${tw`relative w-full flex items-center self-stretch leading-tight text-left md:m-0 md:flex-col md:justify-center md:h-full duration-200`}
    height: 45px;
    color: #ddd;
    margin: 0.7vh 0;
    @media(max-width: 960px){
      color: ${(props) => props.theme.textColor};
      :hover{
      }
    }
    svg {
      ${tw`flex-1 md:m-0 duration-200`}
      margin-right: 10px;
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
    :hover {
      background: rgba(255,255,255,0.15);
      ${tw`md:bg-transparent`}
      p, svg { 
        color: #FFF;
        ${tw`md:text-gray-600`}
      }
    }
  }
`;

const Menu = styled.div`
  ${tw`flex flex-col flex-1 pt-14 md:flex-row md:pt-0`}
  a:last-child{
    ${tw`hidden md:flex`}
  }
`;

export default Sidebar;

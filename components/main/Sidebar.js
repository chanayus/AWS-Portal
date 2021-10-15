import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "../Logo";
import {SetThemeContext} from "../../pages/_app"
import styled from "styled-components";
import tw from "twin.macro";
import { useContext } from "react";
import { useRouter } from "next/router";

const Sidebar = ({ excludePath }) => {
  const {currentTheme, setCurrentTheme} = useContext(SetThemeContext)
  const router = useRouter();
  const isHidden = excludePath?.find((value) => value === router.pathname);
  if (isHidden) {
    return <></>;
  } else {
    return (
      <Container>
        <div className="logo">
          <Logo />
        </div>
        <Menu>
          <button>
            <FontAwesomeIcon icon="home" />
            <p>หน้าหลัก</p>
          </button>
          <button>
            <FontAwesomeIcon icon="history" />
            <p>ประวัติ</p>
          </button>
          <button>
            <FontAwesomeIcon icon="server" />
            <p>
              Resource <br />
              ที่ถูกใช้งาน
            </p>
          </button>
          <button>
            <FontAwesomeIcon icon="user" />
            <p>IAM Users</p>
          </button>
        </Menu>
        <div>
        <button className="" onClick={() => setCurrentTheme(currentTheme === "light" ? "dark" : "light")}>
          <FontAwesomeIcon icon={["fas", currentTheme === "light" ? "moon" :"sun"]} size="2x" />
          <p>{currentTheme === "light" ? "Dark Mode" :  "Light Mode"}</p>
        </button>
        <button className="">
          <FontAwesomeIcon icon={["fas", "sign-out-alt"]} size="2x" />
          <p>ออกจากระบบ</p>
        </button>
        </div>
      </Container>
    );
  }
};

const Container = styled.div`
  ${tw` flex flex-col justify-between py-7 pb-2 flex-shrink-0 h-screen overflow-hidden duration-200 z-50 px-2.5 xl:px-0 md:w-0 md:p-0`}
  width: clamp(160px,10vw,200px);
  background: ${(props) => props.theme.subColor};
  .logo {
    ${tw`duration-75 self-center`}
    svg { 
      width: clamp(120px, 1vw,135px);
      fill: ${(props) => props.theme.textColor};
      path {
        stroke: ${(props) => props.theme.textColor};
      }
    }
  }
  button {
    ${tw`flex items-center self-stretch flex-shrink-0 duration-75 leading-tight text-left rounded`}
    width: 100%;
    height: 55px;
    color: ${(props) => props.theme.textColor};
    margin: 1vh 0;
    svg {
      margin-right: 10px;
      font-size: clamp(1.35rem,1.5vw,2rem);
      flex: 1;
    }
    p {
      flex: 2;
      font-size: clamp(0.85rem,0.9vw,1rem);
    }
    :hover {
      background: ${(props) => props.theme.textColor};
      p, svg {
        color: ${(props) => props.theme.subColor};
      }
    }
  }
`;

const Menu = styled.div`
  ${tw`flex flex-col flex-1 pt-14 flex-shrink-0`}
`;

export default Sidebar;

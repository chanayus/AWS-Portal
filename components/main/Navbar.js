import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "../Logo";
import styled from "styled-components";
import tw from "twin.macro";
import { useRouter } from "next/router";

const Navbar = ({excludePath}) => {
  const router = useRouter();
  const isHidden = excludePath?.find((value) => value === router.pathname);
  if (isHidden) {
    return <></>;
  } else {
    return (
      <Container>
        <div className="hidden md:flex w-44 logo">
          <button className="" onClick={() => console.log("asd")}>
            <FontAwesomeIcon icon="bars" size="2x" className="mr-4 md:mr-2" />
          </button>
          <Logo />
        </div>
        <Menu>
          <button className="user-button mr-5 md:mr-3">
            <div className="bg-red-900 rounded-full w-10 h-10 flex justify-center items-center mr-2">
              <FontAwesomeIcon icon="user" size="2x" />
            </div>
            <p className="md:hidden">Username</p>
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
  ${tw`flex items-center py-4 px-5 justify-end z-50 md:justify-between md:fixed md:top-0 md:w-full sm:py-2`}
  color: ${(props) => props.theme.textColor};
  @media(max-width: 960px){
    background: ${(props) => props.theme.subColor};
  }
  .logo{
    svg.portal-logo { 
      width: clamp(80px,20vw,130px);
      height: 50px;
      fill: ${(props) => props.theme.textColor};
      path {
        stroke: ${(props) => props.theme.textColor};
      }
    }
  }
`;

const Menu = styled.div`
  ${tw`flex justify-start items-center `}
  button {
    ${tw`flex items-center`}
  }
  svg{
    font-size: clamp(17px,6vw,28px);
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
      color: #FFF;
    }
  }
`;


export default Navbar;

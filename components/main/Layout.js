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
    <div className="flex">
      <Sidebar excludePath={excludePath} />

      {isHidden ? 
        <div className="w-full">
         <Navbar excludePath={excludePath} />
          <>{children}</>
        </div>
        :
          <Content>
            <Navbar excludePath={excludePath} />
            <div className="mt-8 px-20 pb-24 2xl:px-3 md:mt-24">{children}</div>
          </Content>
      }

    </div>
  );
};

const Content = styled.div`
  margin-left: clamp(85px, 10vw, 240px);
  ${tw`w-full md:mx-0 2xl:ml-20`}
  /* ${tw`w-full px-20 pb-24 2xl:px-3 2xl:mr-4 md:mx-0 md:mt-24`}; */
  @media(max-width: 960px){
    ${tw`mx-0`}
  }
`;
export default Layout;

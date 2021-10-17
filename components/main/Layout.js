import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import styled from "styled-components";
import tw from "twin.macro";
import { useRouter } from "next/router";

const Layout = ({children}) =>{
    const router = useRouter();
    const excludePath = ['/login',"/_error"]
    const isHidden = excludePath?.find((value) => value === router.pathname);
    return(
        <>
            <Sidebar excludePath={excludePath}/>
            {/* <div className="w-full"> */}
                <Navbar excludePath={excludePath}/>
                {isHidden ? children :
                    <Content >
                        {children}
                    </Content>
                }
            {/* </div> */}
        </>
    );

}

const Content = styled.div`
    margin-left: clamp(160px,10vw,200px);
    ${tw`mt-7 px-24 pb-10 xl:px-4 md:mt-28 md:ml-0`}
`
export default Layout;
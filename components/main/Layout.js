import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import styled from "styled-components";
import { useRouter } from "next/router";

const Layout = ({children}) =>{
    const router = useRouter();
    const excludePath = ['/login']
    const isHidden = excludePath?.find((value) => value === router.pathname);
    return(
        <div className="flex">
            <Sidebar excludePath={excludePath}/>
            <div className="w-full">
                <Navbar excludePath={excludePath}/>
                {isHidden ? children :
                    <div className="div mx-auto max-w-screen-2xl px-4 mt-7 md:mt-28">
                        {children}
                    </div>
                }
            </div>
        </div>
    );

}

export default Layout;
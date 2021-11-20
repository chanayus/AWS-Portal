import { HiChevronRight } from "react-icons/hi";
import Link from "next/link";
import styled from "styled-components";
import tw from "twin.macro";
import { useRouter } from "next/router";
import { useState } from "react";

const Breadcrumb = () => {
    let fullPath = "/"
    const router = useRouter();
    const { asPath } = router;
    const path = []
    
    asPath.split("/").map((value, index) => {
        const obj = {}
        fullPath = index > 1 ? fullPath+"/"+value : fullPath+value
        obj.pathName = fullPath
        if(value.indexOf("?") >= 0){      
            obj.displayLink = value.slice(0, value.indexOf("?"))
        }
        else{
            obj.displayLink = value
        }
        path.push(obj)
    })

    console.log(path)
    return (
        <>
            <div className="flex items-center mb-4">
                {path.map((value, index) => (
                    <div className="flex items-center dynamic-text" key={index}>
                        <Link href={`${value.pathName}`} >
                            <a>{value.displayLink === "" ? "home" : value.displayLink}</a>
                        </Link>
                        { index === (path.length-1) ? null : <HiChevronRight size="1.5rem" style={{margin: "0 7px"}} />}
                    </div>
                ))}
            </div>
        </>
    );
};


export default Breadcrumb;

import { HiChevronRight } from "react-icons/hi";
import Link from "next/link";
import styled from "styled-components";
import tw from "twin.macro";
import { useRouter } from "next/router";

const Breadcrumb = () => {
    const router = useRouter();
    const { asPath } = router;
    return (
        <>
            <div className="flex items-center mb-4">
                {asPath.split("/").map((value, index) => (
                    <div className="flex items-center dynamic-text" key={index}>
                        <Link href={`/${value}`} >
                            <a>{value === "" ? "home" : value}</a>
                        </Link>
                        { index === (asPath.split("/").length-1) ? null : <HiChevronRight size="1.5rem" style={{margin: "0 7px"}} />}
                    </div>
                ))}
            </div>
        </>
    );
};


export default Breadcrumb;

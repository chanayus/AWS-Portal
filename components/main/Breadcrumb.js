import { IoChevronForward } from "react-icons/io5";
import Link from "next/link";
import { useRouter } from "next/router";

const Breadcrumb = () => {
    let fullPath = "/"

    const pathCondition = {
        "/resource/region" : "/resource?cardType=region",
        "/resource/iam" : "/resource?cardType=iam",
    }
    const router = useRouter();
    const { asPath } = router;
    const path = []
    
    asPath.split("/").map((value, index) => {
        const obj = {}
        fullPath = index > 1 ? fullPath+"/"+value : fullPath+value
        obj.pathName = pathCondition[fullPath] ?? fullPath;
        if(value.indexOf("?") >= 0){      
            obj.displayLink = value.slice(0, value.indexOf("?"))
        }
        else{
            obj.displayLink = value
        }
        path.push(obj)
    })

    return (
        <>
            <div className="flex items-center mb-4">
                {path.map((value, index) => (
                    <div className="flex items-center dynamic-text font-light " key={index}>
                        <Link href={`${value.pathName}`} >
                            <a className={`capitalize ${index === (path.length-1) ? "text-blue-400 font-medium" : null}`}>{value.displayLink === "" ? "home" : value.displayLink}</a>
                        </Link>
                        { index === (path.length-1) ? null : <IoChevronForward size="1.1rem" style={{margin: "0 8px"}} />}
                    </div>
                ))}
            </div>
        </>
    );
};



export default Breadcrumb;

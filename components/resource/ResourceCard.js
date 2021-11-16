import Link from "next/link";
import { motion } from "framer-motion";
import styled from "styled-components";
import tw from "twin.macro";

const ResourceType = ({ title , totalResource, totalRegion, type }) => {
  const subTypeCondition = {
    service : "region",
    region : "IAM User",
    iam : "region"
  }
 
  const linkCondition = {
    service : {as: `/resource/${title}`, href: "/resource/[serviceName]"},
    region : {as: `/resource/region/${title}`, href: "/resource/region/[regionName]"},
    iam : {as: `/resource/iam/${title}`, href: "/resource/iam/[iamName]"}
  }
  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
    transition: { duration: 0.35 }
  }
  return (
    <Link href={linkCondition[type]["href"]} as={linkCondition[type]["as"]}>
      <Card variants={item} whileHover={{scale: 0.965}} key={type}>
        {
          type === "service" ? <img className="" src={`/images/resourceIcon/${title}.png`} alt="" />
          : 
          <div className="absolute w-14 h-14 -top-6 rounded-md sm:left-3 sm:-top-5 sm:w-12 sm:h-12 bg-gradient-to-r from-red-500 to-red-400 flex items-center justify-center" >
            <h2 className="text-white text-2xl">{title !== "-" ? title.charAt(0).toUpperCase() : "?"}</h2>
          </div>
        }
        <div className="flex justify-between items-center w-full">
          <h1 className="service-name">{title === "-" ? "ไม่มีการระบุ" : title}</h1>
          <h1 className="font-light">{totalResource}</h1>
        </div>
        <h2 className={`text-gray-300 mt-2 font-light`}>
          <span>{totalRegion}</span> {subTypeCondition[type]}<span className="sm:hidden"> ที่กำลังใช้งาน</span>
        </h2>
      </Card>
    </Link>
  );
};

const Card = styled(motion.a)`
  ${tw`flex px-5 pt-2 pb-5 relative flex-col justify-end rounded-lg md:px-3 sm:pb-6`}
  width: 400px;
  max-width: 100%;
  height: 140px;
  background: linear-gradient(189.63deg, #1c1c1c 24.44%, #151515 86.76%);
  cursor: pointer;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  img {
    ${tw`absolute w-14 -top-6 rounded-md sm:left-3 sm:-top-5 sm:w-12 `}
  }
  h1 {
    color: #fff;
    margin-top: 7px;
    &.service-name {
      width: 75%;
      text-transform: capitalize;
      font-size: clamp(16px, 4vmin, 25px);
      word-wrap: break-word;
      line-height: 1;
    }
  }
`;

export default ResourceType;

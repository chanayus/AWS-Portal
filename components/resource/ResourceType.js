import Link from "next/link";
import { motion } from "framer-motion";
import styled from "styled-components";
import tw from "twin.macro";

const ResourceType = ({ title, totalResource, totalRegion }) => {
  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    },
    transition: {
      duration: 0.25
    }
  }
  return (
    <Link href={`/resource/[serviceName]`} as={`/resource/${title.toLowerCase()}`}>
      <Card variants={item} whileHover={{scale: 0.965}}>
        <img className="" src={`/images/resourceIcon/${title}.png`} alt="" />
        <div className="flex justify-between items-center w-full">
          <h1 className="service-name">{title}</h1>
          <h1 className="font-light">{totalResource}</h1>
        </div>
        <h2 className={`text-gray-400 mt-2 font-light`}>
          <span>{totalRegion}</span> Region<span className="sm:hidden"> ที่กำลังใช้งาน</span>
        </h2>
      </Card>
    </Link>
  );
};

const Card = styled(motion.div)`
  ${tw`flex px-5 pt-2 pb-5 relative flex-col justify-end rounded-lg shadow md:px-3 sm:pb-6`}
  width: 400px;
  max-width: 100%;
  height: 140px;
  background: linear-gradient(189.63deg, #262626 24.44%, #000000 86.76%);
  cursor: pointer;
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

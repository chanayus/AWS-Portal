import { HiGlobe, HiUser } from "react-icons/hi";

import Link from "next/link";
import { motion } from "framer-motion";
import styled from "styled-components";
import tw from "twin.macro";

const ResourceType = ({ title, totalResource, totalRegion, type }) => {
  const subTypeCondition = {
    service: "region",
    region: "IAM User",
    iam: "region",
  };

  const linkCondition = {
    service: { as: `/resources/${title}`, href: "/resources/[serviceName]" },
    region: { as: `/resources/region/${title}`, href: "/resources/region/[regionName]" },
    iam: { as: `/resources/iam/${title}`, href: "/resources/iam/[iamName]" },
  };
  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
    transition: { duration: 0.35 },
  };
  return (
    <Link href={linkCondition[type]["href"]} as={linkCondition[type]["as"]}>
      <Card variants={item} whileHover={{ scale: 0.965 }} key={type}>
        {type === "service" ? (
          <img className="" src={`/images/resourceIcon/${title}.png`} alt="service-card-icon" />
        ) : (
          <div className={`${type === "iam" ? "from-rose-600 to-rose-500" : "from-green-600 to-green-500"} absolute w-14 h-14 font-bold -top-6 rounded-md sm:left-3 sm:-top-5 sm:w-12 sm:h-12 bg-gradient-to-r flex items-center justify-center`}>
            {type === "iam" ? <HiUser color="#fcfcfc" size="2.5rem"/> : <HiGlobe color="#fcfcfc" size="2.5rem"/>}
          </div>
        )}
        <div className="flex justify-between items-center w-full">
          <h1 className="service-name">{title === "-" ? "ไม่มีการระบุ" : title}</h1>
          <h1 className="font-light">{totalResource}</h1>
        </div>
        <h2 className={`text-gray-500 mt-2 font-light`}>
          <span>{totalRegion}</span> {subTypeCondition[type]}
          <span className="sm:hidden"> ที่กำลังใช้งาน</span>
        </h2>
      </Card>
    </Link>
  );
};

const Card = styled(motion.a)`
  ${tw`flex px-5 pt-2 pb-5 relative flex-col justify-end shadow-lg rounded-xl md:px-3 sm:pb-6`}
  width: 400px;
  max-width: 100%;
  height: 140px;
  background: ${(props) => props.theme.subColor};
  cursor: pointer;
  img {
    ${tw`absolute w-14 -top-6 rounded-md sm:left-3 sm:-top-5 sm:w-12 `}
  }
  h1 {
    color: ${(props) => props.theme.textColor};
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

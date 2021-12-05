import { AnimateSharedLayout, motion } from "framer-motion";
import { HiGlobe, HiTerminal, HiUser } from "react-icons/hi";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ResourceCard from "../../components/resource/ResourceCard";
import { getUniqueData } from "../../lib/getUniqueData";
import { useRouter } from "next/router";
import { useState } from "react";

const CardSection = ({ data, setDisplayType, type }) => {
  const router = useRouter();
  const [cardType, setCardType] = useState(["service", "region", "iam"].includes(type) ? type : "service");

  const changeCardType = (value) => {
    router.replace({
      pathname: "/resources",
      query: { type: value },
    });
    setCardType(value);
  };

  const typeCondition = {
    service: "serviceName",
    region: "region",
    iam: "owner",
  };
  const subTypeCondition = {
    service: "region",
    region: "owner",
    iam: "region",
  };

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0,
        delayChildren: 0.05,
        staggerChildren: 0.075,
      },
    },
  };

  return (
    <>
      <div className="flex mt-6 mb-10 sm:mb-3 sm:flex-col-reverse sm:items-stretch justify-between items-center">
        <AnimateSharedLayout>
          <div className="flex items-center font-light p-1 sm:mt-4 relative rounded-md shadow-sm dynamic-bg">
            <button
              className={`duration-200 flex font-light items-center justify-center relative z-10 w-24 sm:w-full h-9 ${cardType === "service" ? "text-white" : null}`}
              onClick={() => changeCardType("service")}
            >
              <HiTerminal className="mr-1" size={"1.5rem"} />
              Service
              {cardType === "service" ? <motion.div className="highlight" layoutId="highlight" transition={{ duration: 0.25 }} /> : null}
            </button>
            <button
              className={`duration-200 flex font-light items-center justify-center relative z-10 w-24 sm:w-full h-9 mx-3  ${cardType === "region" ? "text-white" : null}`}
              onClick={() => changeCardType("region")}
            >
              <HiGlobe className="mr-1" size={"1.5rem"} />
              Region
              {cardType === "region" ? <motion.div className="highlight" layoutId="highlight" transition={{ duration: 0.25 }} /> : null}
            </button>
            <button
              className={`duration-200 flex font-light items-center justify-center relative z-10 w-24 sm:w-full h-9 ${cardType === "iam" ? "text-white" : null}`}
              onClick={() => changeCardType("iam")}
            >
              <HiUser className="mr-1" size={"1.5rem"} />
              IAM
              {cardType === "iam" ? <motion.div className="highlight" layoutId="highlight" transition={{ duration: 0.25 }} /> : null}
            </button>
          </div>
        </AnimateSharedLayout>
        <div className="flex md:mb-3 md:justify-end ">
          <button className="w-10 h-10 dynamic-bg shadow-sm rounded" onClick={() => setDisplayType("table")}>
            <FontAwesomeIcon icon="list" size="lg" color="#bdbdbd" />
          </button>
          <button className="w-10 h-10 ml-3 dynamic-bg shadow-sm rounded" onClick={() => setDisplayType("card")}>
            <FontAwesomeIcon icon="th" size="lg" color="#468ffd" />
          </button>
        </div>
      </div>
      <motion.div className="mt-12 grid grid-cols-3 justify-items-center gap-y-16 gap-x-8 md:grid-cols-2 md:gap-x-4" variants={container} initial="hidden" animate="visible">
        {getUniqueData(data, typeCondition[cardType]).map((value, index) => (
          <ResourceCard
            key={index}
            title={value}
            type={cardType}
            totalResource={data.filter((resource) => resource[typeCondition[cardType]] === value).length}
            totalRegion={
              getUniqueData(
                data.filter((resource) => resource[typeCondition[cardType]] === value),
                [subTypeCondition[cardType]]
              ).length
            }
          />
        ))}
      </motion.div>
    </>
  );
};

export default CardSection;

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ResourceType from "../../components/resource/ResourceType";
import { getUniqueData } from "../../lib/getUniqueData";
import { motion } from "framer-motion";
import { useState } from "react";

const CardSection = ({ data, setDisplayType }) => {
  const [cardType, setCardType] = useState("service");
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
      <div className="flex mt-12 mb-10 sm:mb-3 sm:flex-col-reverse sm:items-stretch justify-between items-center">
        <div className="flex items-center font-light sm:mt-4">
          <p className="mr-3 md:hidden">แสดงตาม </p>
          <button className={`bg-white shadow w-24 sm:w-full h-9 ${cardType === "service" ? "border-2 border-blue-600 text-blue-600" : null}`} onClick={() => setCardType("service")}>
            Service
          </button>
          <button className={`bg-white shadow w-24 sm:w-full h-9 mx-3 ${cardType === "region" ? "border-2 border-blue-600 text-blue-600" : null}`} onClick={() => setCardType("region")}>
            Region
          </button>
          <button className={`bg-white shadow w-24 sm:w-full h-9 ${cardType === "iam" ? "border-2 border-blue-600 text-blue-600" : null}`} onClick={() => setCardType("iam")}>
            IAM
          </button>
        </div>
        <div className="flex md:justify-end">
          <button className="w-9 h-9 bg-white shadow" onClick={() => setDisplayType("table")}>
            <FontAwesomeIcon icon="list" size="1x" color="black" />
          </button>
          <button className="w-9 h-9 bg-white shadow ml-3 border-4 border-blue-600" onClick={() => setDisplayType("card")}>
            <FontAwesomeIcon icon="th" size="1x" color="blue" />
          </button>
        </div>
      </div>
      <motion.div className="mt-12 grid grid-cols-3 justify-items-center gap-y-16 gap-x-8 xl:grid-cols-2 md:gap-x-4" variants={container} initial="hidden" animate="visible">
        {getUniqueData(data, typeCondition[cardType]).map((value, index) => (
          <ResourceType
            key={index}
            title={value ? value : "-"}
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

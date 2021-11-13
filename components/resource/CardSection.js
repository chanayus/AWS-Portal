import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ResourceType from "../../components/resource/ResourceType";
import { getUniqueData } from "../../lib/getUniqueData";
import { motion } from "framer-motion";

// import { useState } from "react";

const CardSection = ({ data, setDisplayType }) => {
//   const [cardType, setCardType] = useState("");
  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.05,
        staggerChildren: 0.05,
      },
    },
  };

  return (
    <>
      <div className="flex mt-12 mb-10 md:mb-3 md:flex-col-reverse md:items-stretch justify-between items-center">
        <div className="flex items-center font-light md:mt-4">
          {/* <p className="mr-3">แสดงตาม </p>
          <button className="bg-white shadow w-24 h-9">Service</button>
          <button className="bg-white shadow w-24 h-9 mx-3">Region</button>
          <button className="bg-white shadow w-24 h-9">IAM</button> */}
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
        {getUniqueData(data, "serviceName").map((value, index) => (
          <ResourceType
            key={index}
            title={value}
            totalResource={data.filter((resource) => resource.serviceName === value).length}
            totalRegion={
              getUniqueData(
                data.filter((resource) => resource.serviceName === value),
                "region"
              ).length
            }
          />
        ))}
      </motion.div>
    </>
  );
};

export default CardSection;

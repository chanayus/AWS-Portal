import { AnimateSharedLayout, motion } from "framer-motion";

import { HiFilter } from "react-icons/hi";
import { getUniqueData } from "../../lib/getUniqueData";
import styled from "styled-components";
import tw from "twin.macro";
import { useState } from "react";

const Filter = ({ filterData, setFilterData, allData }) => {
  const [enable, setEnable] = useState(false);
  const [type, setType] = useState("serviceName");

  const filterKey = {
    serviceName: "resource",
    region: "region",
    owner: "owner",
  };
  const dataHandle = (value, dataKey) => {
    if (!filterData[filterKey[dataKey]].includes(value)) {
      setFilterData({ ...filterData, [filterKey[dataKey]]: [...filterData[filterKey[dataKey]], value] });
    }
  };

  return (
    <div className="relative">
      <button className="dynamic-bg dynamic-text w-32 h-10 rounded flex justify-center items-center shadow mb-2" onClick={() => setEnable(!enable)}>
        <HiFilter size="1.25rem" />
        Add Filter
      </button>

      {enable ? (
        <motion.div className="absolute top-full z-20 dynamic-bg  pr-0 rounded-xl w-96 xs:w-72 shadow-md overflow-hidden">
          <AnimateSharedLayout>
            <div className="flex items-center font-light pb-3 relative  border-b border-gray-500 p-4">
              <button onClick={() => setType("serviceName")} className="relative px-2">
                Service
                {type === "serviceName" ? <Highlight className="filter-highlight" layoutId="filter-highlight" transition={{ duration: 0.25 }} /> : null}
              </button>

              <button onClick={() => setType("region")} className="relative px-2 mx-3">
                Region
                {type === "region" ? <Highlight className="filter-highlight" layoutId="filter-highlight" transition={{ duration: 0.25 }} /> : null}
              </button>

              <button onClick={() => setType("owner")} className="relative px-2">
                IAM
                {type === "owner" ? <Highlight className="filter-highlight" layoutId="filter-highlight" transition={{ duration: 0.25 }} /> : null}
              </button>
            </div>
          </AnimateSharedLayout>
          <div className="overflow-y-scroll max-h-96 pt-3">
            {getUniqueData(allData, type).map((value, index) =>
              filterData[filterKey[type]].includes(value) ? null : (
                <Button onClick={() => dataHandle(value, type)} key={index} className={`flex items-center w-full`}>
                  {type === "serviceName" ? <img src={`/images/resourceIcon/${value}.png`} alt="" className="mr-2 w-8 rounded" /> : null}
                  <p className="dynamic-text">{value}</p>
                </Button>
              )
            )}
          </div>
        </motion.div>
      ) : null}
    </div>
  );
};

const Button = styled.button`
  ${tw`px-4 py-2 font-light`}
  &:hover {
    background: rgba(129, 129, 129, 0.35);
  }
`;

const Highlight = styled(motion.div)`
  &.filter-highlight {
    ${tw`w-full h-1 absolute -bottom-3 rounded-lg left-0`}
    z-index: -1;
    background: ${(props) => props.theme.blue};
  }
`;

export default Filter;

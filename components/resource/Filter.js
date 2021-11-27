import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";
import { useRef, useState } from "react";

import { HiFilter } from "react-icons/hi";
import { getUniqueData } from "../../lib/getUniqueData";
import styled from "styled-components";
import tw from "twin.macro";

const Filter = ({ filterData, setFilterData, allData }) => {
  const [enable, setEnable] = useState(false);
  const [type, setType] = useState("serviceName");
  const wrapperRef = useRef(null); 
  const menuRef = useRef(); 

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

  const filterToggle = () => {
    setEnable(!enable)
    document.body.addEventListener(
      "click",
      (e) => {
        if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
          setEnable(false)
        }
      },
      {
        once: false,
      }
    );
  };

  return (
    <div className="relative" ref={wrapperRef}>
      <button className="dynamic-bg dynamic-text w-32 h-9 rounded flex justify-center items-center shadow mr-2" onClick={() => filterToggle()}>
        <HiFilter size="1.25rem" />
        Add Filter
      </button>

      <AnimatePresence>
      {enable ? (
        <motion.div className="absolute top-full z-20 dynamic-bg  pr-0 rounded-xl w-96 xs:w-72 shadow-md overflow-hidden mt-3"  initial={{ opacity: 0 }} exit={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
          <AnimateSharedLayout>
            <div className="flex items-center font-light pb-3 relative  border-b border-gray-500 p-4">
              <button onClick={() => setType("serviceName")} className="relative px-2 ">
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
      </AnimatePresence>
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

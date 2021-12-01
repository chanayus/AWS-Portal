import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";
import { useRef, useState } from "react";

import { BsSearch } from "react-icons/bs";
import { HiPlus } from "react-icons/hi";
import { getUniqueData } from "../../lib/getUniqueData";
import styled from "styled-components";
import tw from "twin.macro";

const Filter = ({ filterData, setFilterData, allData }) => {
  const [enable, setEnable] = useState(false);
  const [type, setType] = useState("serviceName");
  const wrapperRef = useRef(null);
  const [searchText, setSearchText] = useState("")
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
    setEnable(!enable);
    document.body.addEventListener(
      "click",
      (e) => {
        if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
          setEnable(false);
        }
      },
      {
        once: false,
      }
    );
  };

  return (
    <div className="relative" ref={wrapperRef}>
      <button className="dynamic-bg dynamic-text shadow-sm w-24 h-9 rounded flex justify-evenly items-center" onClick={() => filterToggle()}>
        <HiPlus size="1.25rem" />
        Filter
      </button>

      <AnimatePresence>
        {enable ? (
          <motion.div
            className="absolute top-full z-20 dynamic-bg border border-gray-500 pr-0 rounded-xl w-96 xs:w-72 shadow-xl overflow-hidden mt-3"
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
          >
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
            <div className="flex items-center dynamic-bg :w-full relative py-3 px-4 ">
                <label htmlFor="search" className="absolute left-6"> <BsSearch className="text-gray-500 mr-1" size="1.25rem"/></label>
                <input type="search" id="search" className="bg-transparent h-fit py-1 pr-2 pl-10 rounded w-full dynamic-text border border-gray-500" autoComplete="off" placeholder="ค้นหา" onChange={(e) => setSearchText(e.target.value)} />
              </div>
            <div className="overflow-y-scroll max-h-96">
              {getUniqueData(allData, type).filter((value) => value.includes(searchText)).map((value, index) =>
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

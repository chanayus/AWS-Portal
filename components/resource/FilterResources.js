import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";
import { useRef, useState } from "react";

import { AiOutlineClear } from "react-icons/ai";
import { HiOutlineX } from "react-icons/hi";
import { HiPlus } from "react-icons/hi";
import SearchInput from "../input/SearchInput"
import { getUniqueData } from "../../hooks/getUniqueData";
import styled from "styled-components";
import tw from "twin.macro";

const Filter = ({ filterData, setFilterData, allData }) => {
  const [enable, setEnable] = useState(false);
  const [type, setType] = useState("resource");
  const [searchText, setSearchText] = useState("");
  const wrapperRef = useRef(null);

  const dataSelect = {
    resource: [...new Set(allData.map((value) => `${value.serviceName} ${value.resourceType}`))],
    region: getUniqueData(allData, type),
    owner: getUniqueData(allData, type),
  };

  const handleSelect = (value) => {
    if (!filterData[type].includes(value)) {
      setFilterData({ ...filterData, [type]: [...filterData[type], value] });
    }
  };

  //  ปิด popup เมื่อกดคลิกนอกพื้นที่ของ popup element
  const filterToggle = () => {
    setEnable(!enable);
    document.body.addEventListener(
      "click",
      (e) => {
        if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
          setEnable(false);
        }
      },
      { once: false }
    );
  };

  const removeFilter = (key, value) => {
    const removed = filterData[key].filter((item) => item !== value);
    setFilterData({ ...filterData, [key]: removed });
  };

  // Animation varinats
  const variants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  // Filter Tag Styles
  const FilterTheme = {
    resource: { bgColor: "bg-yellow-200", textColor: "text-yellow-600", borderColor: "border-yellow-400", buttonColor: "bg-yellow-600", butonText: "text-yellow-200" },
    region: { bgColor: "bg-green-200", textColor: "text-green-600", borderColor: "border-green-400", buttonColor: "bg-green-600", butonText: "text-green-200" },
    owner: { bgColor: "bg-red-200", textColor: "text-red-600", borderColor: "border-red-400", buttonColor: "bg-red-600", butonText: "text-red-200" },
  };

  return (
    <div className="relative flex flex-wrap items-center" ref={wrapperRef}>
      <button className="dynamic-bg dynamic-text shadow-sm w-24 h-9 rounded flex justify-evenly items-center mr-4 mb-2" onClick={() => filterToggle()}>
        <HiPlus size="1.25rem" />
        Filter
      </button>

      <AnimatePresence>
        {enable ? (
          <motion.div
            className="absolute top-full z-20 dynamic-bg border border-gray-500 border-opacity-30 pr-0 rounded-xl w-96 xs:w-72 shadow-xl overflow-hidden mt-3"
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
          >
            <AnimateSharedLayout>
              <div className="flex items-center font-light pb-3 relative  border-b border-gray-500 border-opacity-20 p-4">
                <button onClick={() => setType("resource")} className="relative px-2 ">
                  Type
                  {type === "resource" ? <Highlight className="filter-highlight" layoutId="filter-highlight" transition={{ duration: 0.25 }} /> : null}
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
            <div className="px-4 py-2 w-full">
              <SearchInput setState={setSearchText} initialWdith="" externalStyle="border border-gray-600"/>
            </div>
            <div className="overflow-y-scroll max-h-96">
              {dataSelect[type]
                .filter((item) => item.includes(searchText))
                .map((value, index) => {
                  if (!filterData[type].includes(value)) {
                    const spilted = value.split(" ");
                    if (type === "resource") {
                      return !filterData[type].includes(spilted[1]) ? (
                        <Button onClick={() => handleSelect(spilted[1] ? spilted[1] : spilted[0])} key={index} className={`flex items-center w-full`}>
                          {type === "resource" ? <img src={`/images/resourceIcon/${spilted[0]}.png`} alt="" className="mr-2 w-8 rounded" /> : null}
                          <p className="dynamic-text text-left break-all">{spilted[1] ? spilted[1] : spilted[0]}</p>
                        </Button>
                      ) : null;
                    } else {
                      return (
                        <Button onClick={() => handleSelect(value, type)} key={index} className={`flex items-center w-full`}>
                          {type === "resourceType" ? <img src={`/images/resourceIcon/${value}.png`} alt="" className="mr-2 w-8 rounded" /> : null}
                          <p className="dynamic-text text-left break-all">{value}</p>
                        </Button>
                      );
                    }
                  }
                })}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {Object.keys(filterData).map((keyItem) => {
        return (
          keyItem !== "searchText" &&
          filterData[keyItem].map((filterItem, index) => (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={variants}
              key={index}
              className={`rounded-md ${FilterTheme[keyItem].bgColor} ${FilterTheme[keyItem].borderColor} border w-max py-1 px-2 mr-2 mb-2 flex justify-between items-center`}
            >
              <p className={`${FilterTheme[keyItem].textColor} mr-2`}>{filterItem}</p>
              <button
                onClick={() => removeFilter(keyItem, filterItem)}
                className={`${FilterTheme[keyItem].butonText} ${FilterTheme[keyItem].buttonColor} rounded-full w-4 h-4 flex items-center justify-center`}
              >
                <HiOutlineX size="1rem" />
              </button>
            </motion.div>
          ))
        );
      })}
      {(filterData["resource"].length > 0 || filterData["region"].length > 0 || filterData["owner"].length > 0) && (
        <motion.button
          initial="hidden"
          animate="visible"
          variants={variants}
          className={`rounded-md w-max py-1 bg-blue-600 border border-blue-400 px-2 mr-2 mb-2 flex justify-between items-center`}
          onClick={() => setFilterData({ ...filterData, resource: [], region: [], owner: [] })}
        >
          <AiOutlineClear size="1.25rem" className="mr-1" />
          ล้าง
        </motion.button>
      )}
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
    ${tw`w-full h-1 absolute -bottom-3 left-0`}
    z-index: -1;
    background: ${(props) => props.theme.blue};
  }
`;

export default Filter;

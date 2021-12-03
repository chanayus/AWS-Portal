import { useEffect, useState } from "react";

import Breadcrumb from "../../components/main/Breadcrumb";
import { BsSearch } from "react-icons/bs";
import CardSection from "../../components/resource/CardSection";
import Filter from "../../components/resource/Filter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { HiOutlineX } from "react-icons/hi";
import Loading from "../../components/main/loading";
import TableSection from "../../components/resource/TableSection";
import { motion } from "framer-motion";
import { selectFilterHandle } from "../../lib/useFilter";
import { useFetch } from "../../lib/useFetch";
import { useRouter } from "next/router";

const Resource = () => {
  const router = useRouter();
  const { display, cardType } = router.query;
  const [resources, setResources] = useState([]);
  const { loading, data } = useFetch("/api/resources", setResources, true);
  const [displayType, setDisplayType] = useState("");

  const [filterData, setFilterData] = useState({ resource: [], region: [], owner: [], searchText: "" });

  useEffect(() => {
    loading ? null : setDisplayType(display);
  }, [loading]);

  // FOR TABLE SECTION
  useEffect(() => {
    selectFilterHandle(data, setResources, filterData);
  }, [filterData]);

  const filterHandle = (textValue) => {
    setFilterData({ ...filterData, searchText: textValue });
  };

  const removeFilter = (key, value) => {
    const removed = filterData[key].filter((item) => item !== value);
    setFilterData({ ...filterData, [key]: removed });
  };

  const variants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };
  if (loading) {
    return (
      <div className="flex items-center">
        <Loading />
        <h1 className="ml-3">Loading</h1>
      </div>
    );
  } else {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
        <Breadcrumb />
        <h1>Resource ที่กำลังใช้งาน</h1>
        <div className="flex items-start mt-6">
          <Filter filterData={filterData} setFilterData={setFilterData} allData={data} />
          <div className="flex flex-wrap ml-3">
            {filterData["resource"].map((value, index) => (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={variants}
                key={index}
                className="rounded-md bg-yellow-200 w-max py-1 px-2 mr-2 border border-yellow-400 mb-1 flex justify-between items-center"
              >
                <p className="text-yellow-600 mr-2">{value}</p>
                <button onClick={() => removeFilter("resource", value)} className="text-yellow-200 bg-yellow-600 rounded-full w-4 h-4 flex items-center justify-center">
                  <HiOutlineX size="1rem" />
                </button>
              </motion.div>
            ))}
            {filterData["region"].map((value, index) => (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={variants}
                key={index}
                className="rounded-md bg-green-200 border border-green-400 w-max py-1 px-2 mr-2 mb-1 flex justify-between items-center"
              >
                <p className="text-green-600 mr-2">{value}</p>
                <button onClick={() => removeFilter("region", value)} className="text-green-200 bg-green-600 rounded-full w-4 h-4 flex items-center justify-center">
                  <HiOutlineX size="1rem" />
                </button>
              </motion.div>
            ))}
            {filterData["owner"].map((value, index) => (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={variants}
                key={index}
                className="rounded-md bg-red-200 border border-red-400 w-max py-1 px-2 mr-2 mb-1 flex justify-between items-center"
              >
                <p className="text-red-600 mr-2">{value}</p>
                <button onClick={() => removeFilter("owner", value)} className="text-red-200 bg-red-600 rounded-full w-4 h-4 flex items-center justify-center">
                  <HiOutlineX size="1rem" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
        {displayType === "table" ? (
          <>
            <div className="flex mt-6 md:mt-8 md:flex-col-reverse justify-between">
              <div className="flex items-center dynamic-bg rounded-md w-96 md:w-full shadow-sm relative">
                <label htmlFor="search" className="absolute left-3"> <BsSearch className="text-gray-500 mr-2" size="1.25rem"/></label>
                <input type="search" id="search" className="bg-transparent h-fit py-2 pr-2 pl-11 rounded w-full dynamic-text" autoComplete="off" placeholder="ค้นหา Resource" onChange={(e) => filterHandle(e.target.value)} />
              </div>
              <div className="flex md:mb-3 md:justify-end ">
                <button className="w-10 h-10 dynamic-bg shadow-sm rounded" onClick={() => setDisplayType("table")}>
                  <FontAwesomeIcon icon="list" size="lg" color="#468ffd" />
                </button>
                <button className="w-10 h-10 ml-3 dynamic-bg shadow-sm rounded" onClick={() => setDisplayType("card")}>
                  <FontAwesomeIcon icon="th" size="lg" color="#bdbdbd" />
                </button>
              </div>
            </div>
            <TableSection data={data} resources={resources} setResources={setResources} setDisplayType={setDisplayType} />
          </>
        ) : (
          <CardSection data={resources} setDisplayType={setDisplayType} type={cardType ? cardType : "service"} />
        )}
      </motion.div>
    );
  }
};

export default Resource;

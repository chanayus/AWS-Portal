import { AnimatePresence, motion } from "framer-motion";
import { FaList, FaTh } from "react-icons/fa";
import { useEffect, useState } from "react";

import Breadcrumb from "../../components/main/Breadcrumb";
import CardSection from "../../components/resource/CardSection";
import FilterResources from "../../components/resource/FilterResources";
import { HiOutlineX } from "react-icons/hi";
import PageLoader from "../../components/main/PageLoader";
import ResourceTable from "../../components/resource/ResourceTable";
import SearchInput from "../../components/input/SearchInput";
import { useFetch } from "../../hooks/useFetch";
import { useFilter } from "../../hooks/useFilter";
import { useRouter } from "next/router";

const Resource = () => {
  const router = useRouter();
  const { display, type } = router.query;
  const [resources, setResources] = useState([]);
  const { loading, data } = useFetch("/api/resources", setResources, true);
  const [displayType, setDisplayType] = useState("");

  const [filterData, setFilterData] = useState({ resource: [], region: [], owner: [], searchText: "" });

  useEffect(() => {
    loading ? null : setDisplayType(display);
  }, [loading]);

  // FOR TABLE SECTION
  useEffect(() => {
    useFilter(data, setResources, filterData);
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
    return <PageLoader />;
  } else {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
        <Breadcrumb />
        <h1>Resource ที่กำลังใช้งาน</h1>
        <div className="flex items-start mt-6">
          <FilterResources filterData={filterData} setFilterData={setFilterData} allData={data} />
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
              <SearchInput setState={filterHandle} />
              <div className="flex md:mb-3 md:justify-end ">
                <button className="w-10 h-10 dynamic-bg shadow-sm rounded" onClick={() => setDisplayType("table")}>
                  <FaList size="1.4rem" color="#468ffd" className="mx-auto" />
                </button>
                <button className="w-10 h-10 ml-3 dynamic-bg shadow-sm rounded" onClick={() => setDisplayType("card")}>
                  <FaTh size="1.4rem" color="#bdbdbd" className="mx-auto" />
                </button>
              </div>
            </div>
            <ResourceTable resources={resources} setResources={setResources} />
          </>
        ) : (
          <CardSection data={resources} setDisplayType={setDisplayType} type={type ? type : "service"} />
        )}
      </motion.div>
    );
  }
};

export default Resource;

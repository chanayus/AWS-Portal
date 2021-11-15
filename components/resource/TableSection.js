import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ResourceTable from "./ResourceTable";
import SelectInput from "../../components/input/SelectInput";
import { getUniqueData } from "../../lib/getUniqueData";
import { selectFilterHandle } from "../../lib/useFilter";

const TableSection = ({ data, resources, setResources, setDisplayType }) => {
  const [filterData, setFilterData] = useState({ resource: "", region: "", searchText: "" });

  useEffect(() => {
    selectFilterHandle(data, setResources, filterData);
  }, [filterData]);

  const filterHandle = (textValue) => {
    setFilterData({ ...filterData, searchText: textValue });
  };
  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }} key={"table"}>
        <div className="flex mt-12 md:mt-8 md:flex-col-reverse justify-between">
          <div className="flex">
            <input type="text" className="h-fit py-1 px-2 mr-1 rounded md:w-full bg-trasparent font-light" placeholder="ค้นหาชื่อ resource" onChange={(e) => filterHandle(e.target.value)} />
            <div className="flex xl:hidden gap-4 ml-4">
              <SelectInput title="Resource" dataSelect={getUniqueData(data, "serviceName")} data={filterData} setData={setFilterData} dataKey={"resource"} resourceImg={true} />
              <SelectInput title="Region" dataSelect={getUniqueData(data, "region")} data={filterData} setData={setFilterData} dataKey={"region"} resourceImg={false} />
            </div>
          </div>
          <div className="flex md:mb-3 md:justify-end">
            <button className="w-9 h-9 bg-white border-4 border-blue-600 shadow" onClick={() => setDisplayType("table")}>
              <FontAwesomeIcon icon="list" size="1x" color="blue" />
            </button>
            <button className="w-9 h-9 bg-white ml-3 shadow" onClick={() => setDisplayType("card")}>
              <FontAwesomeIcon icon="th" size="1x" color="black" />
            </button>
          </div>
        </div>
        <ResourceTable resources={resources} setResources={setResources} />
      </motion.div>
    </AnimatePresence>
  );
};

export default TableSection;

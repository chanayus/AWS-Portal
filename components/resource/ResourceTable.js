import { AnimatePresence, motion } from "framer-motion";
import { CheckBox, TableWrapper } from "../../styles/styleComponents";
import { IoChevronDown, IoChevronUp, IoCubeOutline } from "react-icons/io5";
import { chooseAllHandle, chooseHandle } from "../../hooks/selectHandle";

import { FaCheck } from "react-icons/fa";
import useForceUpdate from "use-force-update";
import { useRouter } from "next/router";
import { useSorting } from "../../hooks/useSorting";
import { useState } from "react";

const ResourceTable = ({ resources, setResources }) => {
  const forceUpdate = useForceUpdate();
  const router = useRouter();
  const { pathname } = router;
  const isServicePage = pathname === "/resources/[serviceName]";
  const [isSelectAll, setIsSelectAll] = useState(false);

  const [displayResouces, setDisplayResources] = useState([...resources]); // for display resources data

  const [sortData, setSortData] = useState({
    resource: "default",
    region: "default",
    createdAt: "default",
    owner: "default",
  });

  const sortingHandle = (sortKey, sortValue) => {   
    const nextValue = {
      default: "first",
      first: "last",
      last: "default",
    };
    const reset = {
      resource: "default",
      region: "default",
      createdAt: "default",
      owner: "default",
    }  

    setDisplayResources(useSorting([...resources], sortKey, nextValue[sortValue]));
    setSortData({ ...reset, [sortKey]: nextValue[sortValue] });
    forceUpdate();
  };

  return (
    <>
      <div className="mt-6 mb-3 flex justify-start">
        <p className="opacity-80">ผลการค้นหา {displayResouces.length} รายการ</p>
      </div>
      <AnimatePresence exitBeforeEnter>
        {displayResouces.length === 0 ? (
          <motion.div className="w-full flex flex-col items-center opacity-50" exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ duration: 0.4 }}>
            <IoCubeOutline size="7rem" className="dynamic-text mt-10 mb-2" />
            <h2 className="text-2xl font-light">ไม่พบข้อมูล Resource</h2>
          </motion.div>
        ) : (
          <TableWrapper exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
            <table>
              <thead className="sm:hidden">
                <tr>
                  <th className="w-2">
                    <CheckBox className={`${isSelectAll ? "checked" : null}`} onClick={() => chooseAllHandle(displayResouces, setDisplayResources, isSelectAll, setIsSelectAll)}>
                      {isSelectAll ? <FaCheck color="white" size="0.75rem" /> : null}
                    </CheckBox>
                  </th>
                  <th width="20%" className="cursor-pointer">
                    <div className="flex items-center">
                      <p className="w-min select-none mr-1" onClick={() => sortingHandle("resource", sortData.resource)}>Resource</p>
                      {sortData.resource === "first" ? <IoChevronUp /> : sortData.resource === "last" ? <IoChevronDown /> : <div className="w-4 h-4"></div> }
                    </div>
                  </th>
                  <th className="cursor-pointer">
                    <div className="flex items-center">
                      <p className="w-min select-none mr-1" onClick={() => sortingHandle("region", sortData.region)}>Region</p>
                      {sortData.region === "first" ? <IoChevronUp /> : sortData.region === "last" ? <IoChevronDown /> : <div className="w-4 h-4"></div>}
                    </div>
                  </th>
                  <th className="cursor-pointer">
                    <div className="flex items-center">
                      <p className="w-min select-none mr-1" onClick={() => sortingHandle("createdAt", sortData.createdAt)}>สร้างเมื่อ</p>
                      {sortData.createdAt === "first" ? <IoChevronUp /> : sortData.createdAt === "last" ? <IoChevronDown /> :<div className="w-4 h-4"></div>}
                    </div>
                  </th>
                  <th className="cursor-pointer">
                    <div className="flex items-center">
                      <p className="w-min select-none mr-1"  onClick={() => sortingHandle("owner", sortData.owner)}>สร้างโดย</p>
                      {sortData.owner === "first" ? <IoChevronUp /> : sortData.owner === "last" ? <IoChevronDown /> : <div className="w-4 h-4"></div>}
                    </div>
                  </th>
                  <th className="pl-1">Resource id</th>
                </tr>
              </thead>
              <tbody>
                {displayResouces.map((value, index) => {
                  return (
                    <tr key={index} className={`${value.isChoose ? "selected" : null}`}>
                      <td className="sm:hidden">
                        <CheckBox className={`${value.isChoose ? "checked" : null}`} onClick={() => chooseHandle(value, displayResouces, setDisplayResouces)}>
                          {value.isChoose ? <FaCheck color="white" size="0.75rem" /> : null}
                        </CheckBox>
                      </td>
                      <td className="hidden sm:block pt-3 px-3">
                        <div className="hidden sm:flex justify-between items-center my-1 pb-1">
                          <div className="flex items-center ">
                            <img className="w-7 mr-2 rounded" src={`/images/resourceIcon/${value.serviceName}.png`} loading="lazy" alt="service-icon-mobile" />
                            <div className="flex flex-col justify-center">
                              {isServicePage ? null : <p className="font-medium capitalize">{value.serviceName}</p>}
                              <p>{value.resourceType}</p>
                            </div>
                          </div>
                          <div>
                            <CheckBox className={`${value.isChoose ? "checked" : null}`} onClick={() => chooseHandle(value, displayResouces, setDisplayResouces)}>
                              {value.isChoose ? <FaCheck color="white" size="0.75rem" /> : null}
                            </CheckBox>
                          </div>
                        </div>
                        <div className="hidden sm:flex justify-between my-2 pt-1">
                          <b>Region</b>
                          <p className="text-right">{value.region ? value.region : "-"}</p>
                        </div>
                        <div className="hidden sm:flex justify-between my-2">
                          <b>สร้างเมื่อ</b>
                          <p className="text-right">{value.createdAt ? value.createdAt : "-"}</p>
                        </div>
                        <div className="hidden sm:flex justify-between my-2">
                          <b>สร้างโดย</b>
                          <p className="text-right">{value.owner ? value.owner : "-"}</p>
                        </div>
                        <div className="hidden sm:flex justify-between my-2">
                          <b>id</b>
                          <p className="text-right">{`${value.resourceId.substring(0, 10)}${value.resourceId.length > 10 ? "..." : ""}`}</p>
                        </div>
                      </td>

                      <td className="sm:hidden">
                        <div className="flex items-center">
                          <img className="w-9 mr-2 rounded" src={`/images/resourceIcon/${value.serviceName}.png`} loading="lazy" alt="service-icon" />
                          <div className="flex flex-col overflow-hidden">
                            {isServicePage ? null : <p className="text-left font-medium truncate capitalize">{value.serviceName}</p>}
                            {isServicePage && value.resourceType === "" ? <p className="text-left font-medium truncate">{value.serviceName}</p> : null}
                            <p className={`text-left ${isServicePage ? "dynamic-text" : " text-gray-500"} truncate`}>{`${value.resourceType.substring(0, 30)}${
                              value.resourceType.length > 30 ? "..." : ""
                            }`}</p>
                          </div>
                        </div>
                      </td>
                      <td className="sm:hidden">{value.region}</td>
                      <td className="sm:hidden">{value.createdAt ? value.createdAt : "-"}</td>
                      <td className="sm:hidden">{value.owner ? value.owner : "-"}</td>
                      <td className="sm:hidden pl-1 w-52 lg:w-32">
                        <p className="w-52 lg:w-32 break-all mr-0">{`${value.resourceId}`}</p>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </TableWrapper>
        )}
      </AnimatePresence>
    </>
  );
};

export default ResourceTable;

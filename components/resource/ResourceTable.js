import { AnimatePresence, motion } from "framer-motion";
import { CheckBox, TableWrapper } from "../../styles/styleComponents";
import { HiArrowDown, HiArrowUp } from "react-icons/hi";
import { chooseAllHandle, chooseHandle } from "../../hooks/selectHandle";
import { useEffect, useState } from "react";

import { FaCheck } from "react-icons/fa";
import { IoCubeOutline } from "react-icons/io5";
import useForceUpdate from "use-force-update";
import { useRouter } from "next/router";
import { useSorting } from "../../hooks/useSorting";

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

  useEffect(() => {
    const sort = Object.keys(sortData).find((key) => sortData[key] !== "default");
    if (sort) {
      setDisplayResources(useSorting([...resources], sort, sortData[sort]));
    } else {
      setDisplayResources([...resources]);
    }
  }, [resources]);

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
    };
    setDisplayResources(useSorting([...resources], sortKey, nextValue[sortValue]));
    setSortData({ ...reset, [sortKey]: nextValue[sortValue] });
    forceUpdate();
  };

  // Animation
  const arrowUpVariant = {
    hidden: {
      y: 10,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const arrowDownVariant = {
    hidden: {
      y: -10,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const arrowHandle = (status) => {
    return status === "first" ? (
      <motion.div variants={arrowUpVariant} initial={"hidden"} animate={"visible"} exit={"hidden"} key={"up"} transition={{ duration: 0.125 }}>
        <HiArrowUp />
      </motion.div>
    ) : status === "last" ? (
      <motion.div variants={arrowDownVariant} initial={"hidden"} animate={"visible"} exit={"hidden"} key={"down"} transition={{ duration: 0.125 }}>
        <HiArrowDown />
      </motion.div>
    ) : (
      <div className="w-4 h-4"></div>
    );
  };
  return (
    <>
      <div className="mt-6 mb-3 flex justify-start">
        <p className="opacity-80">ผลการค้นหา {displayResouces.length} รายการ</p>
      </div>
      <AnimatePresence exitBeforeEnter>
        {displayResouces.length === 0 ? (
          <motion.div
            className="w-full flex flex-col items-center opacity-50"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 0.1 }}
            key={"not-found"}
          >
            <IoCubeOutline size="7rem" className="dynamic-text mt-10 mb-2" />
            <h2 className="text-2xl font-light">ไม่พบข้อมูล Resource</h2>
          </motion.div>
        ) : (
          <TableWrapper exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }} key={"resorce-table"}>
            <table>
              <thead className="sm:hidden">
                <tr>
                  <th className="w-2">
                    <CheckBox className={`${isSelectAll ? "checked" : null}`} onClick={() => chooseAllHandle(displayResouces, setDisplayResources, isSelectAll, setIsSelectAll)}>
                      {isSelectAll ? <FaCheck color="white" size="0.75rem" /> : null}
                    </CheckBox>
                  </th>
                  <th width="20%">
                    <div className="flex items-center">
                      <p className="cursor-pointer w-min select-none mr-1" onClick={() => sortingHandle("resource", sortData.resource)}>
                        Resource
                      </p>
                      <AnimatePresence exitBeforeEnter>{arrowHandle(sortData.resource)}</AnimatePresence>
                    </div>
                  </th>
                  <th>
                    <div className="flex items-center">
                      <p className="cursor-pointer w-min select-none mr-1" onClick={() => sortingHandle("region", sortData.region)}>
                        Region
                      </p>
                      <AnimatePresence exitBeforeEnter>{arrowHandle(sortData.region)}</AnimatePresence>
                    </div>
                  </th>
                  <th>
                    <div className="flex items-center">
                      <p className="cursor-pointer w-min select-none mr-1" onClick={() => sortingHandle("createdAt", sortData.createdAt)}>
                        สร้างเมื่อ
                      </p>
                      <AnimatePresence exitBeforeEnter>{arrowHandle(sortData.createdAt)}</AnimatePresence>
                    </div>
                  </th>
                  <th>
                    <div className="flex items-center">
                      <p className="cursor-pointer w-min select-none mr-1" onClick={() => sortingHandle("owner", sortData.owner)}>
                        สร้างโดย
                      </p>
                      <AnimatePresence exitBeforeEnter>{arrowHandle(sortData.owner)}</AnimatePresence>
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
                        <CheckBox className={`${value.isChoose ? "checked" : null}`} onClick={() => chooseHandle(value, displayResouces, setDisplayResources)}>
                          {value.isChoose ? <FaCheck color="white" size="0.75rem" /> : null}
                        </CheckBox>
                      </td>
                      <td className="hidden sm:block pt-3 px-3">
                        <div className="hidden sm:flex justify-between items-center my-1 pb-1">
                          <div className="flex items-center ">
                            <img className="w-7 mr-2 rounded" src={`/images/resourceIcon/${value.serviceName}.png`} loading="lazy" alt="service-icon-mobile" />
                            <div className="flex flex-col justify-center">
                              {isServicePage ? null : <p className="font-medium capitalize">{value.serviceName}</p>}
                              {value.serviceName === value.resourceType ? null : <p>{value.resourceType}</p>}
                            </div>
                          </div>
                          <div>
                            <CheckBox className={`${value.isChoose ? "checked" : null}`} onClick={() => chooseHandle(value, displayResouces, setDisplayResources)}>
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
                            {value.serviceName === value.resourceType ? null : (
                              <p className={`text-left ${isServicePage ? "dynamic-text" : " text-gray-500"} truncate`}>{`${value.resourceType.substring(0, 30)}${
                                value.resourceType.length > 30 ? "..." : ""
                              }`}</p>
                            )}
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

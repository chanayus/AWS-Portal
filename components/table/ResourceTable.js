import { AnimatePresence, motion } from "framer-motion";
import { CheckBox, TableWrapper } from "../../styles/styleComponents";
import { HiArrowDown, HiArrowUp } from "react-icons/hi";
import { chooseAllHandle, chooseHandle } from "../../hooks/selectHandle";
import { useEffect, useState } from "react";

import { FaCheck } from "react-icons/fa";
import Image from "../main/Image";
import { IoCubeOutline } from "react-icons/io5";
import dayjs from "dayjs";
import dynamic from "next/dynamic";
import useForceUpdate from "use-force-update";
import { useMediaQuery } from "react-responsive";
import { useRouter } from "next/router";
import { useSorting } from "../../hooks/useSorting";

const ResouceTableMobile = dynamic(import("./ResourceTableMobile"));
const ResourcesSelected = dynamic(import("../resource/ResourcesSelected"));

const ResourceTable = ({ resources, setResources }) => {
  const forceUpdate = useForceUpdate();
  const router = useRouter();
  const { pathname } = router;
  const isServicePage = pathname === "/resources/[serviceName]";
  const [isSelectAll, setIsSelectAll] = useState(false);

  const isMobileScreen = useMediaQuery({ query: "(max-width: 640px)" });

  const [displayResouces, setDisplayResources] = useState([...resources]); // for display resources data

  const [sortData, setSortData] = useState({
    resource: "default",
    region: "default",
    createdAt: "default",
    owner: "default",
    resourceId: "default",
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
      resourceId: "default",
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
      <AnimatePresence>
        {displayResouces.filter((value) => value.isChoose).length === 0 ? null : (
          <ResourcesSelected setResources={setResources} resources={resources} selectedData={displayResouces.filter((value) => value.isChoose)} setDisplayResources={setDisplayResources}/>
        )}
      </AnimatePresence>

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
                  <th className="pl-1">
                    <div className="flex items-center">
                      <p className="cursor-pointer w-min select-none mr-1" onClick={() => sortingHandle("resourceId", sortData.resourceId)}>
                        Resource id
                      </p>
                      <AnimatePresence exitBeforeEnter>{arrowHandle(sortData.resourceId)}</AnimatePresence>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="hidden sm:block">
                  <td>
                    <div className="flex justify-start mx-0">
                      <CheckBox className={`${isSelectAll ? "checked" : null} m-0`} onClick={() => chooseAllHandle(displayResouces, setDisplayResources, isSelectAll, setIsSelectAll)}>
                        {isSelectAll ? <FaCheck color="white" size="0.75rem" /> : null}
                      </CheckBox>
                      <p className="ml-2">เลือกทั้งหมด</p>
                    </div>
                  </td>
                </tr>
                {displayResouces.map((value, index) => {
                  return (
                    <tr key={index} className={`${value.isChoose ? "selected" : null}`}>
                      <td className="sm:hidden">
                        <CheckBox className={`${value.isChoose ? "checked" : null}`} onClick={() => chooseHandle(value, displayResouces, setDisplayResources)}>
                          {value.isChoose ? <FaCheck color="white" size="0.75rem" /> : null}
                        </CheckBox>
                      </td>
                      {isMobileScreen ? (
                        <ResouceTableMobile value={value} isServicePage={isServicePage} displayResouces={displayResouces} setDisplayResources={setDisplayResources} />
                      ) : (
                        <>
                          <td className="sm:hidden">
                            <div className="flex items-center">
                              <Image classProps="w-9 rounded" src={`/images/resourceIcon/${value.serviceName}.png`} width="36px" height="36px" alt="service-icon" />
                              <div className="flex flex-col overflow-hidden  ml-2">
                                {isServicePage ? null : <p className="text-left font-medium truncate capitalize">{value.serviceName}</p>}
                                {isServicePage && value.serviceName === value.resourceType ? <p className="text-left font-medium truncate">{value.serviceName}</p> : null}
                                {value.serviceName === value.resourceType ? null : (
                                  <p className={`max-w-18 text-left break-all ${isServicePage ? "dynamic-text" : " text-gray-500"}`}>{`${value.resourceType}`}</p>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="sm:hidden">{value.region}</td>
                          <td className="sm:hidden">{dayjs(value.createdAt).format("D/MM/YYYY H:mm") === "Invalid Date" ? "-" : dayjs(value.createdAt).format("D/MM/YYYY H:mm")}</td>
                          <td className="sm:hidden">{value.owner ? value.owner : "-"}</td>
                          <td className="sm:hidden pl-1 w-52 lg:w-32">
                            <p className="w-52 lg:w-32 break-all mr-0">{`${value.resourceId}`}</p>
                          </td>
                        </>
                      )}
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

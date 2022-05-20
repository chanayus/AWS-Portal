import { AnimatePresence, motion } from "framer-motion"
import { CheckBox, TableWrapper } from "../../styles/styleComponents"
import { HiArrowDown, HiArrowUp, HiOutlineExclamationCircle, HiOutlineTrash, HiX } from "react-icons/hi"
import { chooseAllHandle, chooseHandle } from "../../hooks/selectHandle"
import { useEffect, useState } from "react"

import { FaCheck } from "react-icons/fa"
import Image from "../main/Image"
import { IoCubeOutline } from "react-icons/io5"
import dayjs from "dayjs"
import dynamic from "next/dynamic"
import { useFetch } from "../../hooks/useFetch"
import useForceUpdate from "use-force-update"
import { useMediaQuery } from "react-responsive"
import { useRouter } from "next/router"
import { useSorting } from "../../hooks/useSorting"

const ResourceTableMobile = dynamic(import("./ResourceTableMobile"))
const ResourcesSelected = dynamic(import("../resource/ResourcesSelected"))

const ResourceTable = ({ resources, setResources }) => {
  const forceUpdate = useForceUpdate()
  const { loading, data: deleteAble } = useFetch("/api/deleteable", () => {}, false)

  const router = useRouter()
  const { pathname } = router
  const isServicePage = pathname === "/resources/[serviceName]"
  const [isSelectAll, setIsSelectAll] = useState(false)
  const isMobileScreen = useMediaQuery({ query: "(max-width: 640px)" })
  const [displayResources, setDisplayResources] = useState([...resources]) // for display resources data
  const [selectDelete, setSelectDelete] = useState(false)

  const defaultSort = {
    resource: "first",
    region: "default",
    Name: "default",
    createdAt: "default",
    owner: "default",
    resourceId: "default",
  }

  const [sortData, setSortData] = useState(defaultSort)

  useEffect(() => {
    const sort = Object.keys(sortData).find((key) => sortData[key] !== "default")
    sort ? setDisplayResources(useSorting([...resources], sort, sortData[sort])) : setDisplayResources([...resources])
  }, [resources])

  const toggleSelectDelete = (toggle) => {
    !toggle && chooseAllHandle(displayResources, setDisplayResources, true, setIsSelectAll, deleteAble.deleteAbleResourcesType)
    setSelectDelete(toggle)
  }

  const sortingHandle = (sortKey, sortValue) => {
    const nextValue = {
      default: "first",
      first: "last",
      last: "default",
    }
    if (nextValue[sortValue] === "default") {
      setSortData({ ...defaultSort, resource: "first" })
      setDisplayResources(useSorting([...resources], "resource", "first"))
    } else {
      setSortData({ ...defaultSort, resource: "default", [sortKey]: nextValue[sortValue] })
      setDisplayResources(useSorting([...resources], sortKey, nextValue[sortValue]))
    }
    forceUpdate()
  }

  const arrowHandle = (status) => {
    if (status === "first") {
      return (
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 10, opacity: 0 }}
          transition={{ duration: 0.125 }}
          key={"first"}
        >
          <HiArrowUp />
        </motion.div>
      )
    } else if (status === "last") {
      return (
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.125 }}
          key={"last"}
        >
          <HiArrowDown />
        </motion.div>
      )
    } else {
      return <div className="w-4 h-4"></div>
    }
  }

  const tableHeadData = [
    { title: "Resource", function: () => sortingHandle("resource", sortData.resource), sort: sortData.resource },
    { title: "Name", function: () => sortingHandle("Name", sortData.Name), sort: sortData.Name },
    { title: "Region", function: () => sortingHandle("region", sortData.region), sort: sortData.region },
    { title: "สร้างเมื่อ", function: () => sortingHandle("createdAt", sortData.createdAt), sort: sortData.createdAt },
    { title: "สร้างโดย", function: () => sortingHandle("owner", sortData.owner), sort: sortData.owner },
    { title: "Resource id", function: () => sortingHandle("resourceId", sortData.resourceId), sort: sortData.resourceId },
  ]

  return (
    <>
      {/* Resource Selected popup */}
      <AnimatePresence>
        {selectDelete && (
          <ResourcesSelected
            setResources={setResources}
            resources={resources}
            selectedData={displayResources.filter((value) => value.isChoose)}
            setDisplayResources={setDisplayResources}
          />
        )}
      </AnimatePresence>

      {/* Delete Button */}
      <button
        className={`p-0 min-w-[3.5rem] w-fit h-14 bg-rose-700 rounded-full flex items-center text-lg fixed z-40
          bottom-[25px] md:bottom-[75px] right-[20px] duration-200 ${selectDelete && "translate-y-[-65px]"}
        `}
        onClick={() => toggleSelectDelete(!selectDelete)}
      >
        {selectDelete ? (
          <div className="px-3 flex items-center">
            <HiX size="1.75rem" className="text-white" />
            <p className="text-lg text-white">ยกเลิก</p>
          </div>
        ) : (
          <HiOutlineTrash size="1.75rem" className="mx-auto text-white" />
        )}
      </button>

      <div className="mt-6 mb-3 flex justify-between items-center">
        <p className="opacity-80">ผลการค้นหา {displayResources.length} รายการ</p>
      </div>
      <AnimatePresence exitBeforeEnter>
        {/* Resource Not Found Text */}
        {displayResources.length === 0 ? (
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
          // Table
          <TableWrapper exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }} key={"resource-table"}>
            <table>
              <thead className="sm:hidden">
                {/* Choose All CheckBox */}
                <tr>
                  {selectDelete && (
                    <motion.th className="w-2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                      <CheckBox
                        className={`${isSelectAll ? "checked" : null}`}
                        onClick={() =>
                          chooseAllHandle(displayResources, setDisplayResources, isSelectAll, setIsSelectAll, deleteAble.deleteAbleResourcesType)
                        }
                      >
                        {isSelectAll ? <FaCheck color="white" size="0.75rem" /> : null}
                      </CheckBox>
                    </motion.th>
                  )}
                  {/* Loop Table Header Data */}
                  {tableHeadData.map((item, index) => (
                    <motion.th
                      width={index === 0 ? "20%" : "auto"}
                      className={`${["Resource id", "Name"].includes(item.title) && "pl-1"}`}
                      key={index}
                    >
                      <div className="flex items-center">
                        <p className="cursor-pointer w-min select-none mr-1" onClick={item.function}>
                          {item.title}
                        </p>
                        <AnimatePresence exitBeforeEnter>{arrowHandle(item.sort)}</AnimatePresence>
                      </div>
                    </motion.th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Select All for Mobile */}
                <tr className={`${!selectDelete ? "hidden" : "hidden sm:block"}`}>
                  <td>
                    <div className="flex justify-start mx-0">
                      <CheckBox
                        className={`${isSelectAll ? "checked" : null} m-0`}
                        onClick={() =>
                          chooseAllHandle(displayResources, setDisplayResources, isSelectAll, setIsSelectAll, deleteAble.deleteAbleResourcesType)
                        }
                      >
                        {isSelectAll ? <FaCheck color="white" size="0.75rem" /> : null}
                      </CheckBox>
                      <p className="ml-2">เลือกทั้งหมด</p>
                    </div>
                  </td>
                </tr>
                {displayResources.map((value, index) => {
                  const canDelete = deleteAble?.deleteAbleResourcesType?.includes(value.resourceType)
                  return (
                    // CheckBok each of item
                    <tr key={index} className={`${value.isChoose ? "selected" : null} ${!canDelete && selectDelete ? "opacity-40" : "opacity-100"}`}>
                      {selectDelete && (
                        <motion.td className="sm:hidden" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                          {deleteAble.deleteAbleResourcesType.includes(value.resourceType) ? (
                            <CheckBox
                              className={`${value.isChoose ? "checked" : null}`}
                              onClick={() => chooseHandle(value, displayResources, setDisplayResources)}
                            >
                              {value.isChoose ? <FaCheck color="white" size="0.75rem" /> : null}
                            </CheckBox>
                          ) : (
                            <HiOutlineExclamationCircle size="1.5rem" color="rgba(255,25,25,1)" />
                          )}
                        </motion.td>
                      )}
                      {/*  Mobile Table */}
                      {isMobileScreen ? (
                        <ResourceTableMobile
                          value={value}
                          isServicePage={isServicePage}
                          displayResources={displayResources}
                          setDisplayResources={setDisplayResources}
                          selectDelete={selectDelete}
                        />
                      ) : (
                        // Table content for Desktop
                        <>
                          <motion.td className="sm:hidden">
                            <div className="flex items-center">
                              <Image
                                classProps="w-9 rounded cursor-pointer"
                                src={`/images/resourceIcon/${value.serviceName}.png`}
                                width="36px"
                                height="36px"
                                alt="service-icon"
                                clickFunc={() => router.push({ pathname: `/resources/detail/[arn]`, query: { arn: value.ResourceARN } })}
                              />
                              <div
                                className="flex flex-col overflow-hidden cursor-pointer ml-2"
                                onClick={() => router.push({ pathname: `/resources/detail/[arn]`, query: { arn: value.ResourceARN } })}
                              >
                                {!isServicePage && <p className="text-left font-medium truncate capitalize">{value.serviceName}</p>}
                                {isServicePage && value.serviceName === value.resourceType && (
                                  <p className="text-left font-medium truncate">{value.serviceName}</p>
                                )}
                                {value.serviceName !== value.resourceType && (
                                  <p
                                    className={`max-w-18 text-left break-all ${isServicePage ? "dynamic-text" : " text-gray-500"}`}
                                  >{`${value.resourceType}`}</p>
                                )}
                              </div>
                            </div>
                          </motion.td>
                          <motion.td className="sm:hidden pl-1 w-40 lg:w-24">
                            <p className="w-40 lg:w-24 break-all mr-0">{value.Name ?? "-"}</p>
                          </motion.td>
                          <motion.td className="sm:hidden">{value.region}</motion.td>
                          <motion.td className="sm:hidden">
                            {dayjs(value.createdAt).format("D/MM/YYYY H:mm") === "Invalid Date"
                              ? "-"
                              : dayjs(value.createdAt).format("D/MM/YYYY H:mm")}
                          </motion.td>
                          <motion.td className="sm:hidden">{value.owner ?? "-"}</motion.td>
                          <motion.td className="sm:hidden pl-1 w-52 lg:w-32">
                            <p className="w-52 lg:w-32 break-all mr-0">{`${value.resourceId}`}</p>
                          </motion.td>
                        </>
                      )}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </TableWrapper>
        )}
      </AnimatePresence>
    </>
  )
}

export default ResourceTable

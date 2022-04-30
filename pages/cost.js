import { AnimatePresence, motion } from "framer-motion"
import { HiArrowDown, HiArrowUp } from "react-icons/hi"
import { useEffect, useState } from "react"

import Breadcrumb from "../components/main/Breadcrumb"
import Image from "../components/main/Image"
import PageLoader from "../components/loader/PageLoader"
import { TableWrapper } from "../styles/styleComponents"
import dayjs from "dayjs"
import styled from "styled-components"
import tw from "twin.macro"
import { useFetch } from "../hooks/useFetch"
import useForceUpdate from "use-force-update"
import { useSorting } from "../hooks/useSorting"

const Cost = () => {
  const forceUpdate = useForceUpdate()
  const [cost, setCost] = useState([])
  const [totalCost, setTotalCost] = useState(0)
  const { loading, data } = useFetch("/api/get_cost", () => {}, false)
  const defaultSort = {
    serviceType: "first",
    resourceId: "default",
    netCost: "default",
    owner: "default",
  }

  const [sortData, setSortData] = useState(defaultSort)

  useEffect(() => {
    const sort = Object.keys(sortData).find((key) => sortData[key] !== "default")
    sort ? setCost(useSorting([...cost], sort, sortData[sort])) : setCost([...cost])
  }, [data])

  useEffect(() => {
    if (data.netResourcesCost) {
      setCost(data.netResourcesCost.filter((value) => value.resourceId))
      setTotalCost(
        data.netResourcesCost.reduce((accumulator, object) => {
          return accumulator + object.netCost
        }, 0)
      )
    }
  }, [data])

  const sortingHandle = (sortKey, sortValue) => {
    const nextValue = {
      default: "first",
      first: "last",
      last: "default",
    }
    if (nextValue[sortValue] === "default") {
      setSortData({ ...defaultSort, serviceType: "first" })
      setCost(useSorting([...cost], "serviceType", "first"))
    } else {
      setSortData({ ...defaultSort, serviceType: "default", [sortKey]: nextValue[sortValue] })
      setCost(useSorting([...cost], sortKey, nextValue[sortValue]))
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

  if (loading) {
    return <PageLoader />
  } else {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
        <Breadcrumb />
        <div className="flex items-center mb-8">
          <h1 className="capitalize">ค่าใช้จ่าย</h1>
        </div>

        <div className="flex">
          <DataCard className="w-fit mr-4">
            <div>
              <h2>ค่าใช้จ่ายทั้งหมด</h2>
              <h1>
                {`${totalCost.toFixed(4)} `} <span className="opacity-50 text-3xl font-normal">USD</span>
              </h1>
            </div>
          </DataCard>
          <DataCard className="w-fit">
            <div>
              <h2>จำนวน Resource ที่มีค่าใช้จ่าย</h2>
              <h1>
                {`${cost.filter((item) => item.netCost > 0).length} `} <span className="opacity-50 text-3xl font-normal">รายการ</span>
              </h1>
            </div>
          </DataCard>
        </div>
        <div className="mt-8 flex justify-between items-center">
          <p className="opacity-80">ผลการค้นหา {cost.length} รายการ</p>
        </div>
        <TableWrapper className="mt-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
          <table>
            <thead className="sm:hidden">
              <tr>
                <th>
                  <div className="flex items-center">
                    <p className="cursor-pointer w-min select-none mr-1" onClick={() => sortingHandle("serviceType", sortData.serviceType)}>
                      Service Type
                    </p>
                    <AnimatePresence exitBeforeEnter>{arrowHandle(sortData.serviceType)}</AnimatePresence>
                  </div>
                </th>
                <th>
                  <div className="flex items-center">
                    <p className="cursor-pointer w-min select-none mr-1" onClick={() => sortingHandle("resourceId", sortData.resourceId)}>
                      Resource id
                    </p>
                    <AnimatePresence exitBeforeEnter>{arrowHandle(sortData.resourceId)}</AnimatePresence>
                  </div>
                </th>
                <th>
                  <div className="flex items-center">
                    <p className="cursor-pointer w-min select-none mr-1" onClick={() => sortingHandle("netCost", sortData.netCost)}>
                      ค่าใช้จ่ายรวม
                    </p>
                    <AnimatePresence exitBeforeEnter>{arrowHandle(sortData.netCost)}</AnimatePresence>
                  </div>
                </th>
                <th>
                  <div className="flex items-center">
                    <p className="cursor-pointer w-min select-none mr-1">
                      สร้างโดย
                    </p>
                    {/* <AnimatePresence exitBeforeEnter>{arrowHandle(sortData.owner)}</AnimatePresence> */}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {cost.map((item, index) => (
                <tr key={index}>
                  <td className="sm:hidden w-[1%]">{item.serviceType}</td>
                  <td className="sm:hidden max-w-[25ch] truncate">
                    <p className="truncate">{item.resourceId.split(":").slice(-1)[0].split("/").slice(-1)[0]}</p>
                  </td>
                  <td className="sm:hidden">{`${item.netCost.toFixed(4)} USD`}</td>
                  <td className="sm:hidden">{item.owner ?? "-"}</td>

                  <td className="hidden sm:block pt-3 px-3 w-full">
                    <div className="hidden sm:flex w-full justify-between my-2 pt-1">
                      <b>Resource Type</b>
                      <p className="text-right">{item.serviceType}</p>
                    </div>
                    <div className="hidden sm:flex w-full justify-between my-2 pt-1">
                      <b>Resource id</b>
                      <p className="text-right truncate">{item.resourceId.split(":").slice(-1)[0].split("/").slice(-1)[0]}</p>
                    </div>
                    <div className="hidden sm:flex w-full justify-between my-2 pt-1">
                      <b>ค่าใช้จ่ายรวม</b>
                      <p className="text-right">{`${item.netCost.toFixed(4)} USD`}</p>
                    </div>
                    <div className="hidden sm:flex w-full justify-between my-2 pt-1">
                      <b>สร้างโดย</b>
                      <p className="text-right">{item.owner ?? "-"}</p>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableWrapper>
      </motion.div>
    )
  }
}

const DataCard = styled(motion.div)`
  ${tw`flex justify-center flex-col rounded-2xl px-8 relative overflow-hidden duration-300 shadow-lg`}
  background: ${(props) => props.theme.subColor};
  height: 140px;
  svg {
    ${tw`absolute -bottom-4 -right-5 block xs:opacity-80 xs:-right-10 bg-red-900 p-4 rounded-2xl `}
    background: ${(props) => props.color};
    transform: rotate(-20deg);
    font-size: clamp(4.75rem, 18vw, 5.75rem);
    color: #fff;
    z-index: 1;
  }
  h2 {
    font-size: clamp(1.05rem, 1.25vw, 1.3rem);
    font-weight: 300;
    line-height: 1.1;
    color: #888;
    position: relative;
    z-index: 2;
    ${tw`md:mb-2`}
  }
  h1 {
    font-size: clamp(2.25rem, 1.25vw, 1.3rem);
    line-height: 1;
    font-weight: 600;
    position: relative;
    z-index: 2;
    ${tw`mt-2`}
    color: ${(props) => props.theme.textColor};
  }
`

export default Cost

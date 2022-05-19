import { AnimatePresence, motion } from "framer-motion"
import { HiArrowDown, HiArrowUp } from "react-icons/hi"
import { useEffect, useState } from "react"

import Breadcrumb from "../../components/main/Breadcrumb"
import Image from "../../components/main/Image"
import PageLoader from "../../components/loader/PageLoader"
import { TableWrapper } from "../../styles/styleComponents"
import dayjs from "dayjs"
import { useFetch } from "../../hooks/useFetch"
import useForceUpdate from "use-force-update"
import { useRouter } from "next/router"
import { useSorting } from "../../hooks/useSorting"

const CostDetail = () => {
  const forceUpdate = useForceUpdate()
  const router = useRouter()
  const [cost, setCost] = useState([])
  const { serviceName } = router.query
  const { loading, data } = useFetch("/api/get_cost", () => {}, false)

  const titleFormatted = serviceName?.replaceAll("Amazon", "").replaceAll("AWS", "").replaceAll("aws", "").toLowerCase()

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
    if (data.netResourcesCost) {
      setCost(data.netResourcesCost.filter((value) => value.resourceId && value.serviceType === serviceName))
    }
    console.log(data.netResourcesCost)
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
        <div className="flex items-center mb-12 mt-4">
          <Image classProps="rounded" src={`/images/resourceIcon/${titleFormatted}.png`} alt="service-Img" width={48} height={48} />
          <h1 className="capitalize ml-3">{titleFormatted}</h1>
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
                    <p className="cursor-pointer w-min select-none mr-1">สร้างโดย</p>
                    {/* <AnimatePresence exitBeforeEnter>{arrowHandle(sortData.owner)}</AnimatePresence> */}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {cost.map((item, index) => (
                <tr key={index}>
                  <td className="sm:hidden w-[1%]">
                    <div className="flex items-center">
                      <Image classProps="rounded" src={`/images/resourceIcon/${titleFormatted}.png`} alt="service-Img" width={32} height={32} />
                        <p className="ml-2">{item.serviceType}</p>
                    </div>
                  </td>
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

export default CostDetail

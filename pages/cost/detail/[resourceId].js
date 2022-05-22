import { useEffect, useState } from "react"

import Breadcrumb from "../../../components/main/Breadcrumb"
import Image from "../../../components/main/Image"
import PageLoader from "../../../components/loader/PageLoader"
import dayjs from "dayjs"
import { motion } from "framer-motion"
import { useFetch } from "../../../hooks/useFetch"
import { useRouter } from "next/router"

const CostDetail = () => {
  const router = useRouter()
  const [cost, setCost] = useState([])
  const { resourceId } = router.query
  const { loading, data, error } = useFetch("/api/get_cost", () => {}, false)

  useEffect(() => {
    data.netResourcesCost && setCost(...data.netResourcesCost.filter((item) => item.resourceId === resourceId))
  }, [data])

  const titleFormatted = cost.serviceType?.replaceAll("Amazon", "").replaceAll("AWS", "").replaceAll("aws", "").toLowerCase()
  
  if (loading) {
    return <PageLoader />
  } else {
    
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
        <Breadcrumb />
        <div className="flex items-center mb-8 mt-4">
          <Image classProps="rounded" src={`/images/resourceIcon/${titleFormatted}.png`} alt="service-Img" width={48} height={48} />
          <div className="ml-3 capitalize">
            <h2 className="text-2xl font-bold">{titleFormatted}</h2>
          </div>
        </div>

        <div className="dynamic-bg p-6 shadow-md">
          <h2 className="text-2xl mb-5 font-semibold">ข้อมูลเบื้องต้น</h2>
          <div className="ml-5 mb-12">
            <div className="flex items-center my-3">
              <p className="w-[10%] min-w-[14ch] font-bold">Service </p>
              <p className="ml-2 capitalize w-[85%]"> {cost.serviceType}</p>
            </div>
            <div className="flex items-center my-3">
              <p className="w-[10%]  min-w-[14ch] font-bold">Region </p>
              <p className="ml-2 capitalize w-[85%]"> {cost.region}</p>
            </div>
            <div className="flex items-center my-3">
              <p className="w-[10%] min-w-[14ch] font-bold">สร้างโดย </p>
              <p className="ml-2 capitalize w-[85%]"> {cost.owner ?? "-"}</p>
            </div>
            <div className="flex items-center my-3">
              <p className="w-[10%]  min-w-[14ch] font-bold">ค่าใช้จ่ายทั้งหมด </p>
              <p className="ml-2 capitalize w-[85%]"> {cost.netCost} USD</p>
            </div>
          </div>
          <h2 className="text-2xl mb-5 font-semibold">ข้อมูลการใช้งาน</h2>
          {cost.usage?.map((item, index) => (
            <div className=" mb-12 dynamic-bg-secondary px-4 py-3" key={index}>
              <div className="flex items-center my-3">
                <p className="w-[10%] min-w-[14ch] font-bold">ประเภทการใช้งาน </p>
                <p className="ml-2 capitalize w-[85%]"> {item.usageType}</p>
              </div>
              <div className="flex items-center my-3">
                <p className="w-[10%] min-w-[14ch] font-bold">ค่าใช้จ่าย </p>
                <p className="ml-2 capitalize w-[85%]"> {item.cost} USD</p>
              </div>
              <div className="flex items-center my-3">
                <p className="w-[10%] min-w-[14ch] font-bold">ปริมาณการใช้งาน </p>
                <p className="ml-2 capitalize w-[85%]"> {item.usageAmount}</p>
              </div>
              <div className="flex items-center my-3">
                <p className="w-[10%] min-w-[14ch] font-bold">คำอธิบาย </p>
                <p className="ml-2 capitalize w-[85%]"> {item.usageDescription}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    )
  }
}

export default CostDetail

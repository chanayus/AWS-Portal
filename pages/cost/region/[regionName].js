import { useEffect, useState } from "react"

import Breadcrumb from "../../../components/main/Breadcrumb"
import CostTable from "../../../components/table/CostTable"
import { HiGlobe } from "react-icons/hi"
import PageLoader from "../../../components/loader/PageLoader"
import { motion } from "framer-motion"
import { useFetch } from "../../../hooks/useFetch"
import { useRouter } from "next/router"

const CostDetail = () => {
  const router = useRouter()
  const [cost, setCost] = useState([])
  const { regionName } = router.query
  const { loading, data } = useFetch("/api/get_cost", () => {}, false)

  useEffect(() => {
    if (data.netResourcesCost) {
      setCost(data.netResourcesCost.filter((value) => value.resourceId && value.region === regionName))
    }
  }, [data])

  if (loading) {
    return <PageLoader />
  } else {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
        <Breadcrumb />
        <div className="flex items-center mb-12 mt-4">
          <div className=" w-12 h-12 rounded-md font-bold bg-gradient-to-r from-green-600 to-green-500 flex items-center justify-center">
            <HiGlobe color="#fcfcfc" size="2.2rem" />
          </div>
          <h1 className="capitalize ml-3">{regionName}</h1>
        </div>
        <CostTable data={cost} title={""} />
      </motion.div>
    )
  }
}

export default CostDetail

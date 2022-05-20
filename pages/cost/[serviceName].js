import { useEffect, useState } from "react"

import Breadcrumb from "../../components/main/Breadcrumb"
import CostTable from "../../components/table/CostTable"
import Image from "../../components/main/Image"
import PageLoader from "../../components/loader/PageLoader"
import { motion } from "framer-motion"
import { useFetch } from "../../hooks/useFetch"
import { useRouter } from "next/router"

const CostDetail = () => {
  const router = useRouter()
  const [cost, setCost] = useState([])
  const { serviceName } = router.query
  const { loading, data } = useFetch("/api/get_cost", () => {}, false)

  const titleFormatted = serviceName?.replaceAll("Amazon", "").replaceAll("AWS", "").replaceAll("aws", "").toLowerCase()

  useEffect(() => {
    if (data.netResourcesCost) {
      setCost(data.netResourcesCost.filter((value) => value.resourceId && value.serviceType === serviceName))
    }
  }, [data])

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
        <CostTable data={cost} title={titleFormatted} />
      </motion.div>
    )
  }
}

export default CostDetail

import { useEffect, useState } from "react"

import Breadcrumb from "../../../components/main/Breadcrumb"
import Image from "../../../components/main/Image"
import PageLoader from "../../../components/loader/PageLoader"
import { motion } from "framer-motion"
import { useFetch } from "../../../hooks/useFetch"
import { useRouter } from "next/router"

const ResourceDetail = () => {
  const router = useRouter()
  const [resource, setResource] = useState({})
  const { arn } = router.query
  const { loading, data } = useFetch("/api/resources", () => {}, true)

  useEffect(() => {
    console.log(...data.filter((item) => item.ResourceARN === arn))
    setResource(...data.filter((item) => item.ResourceARN === arn))
  }, [data])

  if (loading) {
    return <PageLoader />
  } else {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
        <Breadcrumb />
        <div className="flex items-center mb-8 mt-4">
          <Image classProps="rounded" src={`/images/resourceIcon/${resource.serviceName}.png`} alt="service-Img" width={48} height={48} />
          <div className="ml-3 capitalize">
            <h2 className="text-2xl font-bold">{resource.serviceName}</h2>
            <h3 className="opacity-70">{resource.resourceType}</h3>
          </div>
        </div>

        <div className="dynamic-bg p-4 shadow-md">
          <div className="flex items-center my-3 mt-0">
            <p className="w-[10%] min-w-fit font-bold">ResourceType </p>
            <p className="ml-2 capitalize w-[85%]"> {resource.resourceType}</p>
          </div>
          <div className="flex items-center my-3">
            <p className="w-[10%] min-w-fit font-bold">Service </p>
            <p className="ml-2 capitalize w-[85%]"> {resource.serviceName}</p>
          </div>
          <div className="flex items-center my-3">
            <p className="w-[10%] min-w-fit font-bold">Region </p>
            <p className="ml-2 capitalize w-[85%]"> {resource.region}</p>
          </div>
          <div className="flex items-center my-3">
            <p className="w-[10%] min-w-fit font-bold">สร้างเมื่อ </p>
            <p className="ml-2 capitalize w-[85%]"> {resource.createdAt}</p>
          </div>
          <div className="flex items-center my-3">
            <p className="w-[10%] min-w-fit font-bold">สร้างโดย </p>
            <p className="ml-2 capitalize w-[85%]"> {resource.owner}</p>
          </div>
        </div>
      </motion.div>
    )
  }
}

export default ResourceDetail

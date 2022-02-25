import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"
import { HiGlobe } from "react-icons/hi"
import PageLoader from "../../../components/loader/PageLoader"
import { useFetch } from "../../../hooks/useFetch"
import { useRouter } from "next/router"
import { useTextFilter } from "../../../hooks/useFilter"
import dynamic from "next/dynamic"

const SearchInput = dynamic(import("../../../components/input/SearchInput"))
const ResourceTable = dynamic(import("../../../components/table/ResourceTable"))
const Breadcrumb = dynamic(import("../../../components/main/Breadcrumb"))

const SpecificResource = () => {
  const router = useRouter()
  const [resources, setResources] = useState([])
  const { regionName } = router.query
  const { loading, data } = useFetch("/api/resources", setResources, true)

  useEffect(() => {
    setResources(data.filter((value) => value.region === regionName))
  }, [data])

  const resourceFilter = (inputValue) => {
    const allData = data.filter((value) => value.region === regionName)
    setResources(useTextFilter(allData, inputValue))
  }

  if (loading) {
    return <PageLoader />
  } else {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
        <Breadcrumb />
        <div className="flex items-center mb-16">
          <div className=" w-12 h-12 rounded-md font-bold bg-gradient-to-r from-green-600 to-green-500 flex items-center justify-center">
            <HiGlobe color="#fcfcfc" size="2.2rem" />
          </div>
          <h1 className="ml-3 capitalize">{regionName}</h1>
        </div>
        <div className="mt-10">
          <SearchInput setState={resourceFilter} />
        </div>
        <AnimatePresence exitBeforeEnter>
          <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }} key={"table"}>
            <ResourceTable resources={resources} setResources={setResources} />
          </motion.div>
        </AnimatePresence>
      </motion.div>
    )
  }
}

export default SpecificResource

import { AnimatePresence, motion } from "framer-motion"
import { FaList, FaTh } from "react-icons/fa"
import { useEffect, useState } from "react"

import Breadcrumb from "../../components/main/Breadcrumb"
import FilterResources from "../../components/resource/FilterResources"
import PageLoader from "../../components/loader/PageLoader"
import dynamic from "next/dynamic"
import { useFetch } from "../../hooks/useFetch"
import { useFilter } from "../../hooks/useFilter"
import { useRouter } from "next/router"

const SearchInput = dynamic(import("../../components/input/SearchInput"))
const ResourceTable = dynamic(import("../../components/table/ResourceTable"))
const CardSection = dynamic(import("../../components/resource/CardSection"))

const Resource = () => {
  const router = useRouter()
  const { display, type } = router.query
  const [resources, setResources] = useState([])
  const { loading, data } = useFetch("/api/resources", setResources, true)
  const [displayType, setDisplayType] = useState("")

  const [filterData, setFilterData] = useState({
    resource: [],
    region: [],
    owner: [],
    searchText: "",
  })

  useEffect(() => {
    loading ? null : setDisplayType(display)
  }, [loading])

  // FOR TABLE SECTION
  useEffect(() => {
    useFilter(data, setResources, filterData)
  }, [filterData])

  const filterHandle = (textValue) => {
    setFilterData({ ...filterData, searchText: textValue })
  }

  if (loading) {
    return <PageLoader />
  } else {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
        <Breadcrumb />
        <h1>Resource ที่กำลังใช้งาน</h1>
        <div className="flex items-start mt-6">
          <FilterResources filterData={filterData} setFilterData={setFilterData} allData={data} />
        </div>
        <AnimatePresence exitBeforeEnter>
          {displayType === "table" ? (
            <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.15 }} key={"table-section"}>
              <div className="flex mt-6 md:mt-8 md:flex-col-reverse justify-between">
                <SearchInput setState={filterHandle} />
                <div className="flex md:mb-3 md:justify-end ">
                  <button className="w-10 h-10 dynamic-bg shadow-sm rounded" onClick={() => setDisplayType("table")}>
                    <FaList size="1.4rem" color="#468ffd" className="mx-auto" />
                  </button>
                  <button className="w-10 h-10 ml-3 dynamic-bg shadow-sm rounded" onClick={() => setDisplayType("card")}>
                    <FaTh size="1.4rem" color="#bdbdbd" className="mx-auto" />
                  </button>
                </div>
              </div>
              <ResourceTable resources={resources} setResources={setResources} />
            </motion.div>
          ) : (
            <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.15 }} key={"card-section"}>
              <CardSection data={resources} setDisplayType={setDisplayType} type={type ? type : "service"} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    )
  }
}

export default Resource

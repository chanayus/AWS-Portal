import { FaList, FaTh } from "react-icons/fa"
import { useEffect, useState } from "react"

import CostTable from "../../components/table/CostTable"
import SearchInput from "../../components/input/SearchInput"
import { useCostFilter } from "../../hooks/useFilter"
import { useRouter } from "next/router"

const TableSection = ({ cost, setDisplayType }) => {
  const [filterTextData, setFilterTextData] = useState("")
  const [data, setData] = useState([])
  const router = useRouter()
  useEffect(() => {
    setData(useCostFilter(cost, filterTextData))
  }, [filterTextData])

  const changeDisplayType = (value) => {
    router.replace({
      pathname: "/cost",
      query: { display: value },
    })
    setDisplayType(value)
  }
  return (
    <>
      <div className="flex justify-between md:flex-col-reverse">
        <SearchInput setState={setFilterTextData} />
        <div className="flex md:flex-col-reverse justify-between">
          <div className="flex md:mb-3 md:justify-end ">
            <button className="w-10 h-10 dynamic-bg shadow-sm rounded" onClick={() => changeDisplayType("table")}>
              <FaList size="1.4rem" color="#468ffd" className="mx-auto" />
            </button>
            <button className="w-10 h-10 ml-3 dynamic-bg shadow-sm rounded" onClick={() => changeDisplayType("card")}>
              <FaTh size="1.4rem" color="#bdbdbd" className="mx-auto" />
            </button>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <CostTable data={data} title={""} />
      </div>
    </>
  )
}

export default TableSection

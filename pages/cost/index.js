import { useEffect, useState } from "react"

import Breadcrumb from "../../components/main/Breadcrumb"
import CardSection from "../../layout/cost/CardSection"
import { HiOutlineExclamationCircle } from "react-icons/hi"
import PageLoader from "../../components/loader/PageLoader"
import TableSection from "../../layout/cost/TableSection"
import { motion } from "framer-motion"
import styled from "styled-components"
import tw from "twin.macro"
import { useFetch } from "../../hooks/useFetch"
import { useRouter } from "next/router"

const Cost = () => {
  const router = useRouter()
  const [cost, setCost] = useState([])
  const { display } = router.query
  const [displayType, setDisplayType] = useState(display ?? "card")
  const { loading, data, error } = useFetch("/api/get_cost", () => {}, false)

  useEffect(() => {
    if (data.netResourcesCost) {
      setCost(data.netResourcesCost.filter((value) => value.resourceId))
    }
  }, [data])

  if (loading) {
    return <PageLoader />
  } else {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
        <Breadcrumb />
        <div className="flex items-center mb-5">
          <h1 className="capitalize">ค่าใช้จ่าย</h1>
        </div>

        <div className="mb-5 ">
          <DataCard className="w-1/2 lg:w-full bg-gradient-to-bl from-stone-800 via-neutral-900 to-black">
            <div className="flex items-center justify-between">
              <h2 className="text-white">ค่าใช้จ่ายทั้งหมด</h2>
              <div>
                <h1 className="text-white">
                  {`${cost
                    .reduce((accumulator, object) => {
                      return accumulator + object.netCost
                    }, 0)
                    .toFixed(4)} `}
                </h1>
                <p className="opacity-50 text-right text-2xl font-light text-white">USD</p>
              </div>
            </div>
          </DataCard>
        </div>

        {displayType === "card" ? (
          <CardSection cost={cost} setDisplayType={setDisplayType} />
        ) : (
          <TableSection cost={cost} setDisplayType={setDisplayType} />
        )}
        {error && (
          <div className="flex flex-col justify-center items-center w-full dynamic-text mt-10">
            <HiOutlineExclamationCircle size="4rem" />
            <p className="text-xl font-[300]">ไม่พบข้อมูล</p>
          </div>
        )}
      </motion.div>
    )
  }
}

const DataCard = styled(motion.div)`
  ${tw`flex justify-center flex-col rounded-2xl px-8 md:px-4 relative overflow-hidden duration-300 shadow-lg`}
  height: 140px;
  h2 {
    font-size: clamp(1.1rem, 1.25vw, 1.3rem);
    font-weight: 300;
    line-height: 1.1;
    position: relative;
    z-index: 2;
    ${tw`md:mb-2`}
  }
  h1 {
    font-size: clamp(2rem, 1.25vw, 1.3rem);
    line-height: 1;
    font-weight: 600;
    position: relative;
    z-index: 2;
    ${tw`mt-2`}
  }
`

export default Cost

import { useEffect, useState } from "react"

import Breadcrumb from "../../components/main/Breadcrumb"
import CostCard from "../../components/cost/CostCard"
import PageLoader from "../../components/loader/PageLoader"
import { getUniqueData } from "../../hooks/getUniqueData"
import { motion } from "framer-motion"
import styled from "styled-components"
import tw from "twin.macro"
import { useFetch } from "../../hooks/useFetch"

const Cost = () => {
  const [cost, setCost] = useState([])
  const { loading, data } = useFetch("/api/get_cost", () => {}, false)

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
        <div className="flex items-center mb-8">
          <h1 className="capitalize">ค่าใช้จ่าย</h1>
        </div>

        <div className="flex ">
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
        <div className="mt-14 grid grid-cols-3 justify-items-center gap-y-16 gap-x-8 md:grid-cols-2 md:gap-x-4">
          {getUniqueData(cost, "serviceType").map((value, index) => (
            <CostCard
              key={index}
              title={value}
              type={"service"}
              index={index}
              totalPrice={cost
                .filter((item) => item["serviceType"] === value)
                .reduce((accumulator, object) => {
                  return accumulator + object.netCost
                }, 0)}
              totalResource={cost.filter((item) => item["serviceType"] === value).length}
            />
          ))}
        </div>
      </motion.div>
    )
  }
}

const DataCard = styled(motion.div)`
  ${tw`flex justify-center flex-col rounded-2xl px-8 md:px-4 relative overflow-hidden duration-300 shadow-lg`}
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

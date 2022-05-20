import { AnimateSharedLayout, motion } from "framer-motion"
import { HiGlobe, HiTerminal, HiUser } from "react-icons/hi"
import { useEffect, useState } from "react"

import Breadcrumb from "../../components/main/Breadcrumb"
import CostCard from "../../components/cost/CostCard"
import PageLoader from "../../components/loader/PageLoader"
import { getUniqueData } from "../../hooks/getUniqueData"
import styled from "styled-components"
import tw from "twin.macro"
import { useFetch } from "../../hooks/useFetch"
import { useRouter } from "next/router"

const Cost = () => {
  const router = useRouter()
  const [cost, setCost] = useState([])
  const [cardType, setCardType] = useState("service")
  const { loading, data } = useFetch("/api/get_cost", () => {}, false)

  const changeCardType = (value) => {
    router.replace({
      pathname: "/cost",
      query: { type: value },
    })
    setCardType(value)
  }

  const typeCondition = {
    service: "serviceType",
    region: "region",
    iam: "owner",
  }

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

        <AnimateSharedLayout>
          <div className="flex items-center w-fit md:w-full  font-light p-1 sm:mt-4 relative rounded-md shadow-sm dynamic-bg">
            <button
              className={`duration-200 flex font-light items-center justify-center relative z-10 min-w-[7rem] w-full sm:w-full h-9 ${
                cardType === "service" ? "text-white" : null
              }`}
              onClick={() => changeCardType("service")}
            >
              <HiTerminal className="mr-1" size={"1.5rem"} />
              Service
              {cardType === "service" ? <motion.div className="highlight" layoutId="highlight" transition={{ duration: 0.25 }} /> : null}
            </button>
            <button
              className={`duration-200 flex font-light items-center justify-center relative z-10 min-w-[7rem] w-full sm:w-full h-9   ${
                cardType === "region" ? "text-white" : null
              }`}
              onClick={() => changeCardType("region")}
            >
              <HiGlobe className="mr-1" size={"1.5rem"} />
              Region
              {cardType === "region" ? <motion.div className="highlight" layoutId="highlight" transition={{ duration: 0.25 }} /> : null}
            </button>
          </div>
        </AnimateSharedLayout>
        <div className="mt-14 grid grid-cols-3 justify-items-center gap-y-16 gap-x-8 md:grid-cols-2 md:gap-x-4">
          {getUniqueData(cost, typeCondition[cardType]).map((value, index) => (
            <CostCard
              key={index}
              title={value}
              type={cardType}
              index={index}
              totalPrice={cost
                .filter((item) => item[typeCondition[cardType]] === value)
                .reduce((accumulator, object) => {
                  return accumulator + object.netCost
                }, 0)}
              totalResource={cost.filter((item) => item[typeCondition[cardType]] === value).length}
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

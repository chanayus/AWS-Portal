import { AnimateSharedLayout, motion } from "framer-motion"
import { FaList, FaTh } from "react-icons/fa"
import { HiGlobe, HiTerminal, HiUser } from "react-icons/hi"

import CostCard from "../../components/cost/CostCard"
import { getUniqueData } from "../../hooks/getUniqueData"
import { useState } from "react"

const CardSection = ({ cost, setDisplayType }) => {
  const [cardType, setCardType] = useState("service")

  const typeCondition = {
    service: "serviceType",
    region: "region",
    iam: "owner",
  }

  const changeCardType = (value) => {
    // router.replace({
    //   pathname: "/cost",
    //   query: { type: value },
    // })
    setCardType(value)
  }

  return (
    <>
      <div className="flex justify-between md:flex-col-reverse">
        <AnimateSharedLayout>
          <div className="flex items-center font-light p-1 sm:mt-4 relative rounded-md shadow-sm dynamic-bg">
            <button
              className={`duration-200 flex font-light items-center justify-center relative z-10 w-24 sm:w-full h-9 ${
                cardType === "service" ? "text-white" : null
              }`}
              onClick={() => changeCardType("service")}
            >
              <HiTerminal className="mr-1" size={"1.5rem"} />
              Service
              {cardType === "service" ? <motion.div className="highlight" layoutId="highlight" transition={{ duration: 0.25 }} /> : null}
            </button>
            <button
              className={`duration-200 flex font-light items-center justify-center relative z-10 w-24 sm:w-full h-9 mx-3  ${
                cardType === "region" ? "text-white" : null
              }`}
              onClick={() => changeCardType("region")}
            >
              <HiGlobe className="mr-1" size={"1.5rem"} />
              Region
              {cardType === "region" ? <motion.div className="highlight" layoutId="highlight" transition={{ duration: 0.25 }} /> : null}
            </button>
            <button
              className={`duration-200 flex font-light items-center justify-center relative z-10 w-24 sm:w-full h-9 ${
                cardType === "iam" ? "text-white" : null
              }`}
              onClick={() => changeCardType("iam")}
            >
              <HiUser className="mr-1" size={"1.5rem"} />
              IAM
              {cardType === "iam" ? <motion.div className="highlight" layoutId="highlight" transition={{ duration: 0.25 }} /> : null}
            </button>
          </div>
        </AnimateSharedLayout>

        <div className="flex md:flex-col-reverse justify-between">
          <div className="flex md:mb-3 md:justify-end ">
            <button className="w-10 h-10 dynamic-bg shadow-sm rounded" onClick={() => setDisplayType("table")}>
              <FaList size="1.4rem" color="#bdbdbd" className="mx-auto" />
            </button>
            <button className="w-10 h-10 ml-3 dynamic-bg shadow-sm rounded" onClick={() => setDisplayType("card")}>
              <FaTh size="1.4rem" color="#468ffd" className="mx-auto" />
            </button>
          </div>
        </div>
      </div>
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
    </>
  )
}

export default CardSection

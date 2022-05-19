import Image from "../main/Image"
import Link from "next/link"
import { motion } from "framer-motion"
import styled from "styled-components"
import tw from "twin.macro"

const CostCard = ({ title, totalResource, totalPrice, type, index }) => {
  const titleFormatted = title.replaceAll('Amazon', '').replaceAll('AWS', '').replaceAll('aws', '').toLowerCase()
    return (
    <Link href={"/cost/[serviceName]"} as={`/cost/${title}`} scroll={false}>
      <Card
        whileHover={{ y: 5, transition: { duration: 0.2 } }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        key={type + index}
      >
        <Image src={`/images/resourceIcon/${titleFormatted}.png`} width="56px" height="56px" alt="service-card-icon" />
        <div className="flex justify-between items-center w-full">
          <h1 className={`service-name truncate`}>{titleFormatted}</h1>
          <h1 className="font-light text-2xl">
            {totalPrice.toFixed(2)}
            <span className="ml-1 text-xl">usd</span>{" "}
          </h1>
        </div>
        <h2 className={`text-gray-500 mt-2 font-light`}>
          ทั้งหมด
          <span> {totalResource}</span> resource
        </h2>
      </Card>
    </Link>
  )
}

const Card = styled(motion.a)`
  ${tw`flex px-5 pt-2 pb-5 relative flex-col justify-end shadow-md rounded-xl md:px-3 sm:pb-6`}
  width: 400px;
  max-width: 100%;
  height: 140px;
  background: ${(props) => props.theme.subColor};
  cursor: pointer;

  img {
    ${tw`absolute w-14 -top-6 rounded-md sm:left-3 sm:-top-5 sm:w-12 `}
  }
  h1 {
    color: ${(props) => props.theme.textColor};
    margin-top: 7px;
    &.service-name {
      width: 75%;
      text-transform: capitalize;
      font-size: clamp(16px, 4vmin, 25px);
      word-wrap: break-word;
      line-height: 1;
    }
  }
`

export default CostCard

import { AnimatePresence, motion } from "framer-motion"

import { HiChevronDown } from "react-icons/hi"
import { HiOutlineTrash } from "react-icons/hi"
import Image from "../main/Image"
import { useState } from "react"

const ResourceTreeItems = ({ item }) => {
  const [showChildren, setShowChilden] = useState(false)
  const associations = item.associations ? item.associations : []

  const handleClick = () => {
    console.log("Asddd")
    setShowChilden(!showChildren)
  }

  return (
    <>
      <motion.div
        exit={{ opacity: 0, y: -50 }}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="dynamic-bg relative my-8 p-5 pl-3 flex items-center justify-between rounded shadow-sm cursor-pointer"
      >
        <div className="flex items-center w-full" onClick={() => handleClick()}>
          {showChildren && item.children ? (
            <HiChevronDown className="transform rotate-0 dynamic-text mr-2 duration-100" size="2rem" />
          ) : !showChildren && item.children ? (
            <HiChevronDown className="transform -rotate-90 dynamic-text mr-2 duration-100" size="2rem" />
          ) : (
            <div className="mr-5"></div>
          )}
          <Image classProps="w-10 mr-4 rounded" src={`/images/resourceIcon/${item.resourceType}.png`} width="36px" height="36px" alt="service-icon" />
          <div>
            <p className="dynamic-text font-semibold capitalize text-lg">{item.resourceType}</p>
            <p className="text-gray-400 my-1 truncate">{item.resourceId}</p>
          </div>
        </div>
        <div className="flex">
          {associations.map((value, index) => (
            <div className="text-white py-2 px-4 z-10 whitespace-nowrap bg-blue-600 rounded leading-7" key={index}>
              {value.resourceType}
            </div>
          ))}
          {!item.children && (
            <button className={`ml-2 bg-rose-700 p-2 rounded  `}>
              <HiOutlineTrash size="1.75rem" className="mx-auto text-white" onClick={() => console.log("Asd")} />
            </button>
          )}
        </div>
      </motion.div>
      <AnimatePresence>
        {showChildren &&
          (item.children ?? []).map((value) => (
            <div className="ml-10" key={value.resourceId}>
              <ResourceTreeItems item={value} />
            </div>
          ))}
      </AnimatePresence>
    </>
  )
}

export default ResourceTreeItems

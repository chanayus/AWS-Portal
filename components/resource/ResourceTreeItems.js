import { HiChevronDown, HiChevronRight } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import Image from "../main/Image";
import { useState } from "react";

const ResourceTreeItems = ({ item }) => {
  const [showChildren, setShowChilden] = useState(false);

  const handleClick = () => {
    setShowChilden(!showChildren);
  };

  return (
    <>
      <motion.div
        exit={{ opacity: 0, y: -50 }}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        onClick={() => handleClick()}
        className="dynamic-bg my-8 p-5 pl-3 flex items-center rounded shadow-sm cursor-pointer"
      >
        {showChildren && item.children ? (
          <HiChevronDown className="hover:rotate-45 dynamic-text mr-2" size="2rem" />
        ) : !showChildren && item.children ? (
          <HiChevronRight className="hover:rotate-45 dynamic-text mr-2" size="2rem" />
        ) : (
          <div className="mr-5"></div>
        )}
        <Image classProps="w-10 mr-4 rounded" src={`/images/resourceIcon/${item.resourceType}.png`} width="36px" height="36px" alt="service-icon" />
        <div>
          <p className="dynamic-text font-semibold capitalize text-lg">{item.resourceType}</p>
          <p className="text-gray-400">{item.resourceId}</p>
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
  );
};

export default ResourceTreeItems;

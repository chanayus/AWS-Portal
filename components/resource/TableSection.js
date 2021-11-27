import { AnimatePresence, motion } from "framer-motion";

import ResourceTable from "./ResourceTable";

const TableSection = ({ resources, setResources }) => {
  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }} key={"table"}>
        <ResourceTable resources={resources} setResources={setResources} />
      </motion.div>
    </AnimatePresence>
  );
};

export default TableSection;

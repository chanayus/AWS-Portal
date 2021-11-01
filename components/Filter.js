import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { useState } from "react";

const Filter = () => {
  const [visible, setVisible] = useState(false);
  return (
    <button className="relative" onClick={() => setVisible(!visible)}>
      <FontAwesomeIcon icon="filter" size="1x" color="white" />
      {visible ? (
        <motion.div className="absolute bg-white right-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }} >
          <button>{visible ? "true" : "flase"}</button>
          <button>ssss</button>
        </motion.div>
      ) : null}
    </button>
  );
};

export default Filter;

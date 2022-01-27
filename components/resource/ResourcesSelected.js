import { AnimatePresence } from "framer-motion";
import ConfrimModal from "./ConfrimModal";
import { useState } from "react";

const ResourcesSelected = ({ selectedData }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  return (
    <>
      <button onClick={() => setModalVisible(true)} className="bg-red-500 w-50 p-4 h-fit fixed right-5 lg:bottom-20 bottom-5 flex items-center text-white rounded shadow-sm">
        <div className="mr-3 text-lg">{selectedData.length}</div>
        <div>เลือกแล้ว</div>
      </button>
      <AnimatePresence>{isModalVisible ? <ConfrimModal selectedData={selectedData} setModalVisible={setModalVisible} /> : null}</AnimatePresence>
    </>
  );
};

export default ResourcesSelected;

import { AiOutlineDelete, AiOutlinePause } from "react-icons/ai";

import { AnimatePresence } from "framer-motion";
import ConfrimModal from "./ConfrimModal";
import { deleteResources } from "../../hooks/deleteResources";
import { useState } from "react";

const ResourcesSelected = ({ selectedData, setResources, resources }) => {
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isStopModalVisible, setPauseModalVisible] = useState(false);

  const stopProps = {
    selectedData,
    type: "stop",
    headerTitle: "ยืนยันการหยุด Resources",
    title: `คุณแน่ใจหรือไม่ที่จะทำการหยุดการทำงานของ Resource ทั้งหมด ${selectedData.length} รายการดังนี้`,
    buttonTitle: `หยุดทั้ง ${selectedData.length} รายการ`,
  };
  const deleteProps = {
    selectedData,
    type: "delete",
    headerTitle: "ยืนยันการลบ Resources",
    title: `คุณแน่ใจหรือไม่ที่จะทำการลบ Resource ทั้งหมด ${selectedData.length} รายการดังนี้`,
    buttonTitle: `ลบทั้ง ${selectedData.length} รายการ`,
  };

  return (
    <>
      <div className="bg-blue-600 w-1/3 p-4 h-fit fixed right-5 md:w-full md:bottom-16 lg:right-0 bottom-5 flex items-center justify-between text-white rounded shadow-sm">
        <div>เลือกแล้ว {selectedData.length} รายการ</div>
        <div className="flex">
          <button onClick={() => setPauseModalVisible(true)} className="bg-white text-black px-3 py-2 rounded mr-4 flex items-center">
            <AiOutlinePause />
            หยุด
          </button>
          <button onClick={() => setDeleteModalVisible(true)} className="bg-white text-black px-3 py-2 rounded flex items-center">
            <AiOutlineDelete />
            ลบ
          </button>
        </div>
      </div>
      <AnimatePresence>
        {isDeleteModalVisible && <ConfrimModal {...deleteProps} setModalVisible={setDeleteModalVisible}  operation={() => deleteResources(setResources, resources, selectedData)}/>}
        {isStopModalVisible && <ConfrimModal {...stopProps} setModalVisible={setPauseModalVisible} operation={() => {}}/>}
      </AnimatePresence>
    </>
  );
};

export default ResourcesSelected;

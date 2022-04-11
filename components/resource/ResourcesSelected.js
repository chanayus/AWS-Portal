import { AiOutlineDelete, AiOutlinePause } from "react-icons/ai"
import { AnimatePresence, motion } from "framer-motion"

import ConfrimModal from "./ConfrimModal"
import { useState } from "react"

const ResourcesSelected = (props) => {
  const { setResources, selectedData, resources } = props
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false)
  const [isStopModalVisible, setStopModalVisible] = useState(false)

  return (
    <>
      <motion.div
        exit={{ opacity: 0, y: 50 }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.15 }}

        className="bg-blue-600 z-10 w-1/3 p-4 h-fit fixed right-5 md:w-full md:bottom-16 md:right-0 bottom-5 flex items-center justify-between text-white rounded shadow-sm sm:rounded-none"
      >
        <AnimatePresence exitBeforeEnter>
          {selectedData.length === 0 ? (
            <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }} className="py-2" key={"no-select"}>
              โปรดทำการเลือก Resource ที่ต้องการลบ
            </motion.div>
          ) : (
            <motion.div
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25 }}
              className="w-full flex justify-between items-center"
              key={"select"}
            >
              <div>เลือกแล้ว {selectedData.length} รายการ</div>
              <div className="flex">
                {/* <button onClick={() => setStopModalVisible(true)} className="bg-white text-black px-3 py-2 rounded mr-4 flex items-center">
                  <AiOutlinePause />
                  หยุด
                </button> */}
                <button onClick={() => setDeleteModalVisible(true)} className="bg-white text-black px-3 py-2 rounded flex items-center">
                  <AiOutlineDelete />
                  ลบ
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      <AnimatePresence>
        {isDeleteModalVisible && <ConfrimModal type="delete" {...props} setModalVisible={setDeleteModalVisible} />}
        {isStopModalVisible && <ConfrimModal type="stop" {...props} setModalVisible={setStopModalVisible} />}
      </AnimatePresence>
    </>
  )
}

export default ResourcesSelected

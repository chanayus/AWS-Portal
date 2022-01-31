import Image from "../main/Image";
import { motion } from "framer-motion";

const ConfrimModal = ({ setModalVisible, selectedData }) => {
  return (
    <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }} className="fixed w-full backdrop-filter backdrop-blur-md bg-black bg-opacity-5 h-full top-0 left-0 z-40 flex justify-center items-center">
      <div className="border border-gray-600 dynamic-bg rounded-md p-10 lg:mx-4 lg:p-8">
        <h2 className="text-xl font-bold mb-3">ยืนยันการลบ Resources</h2>
        <p>คุณแน่ใจหรือไม่ที่จะทำการลบ Resource ทั้งหมด {selectedData.length} รายการดังนี้</p>
        <div className="overflow-y-scroll px-3 my-4 overflow-x-hidden h-48 max-w-xl">
          {selectedData.map((value, index) => (
            <div className="dynamic-text flex justify-between py-5 items-center border-b border-gray-600 border-opacity-40" key={index}>
              <div className="flex items-center">
                <Image classProps="w-8 mr-2 rounded" src={`/images/resourceIcon/${value.serviceName}.png`} width={"24px"} height={"24px"} alt="service-icon-mobile" />
                <div>
                  <p className="font-semibold capitalize"> {value.serviceName}</p>
                  <p> {value.resourceType}</p>
                </div>
              </div>
              <div className="flex items-center text-right">
                <div>
                  <p className="max-w-xs"> {value.resourceId}</p>
                  <p className="text-gray-400"> {value.owner}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-end mt-10">
          <button className="bg-gray-500 px-5 py-2 rounded duration-200 hover:bg-gray-600 text-white" onClick={() => setModalVisible(false)}>ยกเลิก</button>
          <button className="bg-red-500 px-5 py-2 ml-6 rounded duration-200 hover:bg-red-600 text-white" onClick={() => console.log(selectedData)}>ลบทั้ง {selectedData.length} รายการ</button>
        </div>
      </div>
    </motion.div>
  );
};

export default ConfrimModal;

import Image from "../main/Image";
import { motion } from "framer-motion";
import fetch from "isomorphic-unfetch"

const ConfrimModal = ({ setModalVisible, selectedData }) => {
  const deleteResoures = async (selectedData) => {
    console.log(selectedData)
    let abortController = new AbortController();
    try{
      const response = await fetch("/api/delete-resoures", {
        signal: abortController.signal,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(selectedData)
      })
      const data = await response.json()
      console.log(data)

    }catch (err){
      console.log(err)
    }


    // console.log(data)
  }

  return (
    <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }} className="fixed w-full backdrop-filter backdrop-blur-md bg-black bg-opacity-10 h-full top-0 left-0 z-40 flex justify-center items-center">
      <div className="dynamic-bg rounded-md p-10">
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
          <button className="bg-red-500 px-5 py-2 ml-6 rounded duration-200 hover:bg-red-600 text-white" onClick={() => deleteResoures(selectedData)}>ลบ</button>
        </div>
      </div>
    </motion.div>
  );
};

export default ConfrimModal;

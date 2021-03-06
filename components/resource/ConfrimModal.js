import { HiCheck, HiX } from "react-icons/hi"
import { useEffect, useState } from "react"

import Image from "../main/Image"
import Loader from "../loader/Loader"
import { deleteResources } from "../../hooks/deleteResources"
import { motion } from "framer-motion"
import styled from "styled-components"
import tw from "twin.macro"

const ConfrimModal = ({ setModalVisible, type, selectedData, setResources, resources }) => {
  const [confirmText, setConfirmText] = useState("")

  const [loading, setLoading] = useState(false) // กำลังทำการลบอยู่หรือไม่
  const [error, setError] = useState(false) // การลบทั้งหมด Error หรือไม่
  const [finished, setFinished] = useState(false) // การลบเสร็จสิ้นหรือยัง

  const [deletedList, setDeleteList] = useState([]) // List resourceARN ที่ลบสำเร็จ
  const [deleteResourcesCount, setDeleteResourcesCount] = useState(0)

  const operationCallback = ({ data, status }) => {
    if (status === 200) {
      const successResourcesARN = data.deleteEC2Resources.success.map((item) => item.resourceARN)
      successResourcesARN && setDeleteList([...deletedList, ...successResourcesARN])
    }
    // เงื่อนไงถ้าสั่งลบครบทุก resource แล้วให้ setLoad = false
    if (deleteResourcesCount + 1 >= selectedData.length) {
      setLoading(false)
      setFinished(true)
      deleteResourcesCount + 1 >= selectedData.length && deletedList.length === 0 && setError(true)
    }
    setDeleteResourcesCount(deleteResourcesCount + 1)
  }

  const removeDisplayResources = () => {
    setModalVisible(false)
    setResources(resources.filter((item) => !deletedList.includes(item.ResourceARN)))
  }

  const operationHandle = () => {
    if (type === "delete") {
      setLoading(true)
      deleteResources(selectedData.slice(0, 1), operationCallback)
    } else {
      console.log("stop resources")
    }
  }

  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "initial"
    }
  }, [])

  useEffect(() => {
    if (finished) {
      const closeModal = setTimeout(() => {
        removeDisplayResources()
      }, 2000)
      return () => {
        clearTimeout(closeModal)
      }
    }
  }, [finished])

  useEffect(() => {
    if (deleteResourcesCount > 0 && deleteResourcesCount <= selectedData.length) {
      deleteResources(selectedData.slice(deleteResourcesCount, deleteResourcesCount + 1), operationCallback)
    }
  }, [deleteResourcesCount])

  const modalContent = {
    headerTitle: type === "stop" ? "ยืนยันการหยุด Resources" : "ยืนยันการลบ Resources",
    title:
      type === "stop"
        ? `คุณแน่ใจหรือไม่ที่จะทำการหยุดการทำงานของ Resource ทั้ง ${selectedData.length} รายการดังนี้`
        : `คุณแน่ใจหรือไม่ที่จะทำการลบ Resource ทั้ง ${selectedData.length} รายการดังนี้`,
    buttonTitle: type === "stop" ? `หยุดทั้ง ${selectedData.length} รายการ` : `ลบทั้ง ${selectedData.length} รายการ`,
    loadingText: type === "stop" ? "กำลังหยุด resource" : "กำลังลบ resource",
  }

  return (
    <motion.div
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="fixed w-full bg-black bg-opacity-25 h-full top-0 left-0 z-40 flex justify-center items-center"
    >
      <Modal
        exit={{ opacity: 0, y: 50 }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-between rounded-2xl p-10 shadow lg:mx-4 lg:px-4 lg:py-4"
      >
        {/* Header */}
        <div className="h-fit mb-2">
          <h2 className="text-xl font-bold mb-2 md:text-lg md:mb-1">{modalContent.headerTitle}</h2>
          <p>{modalContent.title}</p>
        </div>
        {/* Each Resource List */}
        <div className="h-full overflow-hidden flex flex-col items-between">
          <div className="resource-list flex-1 overflow-y-scroll px-3 my-2 sm:px-1 overflow-x-hidden">
            {selectedData.map((value, index) => (
              <div className="dynamic-text flex justify-between py-2 md:py-1 items-center border-b border-gray-600 border-opacity-40" key={index}>
                <div className="flex items-center sm:flex-col sm:items-start">
                  <Image
                    classProps="w-7 md:w-6 mr-2 sm:mb-1 rounded"
                    src={`/images/resourceIcon/${value.serviceName}.png`}
                    width={"24px"}
                    height={"24px"}
                    alt="service-icon-mobile"
                  />
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
                  {loading && !deletedList.includes(value.resourceARN) && (
                    <div className="ml-3">
                      <Loader size={22} />
                    </div>
                  )}
                  {!loading && deleteResourcesCount > 1 && deletedList.includes(value.ResourceARN) && (
                    <div className="w-6 h-6 p-0 m-0 ml-3 bg-green-600 flex rounded-full justify-center items-center">
                      <HiCheck color="#FFF" size="1.25rem" />
                    </div>
                  )}
                  {!loading && deleteResourcesCount > 1 && !deletedList.includes(value.ResourceARN) && (
                    <div className="w-6 h-6 p-0 m-0 ml-3 bg-rose-600 flex rounded-full justify-center items-center">
                      <HiX color="#FFF" size="1.25rem" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          {!loading && !error && deletedList <= 0 && (
            <div className="p-1">
              <p className="my-2">{`พิมพ์ ${type} เพื่อดำเนินการต่อ`}</p>
              <div className="flex items-center dynamic-bg rounded-md w-full md:w-full  border border-gray-600 border-opacity-40 relative">
                <input
                  type="search"
                  id="search"
                  className="bg-transparent h-fit py-2 pr-2 pl-4 lg:py-1 lg:px-2  rounded w-full dynamic-text"
                  autoComplete="off"
                  placeholder={`พิมพ์ข้อตามที่กำหนดเพื่อดำเนินการต่อ`}
                  onChange={(e) => setConfirmText(e.target.value)}
                />
              </div>
              <div className="flex justify-end md:mt-3 mt-4">
                <button className="px-5 py-2 rounded duration-200 dynamic-text" onClick={() => removeDisplayResources()}>
                  ยกเลิก
                </button>
                <button
                  disabled={confirmText === type ? false : true}
                  className="bg-red-500 sm:px-4 px-5 py-2 ml-4 rounded duration-200 hover:bg-red-600 text-white"
                  onClick={() => operationHandle()}
                >
                  {modalContent.buttonTitle}
                </button>
              </div>
            </div>
          )}
        </div>
        {loading && (
          <div className="h-1/4 flex flex-col justify-center items-center">
            <Loader />
            <p className="mt-2">{modalContent.loadingText}</p>
          </div>
        )}
        {!loading && deletedList.length > 0 && (
          <div className=" flex flex-col justify-center items-center">
            <div className="w-11 h-11 p-0 m-0 bg-green-600 flex rounded-full justify-center items-center">
              <HiCheck color="#FFF" size="2rem" />
            </div>
            <p className="mt-2">ลบ resources สำเร็จ</p>
          </div>
        )}
        {!loading && error && deletedList.length === 0 && (
          <div className=" flex flex-col justify-center items-center">
            <div className="w-11 h-11 p-0 m-0 bg-rose-600 flex rounded-full justify-center items-center">
              <HiX color="#FFF" size="2rem" />
            </div>
            <p className="mt-2">การลบ resources ล้มเหลว</p>
          </div>
        )}
      </Modal>
    </motion.div>
  )
}

const Modal = styled(motion.div)`
  max-width: 650px;
  max-height: 520px;
  width: 100%;
  height: 100%;
  background: ${(props) => (props.theme.themeName === "dark" ? "#303030" : "#f3f3f3")};
  @media (max-width: 680px) {
    min-width: 0px;
    max-height: 360px;
  }
  @media (max-height: 640px) {
    max-width: 480px;
    max-height: 75vh;
    ${tw`text-xs mb-14`}
  }

  p,
  input {
    ${tw`sm:text-xs`}
  }
  h2 {
    ${tw`sm:text-base`}
  }
`

export default ConfrimModal

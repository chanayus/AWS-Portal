import Image from "../main/Image";
import { motion } from "framer-motion";
import styled from "styled-components";
import { useState } from "react";

const ConfrimModal = ({ setModalVisible, type, selectedData, title, buttonTitle, headerTitle, operation }) => {
  const [comfirmText, setConfirmText] = useState("");
  
  const operationHandle = () => {
    operation();
    setModalVisible(false);
  };
  return (
    <motion.div
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed w-full bg-black bg-opacity-25 h-full top-0 left-0 z-40 flex justify-center items-center"
    >
      <Modal className="rounded-md p-10 shadow-sm lg:mx-4 lg:p-8">
        <h2 className="text-xl font-bold mb-3">{headerTitle}</h2>
        <p>{title}</p>
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
        <p className="my-2">{`พิมพ์ ${type} เพื่อดำเนินการต่อ`}</p>
        <div className="flex items-center dynamic-bg rounded-md w-full md:w-full border border-gray-600 border-opacity-40 relative">
          <input
            type="search"
            id="search"
            className="bg-transparent h-fit py-2 pr-2 pl-4 rounded w-full dynamic-text"
            autoComplete="off"
            placeholder={`พิมพ์ข้อตามที่กำหนดเพื่อดำเนินการต่อ`}
            onChange={(e) => setConfirmText(e.target.value)}
          />
        </div>
        <div className="flex justify-end mt-10">
          <button className="bg-gray-500 px-5 py-2 rounded duration-200 hover:bg-gray-600 text-white" onClick={() => setModalVisible(false)}>
            ยกเลิก
          </button>
          <button disabled={comfirmText === type ? false : true} className="bg-red-500 px-5 py-2 ml-6 rounded duration-200 hover:bg-red-600 text-white" onClick={() => operationHandle()}>
            {buttonTitle}
          </button>
        </div>
      </Modal>
    </motion.div>
  );
};

const Modal = styled.div`
  background: ${(props) => (props.theme.themeName === "dark" ? "#303030" : "#f3f3f3")};
`;

export default ConfrimModal;
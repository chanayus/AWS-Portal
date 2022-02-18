import { useEffect, useState } from "react";

import Image from "../main/Image";
import { motion } from "framer-motion";
import styled from "styled-components";
import tw from "twin.macro";

const ConfrimModal = ({ setModalVisible, type, selectedData, title, buttonTitle, headerTitle, operation }) => {
  const [comfirmText, setConfirmText] = useState("");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "initial";
    };
  }, []);

  const operationHandle = () => {
    operation();
    setModalVisible(false);
  };

  return (
    <motion.div
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="fixed w-full bg-black bg-opacity-25 h-full top-0 left-0 z-40 flex justify-center items-center"
    >
      <Modal className="flex flex-col items-between rounded-2xl p-10 shadow lg:mx-4 lg:px-4 lg:py-4">
        <div className="h-fit mb-2">
          <h2 className="text-xl font-bold mb-2 md:text-lg md:mb-1">{headerTitle}</h2>
          <p>{title}</p>
        </div>
        <div className="h-3/4 overflow-hidden flex flex-col items-between">
          <div className="resource-list flex-grow-2 overflow-y-scroll px-3 my-2 sm:px-1 overflow-x-hidden">
            {selectedData.map((value, index) => (
              <div className="dynamic-text flex justify-between py-2 md:py-1 items-center border-b border-gray-600 border-opacity-40" key={index}>
                <div className="flex items-center sm:flex-col sm:items-start">
                  <Image classProps="w-7 md:w-6 mr-2 sm:mb-1 rounded" src={`/images/resourceIcon/${value.serviceName}.png`} width={"24px"} height={"24px"} alt="service-icon-mobile" />
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
          <div className="flex-grow">
            <p className="my-2">{`พิมพ์ ${type} เพื่อดำเนินการต่อ`}</p>
            <div className="flex items-center dynamic-bg rounded-md w-full md:w-full border border-gray-600 border-opacity-40 relative">
              <input
                type="search"
                id="search"
                className="bg-transparent h-fit py-2 pr-2 pl-4 lg:py-1 lg:px-2  rounded w-full dynamic-text"
                autoComplete="off"
                placeholder={`พิมพ์ข้อตามที่กำหนดเพื่อดำเนินการต่อ`}
                onChange={(e) => setConfirmText(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end md:mt-3 mt-4">
          <button className="px-5 py-2 rounded duration-200 dynamic-text" onClick={() => setModalVisible(false)}>
            ยกเลิก
          </button>
          <button disabled={comfirmText === type ? false : true} className="bg-red-500 sm:px-4 px-5 py-2 ml-4 rounded duration-200 hover:bg-red-600 text-white" onClick={() => operationHandle()}>
            {buttonTitle}
          </button>
        </div>
      </Modal>
    </motion.div>
  );
};

const Modal = styled.div`
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

`;

export default ConfrimModal;

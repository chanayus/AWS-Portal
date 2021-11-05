import { AnimatePresence, motion } from "framer-motion";
import React, { useRef, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import tw from "twin.macro";

const SelectInput = ({ title, dataSelect, dataType, data, setData, resourceImg }) => {
  const [titleText, setTitleText] = useState(title);
  const [showMenu, setShowMenu] = useState(false);
  const wrapperRef = useRef(null); // dom ตัว wrapper
  const menuRef = useRef(); // dom ตัว menu option
  
  const dataHandle = (value) => {
    if (value === data[dataType]) {
      setTitleText(title);
      setData({ ...data, [dataType]: "" });
    } else {
      setTitleText(value);
      data[dataType] = value;
      setData({ ...data, [dataType]: value });
    }
  };

 

  // เปิด-ปิด selection
  const menuToggleHandle = () => {
    setShowMenu(!showMenu)
    document.body.addEventListener(
      "click",
      (e) => {
        if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
          setShowMenu(false)
        }
      },
      {
        once: false,
      }
    );
  };
  return (
    <Container ref={wrapperRef}>
      <MenuToggle onClick={() => menuToggleHandle()} isOpen={showMenu} type="button">
        {(resourceImg && title !== titleText) ? <img src={`/images/resourceIcon/${titleText}.png`} alt="" className="mx-2" /> : null}
        {data[dataType] === "" ? title : titleText}
        <FontAwesomeIcon icon={["fas", "chevron-down"]} />
      </MenuToggle>
      <AnimatePresence>
      {showMenu ? (
        <MenuList ref={menuRef} isVisible="false" initial={{ opacity: 0 }} exit={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
          <h2 className="ml-2 mb-2">{title}</h2>
          {dataSelect.map((value, index) => {
            return (
              <Button onClick={() => dataHandle(value)} selected={value === titleText}>
                {resourceImg ? <img src={`/images/resourceIcon/${value}.png`} alt="" className="mr-2"  /> : null}
                <p>{value}</p>
              </Button>
            );
          })}
        </MenuList>
      ) : null}
      </AnimatePresence>
    </Container>
  );
};

const Container = styled.div`
  ${tw`relative w-full mr-1.5`}
  min-width: 190px;
`;
const MenuToggle = styled.div`
 ${tw`overflow-hidden flex justify-center items-center duration-200 cursor-pointer font-light w-full px-6 rounded hover:bg-gray-900`}
  border: 1px solid #d0d0d0;
  background: ${(props) => props.theme.subColor};
  color: ${(props) => props.theme.textColor};
  height: 38px;
  z-index: 10000;
  svg {
    margin: 0 7px;
    transition: 0.25s;
    transform: rotate(${props => props.isOpen ? "180deg" : "0deg"});
  }
  img {
    width: 30px;
    border-radius: 5px;
  }
`;

const MenuList = styled(motion.div)`
  position: absolute;
  background: #fff;
  border: 1px solid #d0d0d0;
  padding: 10px;
  z-index: 1;
  margin-top: 5px;
  border-radius: 10px;
  top: 45px;
  max-height: 223px;
  overflow-y: scroll;
  overflow-x: hidden;
  ::-webkit-scrollbar-track {
    background: none;
  }
  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-thumb {
    background: #909090;
    border-radius: 5px 30px 30px 5px;
  }
  h2{
    font-size: 1.4rem;
    color: #000;
    font-weight: 600;
  }
`;

const Button = styled.button`
    display: flex;
    align-items: center;
    border: 1.5px solid #d4d4d4;
    margin: 5px;
    padding: 5px;
    border-radius: 5px;
    overflow: hidden;
    min-width: 200px;
    font-weight: 300;
    background: ${props => props.selected ? props.theme.blue : "white"};
    img {
      width: 30px;
      border-radius: 5px;
    }
    p {
      text-align: center;
      width: 100%;
      color: ${props => props.selected ? "white" : "black"};
    }
`

export default SelectInput;

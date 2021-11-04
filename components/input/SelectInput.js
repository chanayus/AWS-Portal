import { AnimatePresence, motion } from "framer-motion";
import React, { useRef, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

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
      <MenuToggle onClick={() => menuToggleHandle()} fontSize={"clamp(11px,4vmin,15px)"} type="button">
        {(resourceImg && title !== titleText) ? <img src={`/images/resourceIcon/${titleText}.png`} alt="" className="mx-2" /> : null}
        {data[dataType] === "" ? title : titleText}
        <FontAwesomeIcon icon={["fas", "chevron-down"]} />
      </MenuToggle>
      <AnimatePresence>
      {showMenu ? (
        <MenuList ref={menuRef} isVisible="false" initial={{ opacity: 0 }} exit={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
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
  position: relative;
  width: 100%;
  min-width: 190px;
  margin-right: 5px;
`;
const MenuToggle = styled.div`
  border: 1px solid #d0d0d0;
  background: ${(props) => props.theme.subColor};
  width: 100%;
  height: 40px;
  border-radius: 5px;
  font-weight: 300;
  font-size: ${(props) => props.fontSize};
  color: ${(props) => props.theme.textColor};
  overflow: hidden;
  z-index: 10000;
  padding: 0 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.25s;
  &:hover {
    background: #353535;
    color: #fff;
    svg {
      color: #fff;
    }
  }
  svg {
    color: #606060;
    margin: 0 7px;
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
  
`;

const Button = styled.button`
    display: flex;
    align-items: center;
    border: 2px solid #d4d4d4;
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

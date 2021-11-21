import { motion } from "framer-motion";
import styled from "styled-components";
import tw from "twin.macro";

export const TableWrapper = styled(motion.div)`
    /* background: ${(props) => props.theme.subColor};
    ${tw`p-6 rounded-md md:flex-none md:w-full md:px-4 md:p-5 duration-100`}
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px; */
    /* ${tw`overflow-hidden`} */
    border: 1px solid rgba(95, 95, 95, 0.35);
    border-bottom: none;

`;

export const Button = styled.button`
    ${tw`rounded flex justify-center items-center`}
    background: ${(props) => props.theme.subColor};
    color: ${(props) => props.theme.textColor};
`

export const CheckBox = styled.button`
    ${tw`w-6 h-6 sm:w-5 sm:h-5 flex justify-center items-center rounded-md duration-100 mx-auto`}
    border: 2px solid #8f8f8f;
    &.checked{
        background: #2E75DF;
        border: none;
    }
`  

export const Select = styled.select`
    ${tw`mx-2 bg-transparent md:ml-0 font-light`}
    width: 130px;
    background: #fff;
    option{
        background: ${(props) => props.theme.subColor};
    }
`

export const Div = styled(motion.div)`
    background: black;
`
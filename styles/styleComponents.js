import styled from "styled-components";
import tw from "twin.macro";

export const TableWrapper = styled.div`
    background: ${(props) => props.theme.subColor};
    ${tw`p-6 rounded md:flex-none md:w-full md:px-4 md:pt-2 duration-100`}
`;

export const Button = styled.button`
    background: ${(props) => props.theme.subColor};
    color: ${(props) => props.theme.textColor};
`
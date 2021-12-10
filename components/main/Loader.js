import { keyframes } from "styled-components";
import styled from "styled-components";

const Loader = () => {
  return <Load />;
};

const rotate = keyframes`
  from { transform: rotate(0deg); }
	to { transform: rotate(359deg); }
`;

const Load = styled.div`
  width: 38px;
  height: 38px;
  border: 4px ${props => props.theme.textColor} solid;
  border-top: 4px ${props => props.theme.bodyColor} solid;
  border-radius: 50%;
  animation: ${rotate} 0.6s infinite linear;
`;
export default Loader;

import { keyframes } from "styled-components";
import styled from "styled-components";

const Loading = () => {
  return <Loader />;
};

const rotate = keyframes`
  	from { transform: rotate(0deg); }
	to { transform: rotate(359deg); }
`;

const Loader = styled.div`
  width: 38px;
  height: 38px;
  border: 4px #d4d4d4 solid;
  border-top: 4px ${props => props.theme.blue} solid;
  border-radius: 50%;
  animation: ${rotate} 0.6s infinite linear;
`;
export default Loading;

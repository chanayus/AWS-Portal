import { createGlobalStyle } from "styled-components";
import { keyframes } from "styled-components";
import tw from "twin.macro";

const skeletonAnim = keyframes`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }
  100% {
    opacity: 1;
  }
`;

export const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        /* font-family: 'Montserrat','Prompt', sans-serif; */
        font-family: 'Prompt', sans-serif;
    }
    body {
        background: ${(props) => props.theme.mainColor};
        transition: 0.1s;
    }
    img{
        image-rendering: -webkit-optimize-contrast;
    }
    h1{
        font-size:clamp(24px,5vmin,32px);
        font-weight: 700;
    }
    p,h1,h2,h3,h4,h5,h6,td,th,label{
        color: ${(props) => props.theme.textColor};
    }
    /* p{
        text-align: center;
    } */
    button{
        font-size: clamp(13px,1vw,16px);
    }
    table{
        width: 100%;
        text-align: left;
        border: 1px solid rgba(129, 129, 129, 0.35);
        background: ${(props) => props.theme.subColor};
        td, th{
            ${tw`sm:px-3`}
            padding: 15px 1.25vw;
            font-size: clamp(13px,2vw,16px);
        }
        thead{
            border-bottom: 1px solid rgba(129, 129, 129, 0.35);
            background: ${(props) => props.theme.tableHeader};
        }
        tbody{
            tr{
                border-bottom: 1px solid rgba(129, 129, 129, 0.35);        
                td{
                    font-weight: 300;
                }
            }
        }
    }
    a {
        color: inherit;
        text-decoration: none;
    }
    button{
        /* border: none; */
        cursor: pointer;
        color: ${props => props.theme.textColor};
    }
    .highlight {
        ${tw`w-full h-full absolute -bottom-0 rounded`}
        z-index: -1;
        background:  ${props => props.theme.blue};
    }
    .dymamic-bg{
        background:  ${props => props.theme.subColor};
    }
    .skeleton{
        background: ${props => props.theme.subColor === "#0f0f0f" ? "#595959" : "#ccc"};
        animation: ${skeletonAnim} 2s infinite linear;
    }
`;



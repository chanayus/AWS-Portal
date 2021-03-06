import { createGlobalStyle } from "styled-components"
import { keyframes } from "styled-components"
import tw from "twin.macro"

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
`

export const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        font-family: 'Prompt', sans-serif;
        scroll-behavior: smooth;
        -webkit-font-smoothing:antialiased !important;
    }
    body {
        background: ${(props) => props.theme.bodyColor};
        transition: 0.2s;
        min-height: 100vh;
    }
    img{
        image-rendering: -webkit-optimize-contrast;
    }
    h1{
        font-size:clamp(23px,5vmin,30px);
        font-weight: 500;
    }
    p,h1,h2,h3,h4,h5,h6,td,th,label{
        color: ${(props) => props.theme.textColor};

    }
    button{
        font-size: clamp(13px,1vw,16px);
    }
    table{
        ${tw`shadow-sm`}
        width: 100%;
        text-align: left;
        background: ${(props) => props.theme.subColor};
        td, th{
            ${tw`sm:px-3`}
            padding: 15px 1.1vw;
            font-weight: 400;
            font-size: clamp(14px,1.1vw,16px);
        }
        tr{
            transition: 0.25s;
            &.selected{
                background: rgba(71, 171, 253, 0.2);
            }
        }
        thead{  
            &.non-sticky{
                position: relative;
                top: 0;  
            }     
            position: sticky;
            top: 70px;     
            z-index: 1;
            background: ${(props) => props.theme.tableHeader};
            white-space: nowrap;
            &::before{
                content: "";
                position: absolute;
                width: 100%;
                height: 1px;
                bottom: 0;
                background: rgba(129, 129, 129, 0.125);
            }         
        }
        tbody{
            tr{          
                border-bottom: 1px solid rgba(129, 129, 129, 0.125);
                &:last-child{
                    border: none;
                }     
                td{
                    font-weight: 400;
                }
            }
        }
    }
    a {
        color: inherit;
        text-decoration: none;
    }
    button{
        cursor: pointer;
        color: ${(props) => props.theme.textColor};
        
    }
    button[disabled]{
        opacity: 0.5;
        pointer-events: none;
    }

    input[type="text"], input[type="search"]{
        /* ${tw`shadow`} */
        outline: none;
        transition: 0.1s;
        box-sizing: border-box;
        &:focus {
            box-shadow: 0 0 3px 2px ${(props) => props.theme.blue};
        }
        ::-webkit-search-cancel-button{
            position:relative;
            transition: 0.2s;
            -webkit-appearance: none;
            height: 20px;
            width: 20px;
            border-radius:10px;       
            background: #bdbdbd url('https://pro.fontawesome.com/releases/v5.10.0/svgs/solid/times.svg') no-repeat 50% 50%;
            background-size: 12px 12px;
            cursor: pointer;
        }
    }
    .highlight {
        ${tw`w-full h-full absolute -bottom-0 rounded`}
        z-index: -1;
        background:  ${(props) => props.theme.blue};
    }
    .dynamic-bg{
        background:  ${(props) => props.theme.subColor};
    }
    .dynamic-bg-secondary{
        background: ${(props) => (props.theme.themeName === "light" ? "#e3e3e3" : "#232323")};
    }
    .dynamic-bg-invert{
        background: ${(props) => (props.theme.themeName === "dark" ? "#e1e1e1" : "#2a2a2a")};
    }
    .dynamic-text{
        color:  ${(props) => props.theme.textColor};
    }
    .dynamic-text-invert{
        color:  ${(props) => (props.theme.themeName === "dark" ? "#2a2a2a" : "#e1e1e1")};
    }
    .skeleton{
        background: ${(props) => (props.theme.themeName === "dark" ? "#555" : "#ccc")};
        animation: ${skeletonAnim} 1.25s infinite linear;
    }
    /* width */
    ::-webkit-scrollbar {
    width: 10px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        background: ${(props) => props.theme.mainColor}; 
    }
    
    /* Handle */
    ::-webkit-scrollbar-thumb {
    background: #888; 
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
    background: #555; 
    }
`

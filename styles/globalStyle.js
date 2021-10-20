import { createGlobalStyle } from "styled-components";
import tw from "twin.macro";

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
    p,h1,h2,h3,h4,h5,h6,td,th{
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
        border: 1px solid #8181817f;
        background: ${(props) => props.theme.subColor};
        td, th{
            ${tw`sm:px-3`}
            padding: 15px 1.25vw;
            font-size: clamp(13px,2vw,16px);
        }
        thead{
            border-bottom: 1px solid #8181817f;
            background: ${(props) => props.theme.tableHeader};
        }
        tbody{
            tr{
                border-bottom: 1px solid #8181817f;        
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
        border: none;
        cursor: pointer;
    }
`;

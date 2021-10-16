import { createGlobalStyle } from "styled-components";

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
    }
    h1{
        font-size:clamp(24px,5vmin,32px);
        font-weight: 700;
    }
    p,h1,h2,h3,h4,h5,h6,td,th{
        color: ${(props) => props.theme.textColor};
    }
    p,td,th{
        text-align: center;
    }
    button{
        font-size: clamp(13px,1vw,16px);
    }
    table{
        width: 100%;
        text-align: center;
        @media (max-width: 640px){
            display: inline-table;
        }
        td, th{
            padding: 17.5px 0;
            font-size: clamp(12px,2vw,16px);
        }
        th{
        padding-top: 0;
        }
        thead{
            border-bottom: 1px solid ${(props) => props.theme.textColor}
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
